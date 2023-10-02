<script lang="ts" setup>
definePageMeta({
  title: '消息互动',
  middleware: ['require-bot'],
});

const guildPickerOpen = ref(false);
const channels: Ref = ref([]);
</script>

<template>
  <FbGuildPicker
    :visible='guildPickerOpen'
    @ok='(v) => channels = v.channels'
  />
  <AButton @click='() => guildPickerOpen = true'>选择服务器</AButton>
  <FbChannelList :channels='channels' />
</template>
