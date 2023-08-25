/** 机器人相关通用工具。 */

import { Bot } from 'fanbook-api-node-sdk';

export const BOTS_STORAGE_KEY = 'bots';

/** 需要添加机器人。 */
export class RequireBotError extends Error {
  constructor() {
    super('Please add a bot first');
  }
}

export const bots: Ref<Bot[]> = ref([]);
const botTokens = useLocalStorage<string[]>(BOTS_STORAGE_KEY, [], { deep: true });
for (const token of botTokens.value) { // 初始化
  bots.value.push(new Bot(token));
}
watch(bots, (v) => { // 持久化
  botTokens.value = v.map((v) => v.token);
}, { deep: true });

/** @return 是否已添加机器人。 */
export const hasAnyBot = () => !!bots.value.length;

/**
 * 判断是否已添加指定机器人。
 * @param token 机器人 token
 * @returns 是否已添加
 */
export const hasBot = (token: string) => bots.value.some((v) => v.token === token);

/**
 * 获取当前机器人。
 * @returns 当前机器人
 * @throws RequireBotError
 */
export function getCurrentBot() {
  if (!bots.value.length) throw new RequireBotError();
  return bots.value[0];
}
/**
 * 获取当前机器人，不抛出错误。
 * @returns 当前机器人，不存在则为 `undefined`
 */
export function getCurrentBotSafe() {
  if (hasAnyBot()) return getCurrentBot();
  else return undefined;
}

/**
 * 添加机器人。
 * @param bot 要添加的机器人
 */
export function addBot(bot: Bot) {
  if (hasBot(bot.token)) return;
  bots.value.push(bot);
}

/**
 * 切换机器人。
 * @param index 切换到的机器人在 `bots` 中的下标
 */
export function switchCurrentBot(index: number) {
  const arr = [...bots.value]; // 把切换的机器人移到第一位
  arr.splice(index, 1);
  arr.unshift(bots.value[index]);
  bots.value = arr;
}
