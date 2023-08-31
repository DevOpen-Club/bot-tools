/** 服务器风险检测。 */

import { IconUserGroup } from '@arco-design/web-vue/es/icon';
import { GuildRole, Permission } from 'fanbook-api-node-sdk';
import { PermissionText } from '~/utils/fanbook';

/** 全服检测分类。 */
export type Category = '身份组';
/** 全服检测结果。 */
export type Result = Record<Category, CheckResult[]>;

export const ICONS: Record<Category, Component> = {
  '身份组': IconUserGroup,
};

/** 检测点风险等级。 */
export enum CheckResultLevel {
  SAFE,
  LOW,
  HIGH,
}

/** 检测结果。 */
export interface CheckResult {
  /** 检测对象名称。 */
  name: string;
  /** 风险等级。 */
  level: CheckResultLevel;
  /** 原因。 */
  cause: string[];
}

export interface CheckRolePermissionsResult extends CheckResult {
  /** 身份组拥有的权限。 */
  permissions: string[];
}
const permissionLevel = {
  high: [
    Permission.ADMINISTRATOR,
    Permission.KICK_MEMBERS,
  ],
  low: [
    Permission.MANAGE_GUILD,
    Permission.MANAGE_MESSAGES,
    Permission.MANAGE_ROLES,
    Permission.MANAGE_CIRCLE,
  ],
};
/**
 * 检测身份组权限风险。
 * @param role 身份组
 * @returns 检测结果
 */
export function checkRolePermissions(role: GuildRole): CheckRolePermissionsResult | undefined {
  if (role.managed) return; // 机器人权限
  if (role.position === 0 || String(role.position).startsWith('99')) return; // 固定角色
  const permissions: string[] = [];
  for (const item of Object.keys(PermissionText)) {
    if (role.permissions & Number(item)) {
      // @ts-ignore 确定 item 是键
      permissions.push(PermissionText[item]);
    }
  }
  let level = CheckResultLevel.SAFE, cause: string[] = [];
  const low = permissionLevel.low.filter((v) => role.permissions & v);
  const high = permissionLevel.high.filter((v) => role.permissions & v);
  if (low.length) level = CheckResultLevel.LOW;
  if (high.length) level = CheckResultLevel.HIGH;
  cause = cause
    // @ts-ignore 确定 v 是键
    .concat(low.map((v) => `拥有权限“${PermissionText[v]}”`))
    // @ts-ignore 确定 v 是键
    .concat(high.map((v) => `拥有高危权限“${PermissionText[v]}”`));
  return { name: role.name, permissions, level, cause };
}
