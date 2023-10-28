import { FormItem, Input, Modal } from '@arco-design/web-vue';

const VALIDATE_REGEXP = /^http(s)?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]{1,5})?[-a-zA-Z0-9()@:%_\\\+\.~#?&//=]*$/;
const MAX_LENGTH = 8182;

export interface SelectImageOptions {
  /** 弹窗标题。 */
  title?: string;
}

/**
 * 选择图片。
 * @param options 选项
 * @returns 图片地址
 */
export function selectImage(options?: SelectImageOptions): Promise<string | undefined> {
  return new Promise((resolve) => {
    const input = ref('');
    const status: Ref<undefined | 'error'> = ref(undefined);

    function handleInput() {
      if (VALIDATE_REGEXP.test(input.value)) status.value = undefined;
      else status.value = 'error';
    }

    Modal.open({
      title: options?.title ?? '选择图片',
      //@ts-ignore
      content: () => (
        <FormItem
          label='图片链接'
          feedback
          validateStatus={status.value}
          v-slot={{
            help: () => status.value === 'error' ? '请输入正确的图片链接' : undefined
          }}
        >
          <Input
            modelValue={input.value}
            maxLength={MAX_LENGTH}
            onUpdate:modelValue={(v) => input.value = v}
            onChange={handleInput}
          />
        </FormItem>
      ),
      onCancel: () => resolve(undefined),
      onOk: () => resolve(input.value),
    });
  });
}
