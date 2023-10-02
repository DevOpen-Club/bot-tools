<script lang="ts" setup>
definePageMeta({
  title: '消息互动',
  middleware: ['require-bot'],
});

const bot = getCurrentBot();
const chat = await bot.listGuildChannel(359183537678589952n);
</script>

<template>
  <FbChannelList :channels='chat' />
</template>
