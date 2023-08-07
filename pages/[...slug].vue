<script lang="ts" setup>
definePageMeta({
  title: '404 Not Found',
});
</script>

<template>
  <AResult status='404' title='这里没有机器人存在'>
    <template #extra>
      <AButton type='primary' @click='back'>返回上一页</AButton>
    </template>
  </AResult>
</template>
