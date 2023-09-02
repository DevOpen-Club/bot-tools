<script lang="ts" setup>
import { ChangeType } from '~~/global';

definePageMeta({
  title: '更新记录',
});

const { changelog } = useAppConfig();

const TypeText: Record<ChangeType, string> = {
  feat: '功能',
  fix: 'Bug 修复',
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
  <ATypographyParagraph>
    仅列出最近 20 条更新记录，<br />
    完整版请前往
    <AppLink to='https://github.com/DevOpen-Club/bot-tools/commits'>GitHub</AppLink>
    查看。
  </ATypographyParagraph>
  <ATimeline>
    <ATimelineItem v-for='log in changelog'>
      <ATypographyText class='m-0' :ellipsis='{ rows: 1, css: true }'>
        <ATag :color='TypeColor[log.type]' size='small'>{{ TypeText[log.type] }}</ATag>
        {{ log.content }}
      </ATypographyText>
      <template #label>
        {{ new Date(log.date).toLocaleDateString() }} by
        <AppLink style='font-size: inherit;' :to='log.author.url'>
          {{ log.author.name }}
          <template #icon></template>
        </AppLink>
        <AppLink v-if='log.url' class='absolute right-0' style='font-size: inherit;' :to='log.url'>
          <template #icon><IconGithub /></template>
        </AppLink>
      </template>
    </ATimelineItem>
  </ATimeline>
</template>
