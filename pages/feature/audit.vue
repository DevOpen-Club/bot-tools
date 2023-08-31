<script lang="ts" setup>
import { ShallowRef } from 'vue';
import { Guild } from 'fanbook-api-node-sdk';
import { getGuildRoles } from '~/utils/fanbook';
import { Category, CheckResultLevel, Result, checkRolePermissions } from '~/utils/feature/audit';
import { FanbookApiError } from 'fanbook-api-node-sdk/es/error';

definePageMeta({
  title: '运营风险检测',
  middleware: ['require-bot'],
});

const status: Ref<'pre' | 'processing' | 'done' | 'failed'> = ref('pre');
const errorCode: Ref<number | undefined> = ref(); // 错误码
const errorMessage: Ref<string | undefined> = ref(); // 错误信息
const errorCause: Ref<string | undefined> = ref(); // 诊断信息
const guildPickerOpen = ref(false);
const result = ref<Result>({
  '身份组': [],
});

const guild: ShallowRef<Guild | undefined> = shallowRef();

async function handleStart() {
  status.value = 'processing';
  try {
    const roles = await getGuildRoles(BigInt(guild.value!.guild_id));
    for (const role of roles) {
      const res = checkRolePermissions(role);
      if (res && res.level !== CheckResultLevel.SAFE) { // 有风险
        result.value['身份组'].push(res);
      }
    }
    status.value = 'done';
  } catch (e) {
    console.error(e);
    errorMessage.value = String(e);
    if (e instanceof FanbookApiError && e.code) { // 接口报错
      errorCode.value = e.code;
      if (ErrorMessage[e.code]) { // 有诊断信息
        errorCause.value = ErrorMessage[e.code];
      }
    } else { // 未知错误
      errorMessage.value = String(e);
    }
    status.value = 'failed';
  }
}
function handleIgnore(tab: Category, index: number) {
  result.value[tab].splice(index, 1);
}
</script>

<template>
  <FbGuildPicker v-model:visible='guildPickerOpen' @ok='(v) => guild = v' />
  <FeatureWrapper :loading='status === "processing"' loading-text='正在检测'>
    <template v-if='status === "pre"'>
      <Paragraph :indent='false'>声明：</Paragraph>
      <Paragraph>
        机器人工具将通过您当前选择的机器人获取您选择的服务器的基本信息、成员列表、身份组列表、身份组信息、频道列表、频道基本信息。
      </Paragraph>
      <Paragraph>
        检测过程中，机器人工具不主动收集或上传任何用户信息到除 Fanbook 服务以外的服务器，不主动修改服务器数据，但必要、强制性或不可避免的除外。
      </Paragraph>
      <Paragraph margin-bottom>
        检测结果仅供参考，无任何形式的明示或暗示保证，作者和贡献者不对检测结果造成的任何直接、间接、偶发、特殊、继起或惩罚性损害负责。
      </Paragraph>
      <AButton v-if='!guild' type='outline' long @click='() => guildPickerOpen = true'>
        选择服务器
      </AButton>
      <ASpace v-else direction='vertical' fill>
        <AButton type='primary' long @click='handleStart'>开始检测</AButton>
        <AButton long @click='() => guild = undefined'>重新选择服务器</AButton>
      </ASpace>
    </template>
    <div v-else-if='status === "processing"' class='w-full h-10'></div>
    <BizAuditResult v-else-if='status === "done"' :result='result' @ignore='handleIgnore' />
    <AResult v-else status='error' title='检测失败' :subtitle='errorCode ? `错误码：${errorCode}` : undefined'>
      <TechnologyInfo v-if='errorCause' title='可能原因' :copyable='false'>
        {{ errorCause }}。
      </TechnologyInfo>
      <TechnologyInfo v-else title='错误信息'>
        {{ errorMessage }}
      </TechnologyInfo>
    </AResult>
  </FeatureWrapper>
</template>
