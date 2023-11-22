<!-- 服务器选择器。 -->

<script lang="ts" setup>
import { ShallowRef } from 'vue';
import { ValidateStatus } from '@arco-design/web-vue';
import { Guild } from 'fanbook-api-node-sdk';
import { FanbookApiError } from 'fanbook-api-node-sdk/es/error';

export interface Props {
  /** 是否显示。 @default true */
  visible?: boolean;
  /** 标题。 @default '选择服务器' */
  title?: string;
  /** 是否隐藏取消按钮。 @default true */
  showCancel?: boolean;
}
export interface Events {
  (ev: 'update:visible', value: boolean): void;
  /** 关闭选择器。 */
  (ev: 'close'): void;
  /** 确认选择。 */
  (ev: 'ok', value: Guild): void;
  /** 取消选择。 */
  (ev: 'cancel'): void;
}

withDefaults(defineProps<Props>(), {
  visible: true,
  title: '选择服务器',
  showCancel: true,
});
const emit = defineEmits<Events>();

let botId: bigint | undefined;
const input = ref<{
  id?: bigint;
  status?: ValidateStatus;
  help?: string;
}>({});
const selected: ShallowRef<Guild | undefined> = shallowRef();

async function handleChange(v: bigint) {
  selected.value = undefined; // 清除现有结果
  if (!botId) botId = (await getCurrentBot().getMe()).id; // 无缓存，先获取缓存
  input.value = { status: 'validating' };
  try {
    selected.value = await getCurrentBot().getGuild(v, botId);
    input.value = { status: 'success' };
  } catch (e) {
    input.value.status = 'error';
    if (e instanceof FanbookApiError) {
      input.value.help = '找不到此服务器';
    } else {
      console.error(e);
      input.value.help = '未知错误';
    }
  }
}

function handleClose() {
  emit('update:visible', false);
  emit('close');
  input.value = {};
  selected.value = undefined;
}
function handleBadInput() {
  input.value.status = 'error';
  input.value.help = '错误的服务器 ID';
}
</script>

<template>
  <AModal
    :visible='visible'
    :title='title'
    unmount-on-close
    :hide-cancel='!showCancel'
    :closable='showCancel'
    :ok-button-props='{ disabled: !selected }'
    :esc-to-close='false'
    @update:visible='(v: boolean) => emit("update:visible", v)'
    @ok='() => emit("ok", selected!)'
    @cancel='() => emit("cancel")'
    @close='handleClose'
  >
    <AFormItem label='服务器 ID' feedback :validate-status='input.status'>
      <InputBigint v-model='input.id' @change='handleChange' @error='handleBadInput' />
      <template v-if='input.help' #help>{{ input.help }}</template>
    </AFormItem>
  </AModal>
</template>
