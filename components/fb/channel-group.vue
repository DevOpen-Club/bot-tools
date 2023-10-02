<!-- 频道分组。 -->

<script lang="ts" setup>
import { Channel } from 'fanbook-api-node-sdk';

export interface Props {
  /** 展示的频道分组。 */
  channel: Channel;
  /** 在分组下的频道。 */
  children: Channel[];
}

defineProps<Props>();
</script>

<template>
  <ACollapseItem :key='channel.channel_id' :header='channel.name'>
    <FbChannel v-for='item in children' :channel='item' />
  </ACollapseItem>
</template>

<style lang="postcss" scoped>
:deep() .arco-collapse-item-content-box {
  @apply flex flex-col;
}
</style>
