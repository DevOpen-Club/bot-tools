<!-- 服务器视图。 -->

<script lang="ts" setup>
import { Channel } from 'fanbook-api-node-sdk';

export interface Props {
  /** 服务器频道。 */
  channels: Channel[];
}

defineProps<Props>();
</script>

<template>
  <FbChannelList v-if='channels.length' :channels='channels' />
  <AEmpty v-else>没有频道</AEmpty>
</template>
