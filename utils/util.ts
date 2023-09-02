/** 其他通用工具。 */

import { VNodeArrayChildren, VNodeProps } from 'vue';

export type RawProps = VNodeProps & {
  __v_isVNode?: never;
  [Symbol.iterator]?: never;
} & Record<string, any>;
export type RawSlots = {
  [name: string]: unknown;
  $stable?: boolean;
  /* removed internal: _ctx */
  /* removed internal: _ */
};
export type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);

/*** `interface` 转 `type`。 */
export type ToType<T> = {
  [K in keyof T]: T[K];
};

/** 是否开发环境。 */
export const DEV = import.meta.env.DEV;

/**
 * 尝试将字符串转为 `BigInt`，失败则返回 `undefined`。
 * @param value 要转换的字符串
 * @returns 转换结果
 */
export function tryBigintify(value: string) {
  try {
    return BigInt(value);
  } catch {
    return undefined;
  }
}
