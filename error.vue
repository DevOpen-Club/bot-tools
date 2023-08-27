<script lang="ts" setup>
import { promiseTimeout } from '@vueuse/core';

export interface Props {
  error: unknown;
}

const props = defineProps<Props>();

const details = computed(() => String(props.error));

const handleReport = () => window.open('https://github.com/DevOpen-Club/bot-tools/issues');
const handleBack = () => clearError({ redirect: '/' });

/** 是否支持剪贴板 API。 */
const clipboard = useClipboard({ legacy: true });
const copied = ref(false);
async function handleCopy() {
  await clipboard.copy(details.value);
  copied.value = true;
  await promiseTimeout(2500);
  copied.value = false;
}
</script>

<template>
  <AResult status='500' title='貌似出现了点问题'>
    <template #extra>
      <ASpace class='mb-5'>
        <AButton type='primary' @click='handleReport'>反馈问题</AButton>
        <AButton @click='handleBack'>返回首页</AButton>
      </ASpace>
      <AAlert class='md:w-1/2 mx-auto' type='normal'>
        {{ details }}
        <template #title>
          错误信息
          <AButton v-if='clipboard.isSupported' class='absolute right-0' size='mini' @click='handleCopy'>
            复制
            <template v-if='copied' #icon>
              <IconCheckCircleFill />
            </template>
          </AButton>
        </template>
      </AAlert>
    </template>
  </AResult>
</template>

<style lang="postcss" scoped>
:deep() {
  .arco-alert-body {
    @apply w-full;
  }
  .arco-alert-content {
    word-wrap: break-word;
  }
}
</style>
