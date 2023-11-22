import { Button, FormItem, InputNumber, Modal } from '@arco-design/web-vue';
import { ChatMember, Guild } from 'fanbook-api-node-sdk';
import FbGuildPicker from '~/components/fb/guild-picker.vue';

export interface SelectUserOptions {
  /** 弹窗标题。 */
  title?: string;
  /** 默认的服务器。 */
  defaultGuild?: Guild;
  /** 是否隐藏服务器选择器。 */
  hideGuild?: boolean;
}

export function selectUser(options?: SelectUserOptions): Promise<ChatMember | undefined> {
  return new Promise((resolve) => {
    const guild = ref(options?.defaultGuild);
    const selectingGuild = ref(false);
    const id: Ref<number | undefined> = ref();
    const user: Ref<ChatMember | undefined> = ref();
  
    async function handleIdChange(value?: number) {
      if (!value || !guild.value) {
        user.value = undefined;
        return;
      }
      [user.value] = await getCurrentBot().getMembersByShortIds(
        BigInt(guild.value.guild_id),
        [value],
      );
    }

    Modal.open({
      title: options?.title ?? '选择用户',
      content: () => (<>
        {!options?.hideGuild && <FormItem label='所在服务器' required v-slot={{
          help: () => guild ? `已选择：${guild.value?.name}` : '',
        }}>
          <FbGuildPicker visible={selectingGuild.value} onOk={(v: Guild) => guild.value = v} onClose={() => selectingGuild.value = false} />
          <Button type={guild.value ? 'secondary' : 'outline'} onClick={() => selectingGuild.value = true}>
            选择服务器
          </Button>
        </FormItem>}
        <FormItem label='用户 ID' required>
          <InputNumber
            v-model={id.value}
            hideButton
            min={0}
            precision={0}
            onChange={handleIdChange}
            v-slot={{
              prefix: () => '#',
            }}
          />
        </FormItem>
      </>),
      onOk: () => resolve(user.value),
      onCancel: () => resolve(undefined),
    });
  });
}
