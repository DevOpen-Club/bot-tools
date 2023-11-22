/** 其他通用工具。 */

/** 是否开发环境。 */
export const DEV = import.meta.env.DEV;

/** logo 图片地址。 */
export const LOGO_URL = '/logo.png';

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
