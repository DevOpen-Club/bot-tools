<!-- 页面公共脚部。 -->

<script lang="ts" setup></script>

<template>
  <ALayoutFooter class='mb-1'>
    <ATypographyParagraph>
      Released under the
      <AppLink to='https://opensource.org/license/mit/'>MIT License.</AppLink>
    </ATypographyParagraph>
    <ATypographyParagraph>Copyright &copy; 2023 DevOpen Club</ATypographyParagraph>
  </ALayoutFooter>
</template>

<style lang="postcss" scoped>
.arco-typography {
  @apply m-0;
  color: var(--color-text-3);
  @apply text-center text-xs;
  a {
    @apply text-xs;
  }
}
</style>
