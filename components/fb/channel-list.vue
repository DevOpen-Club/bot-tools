<!-- 频道列表。 -->

<script lang="ts" setup>
import { Channel, ChannelType } from 'fanbook-api-node-sdk';

export interface Props {
  /** 频道列表。 */
  channels: Channel[];
}

const props = defineProps<Props>();

const channelsGrouped = computed(() => {
  const ret: Array<Channel | Channel[]> = [];
  for (const channel of props.channels) { // 放入未分类的频道
    if (channel.type === ChannelType.ClassChannel) break;
    ret.push(channel);
  }
  for (let i = ret.length; i < props.channels.length; ++i) { // 放入分类的频道
    if (props.channels[i].type === ChannelType.ClassChannel) { // 新的分类
      ret.push([props.channels[i]]);
    } else { // 分类下的频道
      (ret.at(-1) as Channel[]).push(props.channels[i]);
    }
  }
  return ret;
});
</script>

<template>
  <ACollapse>
    <template v-for='channel in channelsGrouped'>
      <FbChannelGroup
        v-if='Array.isArray(channel)'
        :channel='channel[0]'
        :children='channel.slice(1)'
      />
      <FbChannelInfo v-else class='unclassed-channel' :channel='channel' />
    </template>
  </ACollapse>
</template>

<style lang="postcss" scoped>
.unclassed-channel {
  border-bottom: 1px solid var(--color-border-2);
  @apply flex h-10 !important;
  @apply px-4 my-[2px];
}
</style>
