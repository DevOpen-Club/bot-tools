<!-- 聊天简略信息。 -->

<script lang="ts" setup>
import { Channel, ChannelType } from 'fanbook-api-node-sdk';

export interface Props {
  /** 展示的聊天信息。 */
  channel: Channel;
}

const props = defineProps<Props>();

watch(
  () => props.channel,
  (v) => {
    if (!SupportedChannelType.includes(v.type)) {
      throw new Error(`Cannot show channel with type ${v.type}`);
    }
  },
  { immediate: true },
);
</script>

<template>
  <ASpace class='h-[30px] overflow-visible' direction='horizontal'>
    <img class='w-4' :src='`/icon/channel/${channel.type}.svg`' />
    {{ channel.name }}
  </ASpace>
</template>
