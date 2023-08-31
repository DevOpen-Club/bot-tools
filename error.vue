<script lang="ts" setup>
import { promiseTimeout } from '@vueuse/core';

export interface Props {
  error: unknown;
}

const props = defineProps<Props>();

const details = computed(() => String(props.error));

const handleReport = () => window.open('https://github.com/DevOpen-Club/bot-tools/issues');
const handleBack = () => clearError({ redirect: '/' });
</script>

<template>
  <AResult status='500' title='貌似出现了点问题'>
    <template #extra>
      <ASpace class='mb-5'>
        <AButton type='primary' @click='handleReport'>反馈问题</AButton>
        <AButton @click='handleBack'>返回首页</AButton>
      </ASpace>
      <TechnologyInfo class='md:w-1/2 mx-auto' title='错误信息'>
        {{ details }}
      </TechnologyInfo>
    </template>
  </AResult>
</template>
