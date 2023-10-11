<!-- 聊天简略信息。 -->

<script lang="ts" setup>
import { Channel } from 'fanbook-api-node-sdk';

export interface Props {
  /** 展示的聊天信息。 */
  channel: Channel;
}

const props = defineProps<Props>();
const image = computed(() => {
  const { type } = props.channel;
  if (SupportedChannelType.includes(type)) return `/icon/channel/${type}.svg`;
  return '/icon/channel/unknown.svg';
})
</script>

<template>
  <ASpace class='h-[30px] overflow-visible' direction='horizontal'>
    <img class='w-4' :src='image' />
    {{ channel.name }}
  </ASpace>
</template>
