<!-- 频道列表。 -->

<script lang="ts" setup>
import { Channel, ChannelType } from 'fanbook-api-node-sdk';

export interface Props {
  channels: Channel[];
}

const props = defineProps<Props>();

const unclassed = ref(true); // 是否还没有频道分组出现

function getClassChannelItems(index: number) {
  unclassed.value = false;
  const ret: Channel[] = [];
  ++index; // 从频道分组下第一个频道开始
  for (; index < props.channels.length; ++index) {
    // 已经到了下一个频道分组，这个频道分组结束了
    if (props.channels[index].type === ChannelType.ClassChannel) break;
    // 还没有到达下一个频道分组
    ret.push(props.channels[index]);
  }
  return ret;
}

function handleReset() {
  unclassed.value = true;
}
</script>

<template>
  <ACollapse>
    {{ handleReset() /** 每次重新渲染时需要重新置为 true，否则会销毁无分类的频道 */ }}
    <template v-for='(channel, index) in channels'>
      <FbChannelGroup
        v-if='channel.type === ChannelType.ClassChannel'
        :channel='channel'
        :children='getClassChannelItems(index)'
      />
      <FbChannel
        v-else-if='unclassed && SupportedChannelType.includes(channel.type)'
        class='mx-4 my-[2px]'
        :channel='channel'
      />
    </template>
  </ACollapse>
</template>
