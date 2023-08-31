<!-- 技术信息展示。 -->

<script lang="ts" setup>
import { AlertInstance } from '@arco-design/web-vue';
import { promiseTimeout } from '@vueuse/core';

export interface Props {
  /** 标题。 */
  title?: string;
  /** 是否可复制。 @default true */
  copyable?: boolean;
  /** 复制的内容。 @default // 默认插槽的内容 */
  content?: string;
}
export interface Slots {
  default(props: {}): any;
}

const props = withDefaults(defineProps<Props>(), {
  copyable: true,
});
defineSlots<Slots>();

const alert: Ref<AlertInstance | null> = ref(null);

const clipboard = useClipboard({ legacy: true });
const copied = ref(false);
async function handleCopy() {
  await clipboard.copy(
    props.content
    ?? ((alert.value?.$el as HTMLDivElement)
        .getElementsByClassName('arco-alert-content')[0] as HTMLDivElement)
        .innerText // <AAlert> 默认插槽的内容
    ?? ''
  );
  copied.value = true;
  await promiseTimeout(2500);
  copied.value = false;
}
</script>

<template>
  <AAlert ref='alert' type='normal'>
    <slot />
    <template #title>
      {{ title }}
      <AButton
        v-if='copyable && clipboard.isSupported'
        class='absolute right-0'
        size='mini'
        @click='handleCopy'
      >
        复制
        <template v-if='copied' #icon><IconCheckCircleFill /></template>
      </AButton>
    </template>
  </AAlert>
</template>

<style lang="postcss" scoped>
:deep() {
  .arco-alert-body {
    @apply w-full;
  }
  .arco-alert-content {
    word-wrap: break-word;
  }
}
</style>
