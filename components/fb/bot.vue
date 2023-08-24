<!-- 机器人简略信息。 -->

<script lang="ts" setup>
import { User } from 'fanbook-api-node-sdk';

export interface Props {
  /** 要展示的机器人资料。 @default DEFAULT_INFO */
  info: User;
}

const props = defineProps<Props>();

const avatar = computed(() => {
  return Reflect.get(props.info, 'avatar') as string | undefined;
});
</script>

<template>
  <ASpace class='h-[30px] overflow-visible' direction='horizontal'>
    <AAvatar class='w-[30px] h-[30px]' :image-url='avatar' />
    {{ info.first_name }}
  </ASpace>
</template>
