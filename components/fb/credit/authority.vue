<!-- 荣誉颁发者。 -->

<script lang="ts" setup>
import { CreditAuthority } from 'fanbook-api-node-sdk';
import { selectImage } from '~/utils/biz/image-selector';

export interface Props {
  authority: CreditAuthority;
  editable?: boolean;
}
export type Events = {
  'edit-icon': [url: string];
  'edit-name': [name: string];
};

const props = defineProps<Props>();
const emit = defineEmits<Events>();

function handleEditedAuthorityName(v: string) {
  props.authority.name = v;
  emit('edit-name', v);
}
async function handleEditAuthorityIcon() {
  if (!props.editable) return;
  const url = await selectImage();
  if (url) {
    props.authority.icon = url;
    emit('edit-icon', url);
  }
}
</script>

<template>
  <AAvatar
    class='min-w-[36px] min-h-[36px] bg-transparent'
    :image-url='authority.icon'
    @click='handleEditAuthorityIcon'
  >
    <template v-if='editable' #trigger-icon><IconEdit /></template>
  </AAvatar>
  <ATypographyParagraph
    class='inline-flex items-center ml-2 font-bold'
    :editable='editable'
    :edit-text='authority.name'
    @change='handleEditedAuthorityName'
  >
    {{ authority.name }}
  </ATypographyParagraph>
</template>
