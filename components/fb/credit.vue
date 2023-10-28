<!-- 荣誉信息。 -->

<script lang="ts" setup>
import { GuildCredit } from 'fanbook-api-node-sdk';
import { Events as AuthorityEvents } from './credit/authority.vue';

export interface Props {
  credit: GuildCredit;
  editable?: boolean;
}
export type Events = AuthorityEvents & {
  'add-slot-row': [];
  'remove-slot-row': [];
  'add-slot': [];
  'remove-slot': [];
  'edit-slot-value': [row: number, index: number, value: string];
  'edit-slot-label': [row: number, index: number, label: string];
  'edit-slot-image': [row: number, index: number, url: string];
};

const props = defineProps<Props>();
const emit = defineEmits<Events>();

function handleAddSlot(row: number) {
  props.credit.slots[row].push({
    img: LOGO_URL,
    value: '文字',
  });
  emit('add-slot');
}
function handleRemoveSlot(row: number) {
  props.credit.slots[row].pop();
  emit('remove-slot');
}
function handleAddSlotRow() {
  emit('add-slot-row'); // 先上报添加列，再上报往列中添加插槽
  handleAddSlot(props.credit.slots.push([]) - 1);
}
function handleRemoveSlotRow() {
  props.credit.slots.pop();
  emit('remove-slot-row');
}
</script>

<template>
  <ACard class='rounded-lg'>
    <ARow v-for='(slots, row) in credit.slots' class='justify-center flex-col'>
      <div class='flex w-full overflow-auto'>
        <FbCreditSlot
          v-for='(slot, index) in slots'
          class='mb-2 w-full'
          :slot='slot'
          :editable='editable'
          @edit-value='(value) => emit("edit-slot-value", row, index, value)'
          @edit-label='(label) => emit("edit-slot-label", row, index, label)'
          @edit-image='(url) => emit("edit-slot-image", row, index, url)'
        />
        <div v-if='editable' class='flex flex-col'>
          <ADivider direction='vertical' />
          <FbCreditOpButtons
            class='flex-col'
            add
            :remove='slots.length > 1'
            @add='() => handleAddSlot(row)'
            @remove='() => handleRemoveSlot(row)'
          />
        </div>
      </div>
    </ARow>
    <template v-if='editable'>
      <ADivider class='mt-0 mb-2' />
      <div class='flex justify-center w-full'>
        <FbCreditOpButtons
          add
          :remove='credit.slots.length > 1'
          @add='handleAddSlotRow'
          @remove='handleRemoveSlotRow'
        />
      </div>
    </template>
    <template #title>
      <FbCreditAuthority :authority='credit.authority' :editable='editable' v-on='emit' />
    </template>
  </ACard>
</template>

<style lang="postcss" scoped>
.arco-card:deep() {
  .arco-scrollbar {
    @apply w-full;
  }
  .arco-card-body {
    @apply py-2;
  }
  .arco-typography {
    @apply m-0;
  }
  .arco-typography-edit-content {
    @apply inline-flex;
    @apply m-0;
    @apply left-0;
    input {
      @apply text-center;
    }
  }
  .arco-card-header-title {
    @apply inline-flex;
    .arco-typography-edit-content input {
      @apply text-left;
    }
    .arco-avatar-image {
      @apply rounded-lg;
    }
  }
  .arco-avatar-image > img {
    object-fit: contain;
  }
}
</style>

