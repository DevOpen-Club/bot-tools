<script lang="ts" setup>
import 'nprogress/nprogress.css';
// 手动导入的组件，需要手动导入样式
import '@arco-design/web-vue/es/message/style/css';
import '@arco-design/web-vue/es/modal/style/css';
import Page404 from './pages/[...slug].vue';

const version = useAppConfig().version;
</script>

<template>
  <AAlert v-if='version !== "DEV"' type='warning' closable banner>
    <template #icon><IconExperiment /></template>
    版本{{ version?.startsWith('PREVIEW') ? '预览' : '内测' }}中，效果请以最终发布为准。
  </AAlert>
  <main v-if='$route.path.startsWith("/docs")'>
    <ContentDoc>
      <template #not-found><Page404 /></template>
      <template #empty><AEmpty>好像应该写点什么</AEmpty></template>
    </ContentDoc>
  </main>
  <template v-else>
    <PageHeader />
    <ALayoutContent><NuxtPage /></ALayoutContent>
    <PageFooter />
  </template>
</template>

<style lang="postcss">
#__nuxt {
  @apply flex flex-col;
  @apply min-h-screen;
}
main {
  @apply mx-8;
}
@media (max-width: 1280px) {
  .arco-modal {
    @apply w-11/12;
  }
}
@media (min-width: 1280px) {
  main {
    @apply mx-20;
  }
}
</style>
