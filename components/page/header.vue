<!-- 页面公共头部。 -->

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { Bot, User } from 'fanbook-api-node-sdk';
import FbBotTokenPicker from '~/components/fb/bot-token-picker.vue';
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

const info: Ref<User[]> = ref([]);
const loading = ref(true);

/**
 * 检查机器人是否可用，如果可用还会更新 `info`。
 * @param bot 机器人
 * @returns 是否可用
 */
async function check(bot: Bot) {
  try {
    info.value.push(await bot.getMe());
    return true;
  } catch (e) {
    if (e instanceof RequireBotError) return false;
    console.error(e);
    return false;
  }
}
onMounted(async () => {
  await Promise.allSettled(bots.value.map((v) => check(v)));
  loading.value = false;
});

function handleSwitchBot(index: number) {
  Message.loading({ content: '正在切换机器人', duration: -Infinity });
  switchCurrentBot(index);
  location.reload();
}

const ADD_BOT_MESSAGE_DURACTION = 2500;
const addBotOpen = ref(false);
const addBotDisabled = ref(false);
function handleAddBot(bot: Bot) {
  if (hasBot(bot.token)) { // 无效输入
    return;
  }
  if (addBotDisabled.value) return; // 重复点击按钮
  addBotDisabled.value = true;
  addBot(bot);
  Message.success({ content: '添加机器人成功', duration: -Infinity });
  setTimeout(() => {
    location.reload();
  }, ADD_BOT_MESSAGE_DURACTION);
}
</script>

<template>
  <FbBotTokenPicker :visible='addBotOpen' :on-input='(v) => hasBot(v) ? "已添加此机器人" : ""' @ok='handleAddBot' @cancel='() => addBotOpen = false' />
  <ALayoutHeader>
    <APageHeader :title='title' :show-back='showBack' @back='back'>
      <template v-if='!loading' #extra>
        <ADropdown>
          <FbBot v-if='info[0]' class='cursor-pointer' :info='info[0]' @click='() => navigateTo("/bot")' />
          <AButton v-else type='primary'>添加机器人</AButton>
          <template #content>
            <ADsubmenu>
              切换机器人
              <template #content>
                <ADoption v-for='(item, index) in info'>
                  <FbBot v-if='index !== 0' class='flex py-5' :info='item' @click='() => handleSwitchBot(index)' />
                </ADoption>
                <ADoption style='color: rgb(var(--primary-6));' @click='() => addBotOpen = true'>
                  <template #icon><IconRobotAdd class='mx-[4px]' :size='22' /></template>
                  添加机器人
                </ADoption>
              </template>
            </ADsubmenu>
          </template>
        </ADropdown>
      </template>
    </APageHeader>
  </ALayoutHeader>
</template>

<style lang="postcss" scoped>
:deep() .arco-page-header-extra {
  @apply h-[30px];
}
</style>
