<script lang="ts" setup>
import { User } from 'fanbook-api-node-sdk';

definePageMeta({
  title: '我的机器人',
});

const info: Ref<User | undefined> = ref();
onMounted(async () => {
  info.value = await getCurrentBotSafe()?.getMe();
});
</script>

<template>
  <ADescriptions v-if='info' :column='1' layout='horizontal'>
    <ADescriptionsItem label='名称'>{{ info.first_name }}</ADescriptionsItem>
    <ADescriptionsItem label='User ID'><Text copyable>{{ info.id }}</Text></ADescriptionsItem>
    <ADescriptionsItem label='所有者'><Text copyable>{{ info.last_name }}</Text></ADescriptionsItem>
  </ADescriptions>
  <AEmpty v-else description='还没有机器人' />
</template>
