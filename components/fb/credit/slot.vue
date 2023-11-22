<!-- 荣誉插槽。 -->

<script lang="ts" setup>
import { CreditSlot } from 'fanbook-api-node-sdk';
import { selectImage } from '~/utils/biz/image-selector';

export interface Props {
  slot: CreditSlot;
  editable?: boolean;
}
export type Events = {
  'edit-value': [value: string];
  'edit-label': [label: string];
  'edit-image': [url: string];
};

const props = defineProps<Props>();
const emit = defineEmits<Events>();

function handleEditedValue(v: string) {
  props.slot.value = v;
  emit('edit-value', v);
}
function handleEditedLabel(v: string) {
  props.slot.label = v;
  emit('edit-label', v);
}
async function handleEditImage() {
  if (!props.editable) return;
  const url = await selectImage();
  if (url) {
    props.slot.img = url;
    emit('edit-image', url);
  }
}
</script>

<template>
  <div class='flex flex-col items-center min-w-[100px]'>
    <AAvatar
      v-if='slot.img'
      class='w-[52px] h-[52px] bg-transparent'
      :image-url='slot.img'
      @click='handleEditImage'
    >
      <template v-if='editable' #trigger-icon><IconEdit /></template>
    </AAvatar>
    <div class='inline-block overflow-auto'>
      <ATypographyText v-if='slot.label' class='text-gray-500' :editable='editable' :edit-text='slot.label' @change='handleEditedLabel'>
        {{ slot.label }}
      </ATypographyText>
      <span v-if='slot.label' class='text-gray-500'>：</span>
      <ATypographyText :editable='editable' :edit-text='slot.value' @change='handleEditedValue'>
        {{ slot.value }}
      </ATypographyText>
    </div>
  </div>
</template>
