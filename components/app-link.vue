<!-- 链接。 -->

<script lang="ts" setup>
export interface Props {
  to: string;
}
export interface Slots {
  default: (props: {}) => any;
  /** 链接前的图标。 */
  icon: (props: {}) => any;
}

const props = defineProps<Props>();
defineSlots<Slots>();

/** 是否是外部链接。 */
const external = computed(() => {
  return !props.to.toString().startsWith('/');
});
</script>

<template>
  <ALink v-if='external' v-bind='$attrs' :href='to.toString()' :hoverable='false' target='_blank'>
    <span style='color: initial;'>
      <slot v-if='$slots.icon' name='icon' />
      <IconLink v-else class='mr-0.5' />
    </span>
    <slot />
  </ALink>
  <RouterLink v-else v-slot='{ navigate }' :to='to' custom>
    <ALink v-bind='$attrs' :hoverable='false' @click='navigate'>
      <slot name='icon' />
      <slot />
    </ALink>
  </RouterLink>
</template>
