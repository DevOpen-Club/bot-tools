<!-- 机器人选择器，使用令牌。 -->

<script lang="ts" setup>
import { ValidateStatus } from '@arco-design/web-vue';
import { Bot } from 'fanbook-api-node-sdk';
import { FanbookApiError } from 'fanbook-api-node-sdk/es/error';
import { ShallowRef } from 'nuxt/dist/app/compat/capi';

export interface Props {
  /** 是否显示。 @default true */
  visible?: boolean;
  /** 标题。 @default '选择机器人' */
  title?: string;
  /** 是否隐藏取消按钮。 @default true */
  showCancel?: boolean;
  /** 
   * 输入机器人令牌时触发。
   * @param token 机器人令牌
   * @returns 错误信息，无则为 `undefined` 或 `''`
   */
  onInput?: (token: string) => string | undefined | Promise<string | undefined>;
}
export type Events = {
  'update:visible': [value: boolean];
  /** 关闭选择器。 */
  close: [];
  /** 确认选择。 */
  ok: [bot: Bot];
  /** 取消选择。 */
  cancel: [];
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  title: '选择服务器',
  showCancel: true,
});
const emit = defineEmits<Events>();

const input = ref<{
  token: string;
  status?: ValidateStatus;
  help?: string;
}>({
  token: '',
});
const selected: ShallowRef<Bot | undefined> = shallowRef();

async function handleInput(v: string) {
  input.value = { token: v, help: '', status: 'validating' };
  const bot = new Bot(v);
  try { // 令牌有效性校验
    await bot.getMe();
  } catch (e) {
    input.value.status = 'error';
    if (e instanceof FanbookApiError) {
      input.value.help = '无效的机器人令牌';
    } else {
      console.error(e);
      input.value.help = '未知错误';
    }
    return;
  }
  if (props.onInput) { // 自定义校验
    try {
      const msg = await props.onInput(v);
      if (msg) {
        input.value.help = msg;
        input.value.status = 'error';
        return;
      }
    } catch (e) {
      console.error(e);
      input.value.help = '未知错误';
      input.value.status = 'error';
      return;
    }
  }
  selected.value = bot;
  input.value.status = 'success';
}

function handleClose() {
  emit('update:visible', false);
  emit('close');
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
    @update:visible='(v) => emit("update:visible", v)'
    @ok='() => emit("ok", selected!)'
    @cancel='() => emit("cancel")'
    @close='handleClose'
  >
    <AFormItem label='机器人令牌' feedback :validate-status='input.status'>
      <AInput v-model='input.token' allow-clear @change='handleInput' />
      <template v-if='input.help' #help>{{ input.help }}</template>
    </AFormItem>
  </AModal>
</template>
