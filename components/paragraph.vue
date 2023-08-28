<!-- 段落。 -->

<script lang="ts" setup>
export interface Props {
  /** 是否缩进。 @default true */
  indent?: boolean;
  /** 是否有 `margin-bottom`。 @default false */
  marginBottom?: boolean;
}
export interface Slots {
  default(props: {}): any;
}

withDefaults(defineProps<Props>(), {
  indent: true,
  marginBottom: false,
});
defineSlots<Slots>();
</script>

<template>
  <ATypographyParagraph
    :class='{ "mb-0": !marginBottom }'
    :style='{ textIndent: indent ? "2em" : undefined }'
  >
    <slot />
  </ATypographyParagraph>
</template>
