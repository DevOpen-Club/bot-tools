/** Fanbook 服务相关通用工具。 */

import { ChannelType, GuildRole, Permission } from 'fanbook-api-node-sdk';

/** 权限文案。 */
export const PermissionText = {
  [Permission.CREATE_INSTANT_INVITE]: '创建邀请',
  [Permission.KICK_MEMBERS]: '移除和拉黑成员',
  [Permission.ADMINISTRATOR]: '超级管理员',
  [Permission.MANAGE_CHANNELS]: '管理频道',
  [Permission.MANAGE_GUILD]: '管理服务器',
  [Permission.ADD_REACTIONS]: '消息表态',
  [Permission.STREAM]: '发起直播',
  [Permission.VIEW_CHANNEL]: '查看频道',
  [Permission.SEND_MESSAGES]: '发言',
  [Permission.MANAGE_MESSAGES]: '管理消息',
  [Permission.READ_MESSAGE_HISTORY]: '查看历史消息',
  [Permission.MENTION_EVERYONE]: '@ 所有人和身份组。',
  [Permission.CONNECT]: '进入语音频道',
  [Permission.SPEAK]: '语音频道开麦',
  [Permission.MUTE_MEMBERS]: '控场',
  [Permission.MOVE_MEMBERS]: '语音频道踢人',
  [Permission.MANAGE_ROLES]: '管理身份组',
  [Permission.MANAGE_EMOJIS_AND_STICKERS]: '管理表情',
  [Permission.MANAGE_CIRCLE]: '管理圈子',
} as const;

/** 错误码对应诊断信息。 */
export const ErrorMessage: Record<number, string> = {
  1008: '机器人不在服务器内',
};

/** 支持列出的频道类型（不包括频道分类）。 */
export const SupportedChannelType = [
  ChannelType.TextChannel,
  ChannelType.VoiceChannel,
  ChannelType.VideoChannel,
  ChannelType.LiveStreamChannel,
  ChannelType.LinkChannel,
  20, // 问答频道
];

/**
 * 获取服务器身份组列表。
 * @param guild 服务器 ID
 * @returns 身份组列表
 */
export async function getGuildRoles(guild: bigint) {
  const ret: GuildRole[] = [];
  let last: GuildRole[] = [];
  do {
    last = await getCurrentBot().listGuildRole(guild, last.at(-1)?.id);
    ret.push(...last);
  } while (last.length);
  return ret;
}
