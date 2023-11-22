<script lang="ts" setup>
import { User } from 'fanbook-api-node-sdk';

export interface Props {
  modelValue: User[];
  /** 所属服务器。 */
  guild?: bigint;
  /** 最大选择人数。 @default 1 */
  max?: number;
  /** 最大显示人数。 @default 1 */
  maxShow?: number;
}
export type Events = {
  'update:model-value': [value: User[]];
};

const props = withDefaults(defineProps<Props>(), {
  max: 1,
  maxShow: 1,
});
const emit = defineEmits<Events>();

const adding = ref(false);
</script>

<template>
  <ASpace>
    <AAvatarGroup :max-count='maxShow'>
      <AAvatar v-for='item in modelValue'>
        {{ item.first_name }}
      </AAvatar>
    </AAvatarGroup>
    <AButton v-if='modelValue.length < max' shape='round' @click='() => adding = !adding'>
      <template #icon><IconPlus /></template>
    </AButton>
    <AInputNumber v-if='adding' hide-button :min='0' :precision='0'>
      <template #prefix>#</template>
    </AInputNumber>
  </ASpace>
</template>
