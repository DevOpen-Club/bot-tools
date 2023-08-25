<!-- 文字。 -->

<script lang="ts" setup>
export interface Props {
  /** 是否可以复制。 */
  copyable?: boolean;
  /** 复制的内容。 */
  copyText?: string;
}
export interface Slots {
  default(props: {}): any;
}

defineProps<Props>();
defineSlots<Slots>();
</script>

<template>
  <ATypographyParagraph class='mb-0' :copyable='copyable' :copy-text='copyText'>
    <slot />
  </ATypographyParagraph>
</template>
