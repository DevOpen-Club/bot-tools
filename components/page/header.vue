<!-- 页面公共头部。 -->

<script lang="ts" setup>
import { Bot, User } from 'fanbook-api-node-sdk';
import { bots } from '~/utils/bot';

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

const info: Ref<User | undefined> = ref();
const loading = ref(true);

/**
 * 检查机器人是否可用，如果可用还会更新 `info`。
 * @param bot 机器人
 * @returns 是否可用
 */
async function check(bot: Bot) {
  try {
    info.value = await bot.getMe();
    return true;
  } catch (e) {
    if (e instanceof RequireBotError) return false;
    console.error(e);
    return false;
  }
}
onMounted(async () => {
  for (const bot of bots.value) {
    if (await check(bot)) break;
  }
  loading.value = false;
});
</script>

<template>
  <ALayoutHeader>
    <APageHeader :title='title' :show-back='showBack' @back='back'>
      <template v-if='!loading' #extra>
        <FbBot v-if='info' class='cursor-pointer' :info='info' @click='() => navigateTo("/bot")' />
        <AButton v-else type='primary'>添加机器人</AButton>
      </template>
    </APageHeader>
  </ALayoutHeader>
</template>

<style lang="postcss" scoped>
:deep() .arco-page-header-extra {
  @apply h-[30px];
}
</style>
