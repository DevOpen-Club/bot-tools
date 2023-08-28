<!-- 风险风险详情。 -->

<script lang="ts" setup>
import { Category, CheckResultLevel, ICONS, Result } from '~/utils/feature/audit';

export interface Props {
  /** 全服检测结果。 */
  result: Result;
}
export type Events = {
  /** 忽略风险项。 */
  'ignore': [tab: Category, index: number];
}

defineProps<Props>();
const emit = defineEmits<Events>();
</script>

<template>
  <ATabs lazy-load>
    <ATabPane v-for='(items, tab) in result'>
      <ACollapse v-if='items.length'>
        <ACollapseItem v-for='(item, index) in items' :key='item.name'>
          <template v-for='cause in item.cause'>
            {{ cause }}
            <br />
          </template>
          <template #header>
            <Text>
              <ATag v-if='item.level === CheckResultLevel.HIGH' color='red'>高危</ATag>
              {{ item.name }}
            </Text>
          </template>
          <template #extra>
            <IconCloseCircle @click='() => emit("ignore", tab, index)' />
          </template>
        </ACollapseItem>
      </ACollapse>
      <BizAuditSafe v-else />
      <template #title>
        <component :is='ICONS[tab]' />
        {{ tab }}
      </template>
    </ATabPane>
  </ATabs>
</template>
