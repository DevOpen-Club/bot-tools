<script lang="ts" setup>
const features = useAppConfig().featureEntries;
</script>

<template>
  <div>
    <ACard v-for='(items, index) in features' class='flex flex-col mb-3 category-card' :title='index'>
      <ACard v-for='item in items' class='w-[80px] h-[80px] m-2 feature-card' :bordered='false' @click='() => navigateTo(item.link)'>
        <component class='mb-1.5' :is='item.icon' :size='32' />
        {{ item.label }}
      </ACard>
    </ACard>
  </div>
</template>

<style lang="postcss" scoped>
:deep() .arco-card-body {
  @apply p-0;
}
.category-card:deep() > .arco-card-body {
  @apply flex flex-wrap;
}
.feature-card:deep() > .arco-card-body {
  @apply flex flex-col items-center justify-center;
  @apply w-full h-full;
  @apply cursor-pointer;
}
</style>
