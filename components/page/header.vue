<!-- 页面公共头部。 -->

<script lang="ts" setup>
/** 页头标题。 */
const title = ref('');
const DEFAULT_TITLE = '机器人工具';
watch(useRouter().currentRoute, ({ meta }) => {
  title.value = meta.title ?? DEFAULT_TITLE;
}, { immediate: true });

/** 是否显示返回按钮。 */
const showBack = ref(false);
watch(useRouter().currentRoute, ({ path }) => {
  showBack.value = path !== '/';
}, { immediate: true });
</script>

<template>
  <ALayoutHeader>
    <APageHeader :title='title' :show-back='showBack' @back='back' />
  </ALayoutHeader>
</template>
