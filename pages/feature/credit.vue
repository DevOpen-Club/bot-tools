<script lang='ts' setup>
import { ChatMember, Guild } from 'fanbook-api-node-sdk';
import { selectUser } from '~/utils/biz/user-selector';

definePageMeta({
  title: '成员荣誉',
  middleware: ['require-bot'],
});

const LAST_PAGE = 2;
const page = ref(1);
const title = computed(() => {
  switch (page.value) {
    case 1: return '输入用户信息';
    case 2: return `@${input.value.user?.user.first_name} 的荣誉列表`;
  }
});

interface Input {
  guild?: Guild;
  user?: ChatMember;
}
const input: Ref<Input> = ref({});

const pickingGuild = ref(false);
</script>

<template>
  <FbGuildPicker v-model:visible='pickingGuild' @ok='(v) => input.guild = v' />
  <FeatureWrapper>
    <ACard class='card' :title='title'>
      <AForm v-if='page === 1' :model='input' auto-label-width>
        <AFormItem field='guild' label='所在服务器' required>
          <ASpace direction='vertical'>
            <AButton @click='() => pickingGuild = true'>选择服务器</AButton>
            <template v-if='input.guild'>已选择：{{ input.guild.name }}</template>
          </ASpace>
        </AFormItem>
        <AFormItem field='user' label='用户 ID' required>
          <AButton @click='() => selectUser().then((v) => input.user = v)'>选择</AButton>
          {{ input.user }}
        </AFormItem>
      </AForm>
      <template v-else></template>
      <ASpace>
        <AButton v-if='page !== LAST_PAGE' type='primary' @click='() => ++page'>下一步</AButton>
        <AButton v-if='page !== 1' @click='() => --page'>上一步</AButton>
      </ASpace>
    </ACard>
  </FeatureWrapper>
</template>

<style lang="postcss" scoped>
.card:deep() > .arco-card-body {
  @apply flex flex-col justify-items-end !important;
}
</style>
