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

async function connect() {
  bus = await bot.listen();
  bus.on('connect', (ev) => {
    console.log('WebSocket connected', ev);
  });
  bus.on('push', handlePush);
  bus.on('error', handleError);
  bus.on('close', handleClose);
}

function handlePush() {
}
function handleError(err: unknown) {
}
async function handleClose() {
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
      await promiseTimeout(3000);
    }
    close();
  }
  Message.success('重连成功');
}

onMounted(() => connect().catch(handleClose));
onBeforeUnmount(() => {
  if (bus) bus.emit('close');
});
</script>

<template>
  <FbGuildPicker
    :visible='guildPickerOpen'
    @ok='(v) => channels = v.channels'
  />
  <AButton @click='() => guildPickerOpen = true'>选择服务器</AButton>
  <FbChannelList :channels='channels' />
</template>
