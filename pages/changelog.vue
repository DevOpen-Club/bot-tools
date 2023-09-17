<script lang="ts" setup>
import { ChangeType } from '~~/global';

definePageMeta({
  title: '更新记录',
});

const { changelog } = useAppConfig();

const TypeText: Record<ChangeType, string> = {
  feat: '功能',
  fix: '修复',
  style: '代码风格',
  refactor: '重构',
  pref: '性能',
  test: '测试',
  revert: '回滚',
  chore: '其他',
  ci: '工作流',
};
const TypeColor: Record<ChangeType, string> = {
  feat: 'arcoblue',
  fix: 'green',
  style: 'gray',
  refactor: 'purple',
  pref: 'blue',
  test: 'gray',
  revert: 'red',
  chore: 'lime',
  ci: 'gray',
};
</script>

<template>
  <ATimeline v-if='changelog.length'>
    <ATimelineItem v-for='log in changelog'>
      <ATypographyText class='m-0' :ellipsis='{ rows: 1, css: true }'>
        <ATag :color='TypeColor[log.type]' size='small'>{{ TypeText[log.type] }}</ATag>
        {{ log.content }}
      </ATypographyText>
      <template #label>
        <AppLink v-if='log.url' style='font-size: inherit;' :to='log.url' />
        {{ new Date(log.date).toLocaleDateString() }}
        by
        {{ log.author }}
      </template>
    </ATimelineItem>
    <ATimelineItem>
      完整内容请前往
      <AppLink to='https://github.com/DevOpen-Club/bot-tools/commits'>
        GitHub
        <template #icon><IconGithub /></template>
      </AppLink>
      查看。
      <template #dot>
        <IconMoreVertical style='color: var(--color-neutral-3)' :size='18' />
      </template>
    </ATimelineItem>
  </ATimeline>
  <ProductionOnlyInfo v-else-if='DEV' />
  <AEmpty v-else>
    更新记录丢了，请前往
    <AppLink to='https://github.com/DevOpen-Club/bot-tools/commits'>
      GitHub
      <template #icon></template>
    </AppLink>
    查看。
  </AEmpty>
</template>
