<!-- 风险检查结果。 -->

<script lang="ts" setup>
import { promiseTimeout } from '@vueuse/core';
import { Category, Result } from '~/utils/feature/audit';

export interface Props {
  /** 全服检测结果。 */
  result: Result;
}
export type Events = {
  /** 忽略风险项。 */
  'ignore': [tab: Category, index: number];
}

const props = defineProps<Props>();
const emit = defineEmits<Events>();

const resultLength = ref(0);
watch(() => props.result, (v) => { // props.result 改变时，长度同步修改
  resultLength.value = Object.values(v).flat().length;
}, { immediate: true, deep: true });

const animationStarted = ref(false);
const animationHistory = useRefHistory(resultLength, { capacity: 1 }); // 每次动画从上一次的值开始
onMounted(async () => {
  // 0.5s 后开始播放动画
  await promiseTimeout(500);
  animationStarted.value = true;
});
</script>

<template>
  <template v-if='resultLength'>
    <AStatistic
      class='w-full text-center'
      title='共发现风险项'
      :value='resultLength'
      :start='animationStarted'
      animation
      :value-from='animationHistory.history.value[0].snapshot'
    >
      <template #suffix>个</template>
    </AStatistic>
    <BizAuditDetails :result='result' @ignore='(tab, index) => emit("ignore", tab, index)' />
  </template>
  <BizAuditSafe v-else />
</template>

<style lang="postcss" scoped>
:deep() .arco-statistic-value-integer {
  color: rgb(var(--danger-6));
}
</style>
