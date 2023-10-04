<script lang="ts" setup>
import { promiseTimeout } from '@vueuse/core';
import { Message } from '@arco-design/web-vue';
import { Bot, Channel } from 'fanbook-api-node-sdk';

definePageMeta({
  title: '消息互动',
  middleware: ['require-bot'],
});

const bot = getCurrentBot();
let bus: Awaited<ReturnType<Bot['listen']>> | undefined;
const guildPickerOpen = ref(false);
const channels: Ref<Channel[]> = ref([]);
let unmounting = false;

async function connect() {
  bus = await bot.listen();
  bus.on('push', handlePush);
  bus.on('error', handleError);
  bus.on('close', handleClose);
}

function handlePush() {
}
function handleError(err: unknown) {
}
async function handleClose() {
  if (unmounting) return; // 离开页面导致的连接关闭，不重连
  while (true) {
    const { close } = Message.loading({
      content: '连接中断，正在重连',
      duration: -Infinity,
    });
    try {
      await connect();
      close();
      break;
    } catch (err) {
      console.error('Failed to reconnect', err);
      await promiseTimeout(3000); // 3s 后再次尝试重连
    }
    close();
  }
  Message.success('重连成功');
}

// onMounted(() => connect().catch(handleClose));
onBeforeUnmount(() => {
  unmounting = true;
  if (bus) bus.emit('close');
});
</script>

<template>
  <FbGuildPicker
    v-model:visible='guildPickerOpen'
    @ok='(v) => channels = toOrderedChannels(v)'
  />
  <AButton @click='() => guildPickerOpen = true'>选择服务器</AButton>
  <FbGuildView :channels='channels' />
</template>
