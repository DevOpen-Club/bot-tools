<!-- BigInt 输入。 -->

<script lang="ts" setup>
export interface Props {
  modelValue?: bigint;
}
export type Events = {
  'update:modelValue': [value: bigint | undefined];
  /** 输入正确。 */
  change: [value: bigint];
  /** 输入错误。 */
  error: [value: string];
}

defineProps<Props>();
const emit = defineEmits<Events>();

function handleInput(v?: string) {
  if (v === undefined || !v.length) {
    emit('update:modelValue', undefined);
  } else {
    const value = tryBigintify(v);
    emit('update:modelValue', value);
    if (value === undefined) emit('error', v);
    else emit('change', value);
  }
}
</script>

<template>
  <AInput @change='handleInput'>
    <template v-for='(_, name) in $slots' #[name]><slot :name='name' /></template>
  </AInput>
</template>
