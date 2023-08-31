<!-- 错误信息展示。 -->

<script lang="ts" setup>
import { FanbookApiError } from 'fanbook-api-node-sdk/es/error';

export interface Props {
  /** 错误对象 */
  error: unknown;
}

const props = defineProps<Props>();

const message = computed(() => String(props.error));
const cause = computed(() => {
  const e = props.error;
  if (e instanceof FanbookApiError && e.code) { // 是接口报错
    return ErrorMessage[e.code];
  }
});
</script>

<template>
  <TechnologyInfo v-if='cause' v-bind='$attrs' title='可能原因' :copyable='false'>
    {{ cause }}。
  </TechnologyInfo>
  <TechnologyInfo v-else v-bind='$attrs' title='错误信息'>
    {{ message }}
  </TechnologyInfo>
</template>
