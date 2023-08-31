<!-- 功能页的通用包装。 -->

<script lang="ts" setup>
export interface Props {
  /** 是否正在加载。 */
  loading?: boolean;
  /**
   * 加载中文字。
   * @default '正在加载'
   */
  loadingText?: string;
}
export interface Slots {
  default(props: {}): any;
}

withDefaults(defineProps<Props>(), {
  loadingText: '正在加载',
});
defineSlots<Slots>();
</script>

<template>
  <ASpin class='block min-w-full min-h-full mx-auto' :loading='loading' :tip='loadingText'>
    <slot />
  </ASpin>
</template>
