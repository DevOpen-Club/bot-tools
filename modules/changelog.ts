import { defineNuxtModule, useLogger } from 'nuxt/kit';
import { ChangeLogRecord, ChangeType } from '~~/global';
import git, { DefaultLogFields, LogResult } from 'simple-git';
import message from '@commitlint/parse';
import { escapeRegExp, trim } from 'lodash-es';

const logger = useLogger('changelog');
const LOG_COUNT_LIMIT = 20;
const VIA_PR_TESTER = /\(#\d+\)/;

function isSkip() {
  const event = process.env.npm_lifecycle_event;
  switch (event) {
    case 'build':
    case 'generate':
      return false;
    default:
      return true;
  }
}

/**
 * 替换字符串中最后一个子串。
 * @param str 原字符串
 * @param searchValue 需要替换的子串
 * @param replaceValue 替换成的子串
 * @returns 结果
 */
function replaceLast(str: string, searchValue: string, replaceValue: string) {
  searchValue = escapeRegExp(searchValue);
  replaceValue = escapeRegExp(replaceValue);
  return str.replace(new RegExp(`(.*)${searchValue}`), `$1${replaceValue}`);
}

type Logs = LogResult<DefaultLogFields>;
/** @returns 获取 commit log。 */
async function getLogs() {
  const repo = git();
  return await repo.log({
    maxCount: LOG_COUNT_LIMIT,
  });
}

/**
 * commit log 转更新记录。
 * @param logs commit log
 * @returns 更新记录
 */
async function toChangelog(logs: Logs) {
  // 解析 commit
  return await Promise.all(logs.all.map(async (v): Promise<ChangeLogRecord> => {
    const msg = await message(v.message);
    const pr = VIA_PR_TESTER.exec(msg.header)?.[0];
    return {
      author: v.author_name,
      date: v.date,
      type: (msg.type ?? 'chore') as ChangeType,
      content:
        (msg.subject && pr)
        ? replaceLast(msg.subject, ' ' + pr, '')
        : msg.header,
      url: pr
        ? `https://github.com/DevOpen-Club/bot-tools/pull/${trim(pr, '(#)')}`
        : `https://github.com/DevOpen-Club/bot-tools/commit/${v.hash}`,
    };
  }));
}

/**
 * commit log 转当前版本号。
 * @param logs commit log
 * @returns 当前版本号
 */
function toVersion(logs: Logs) {
  if (process.env.NODE_ENV === 'development') { // 开发环境
    return 'DEV';
  }
  if (process.env.PULL_REQUEST && process.env.PULL_REQUEST !== 'false') { // 内测环境
    return `PREVIEW${process.env.REVIEW_ID}`;
  }
  return logs.latest!.hash.substring(0, 7); // 正式环境;
}

export default defineNuxtModule({
  meta: {
    name: 'changelog',
  },
  hooks: {
    ready: async (nuxt) => {
      if (isSkip()) {
        logger.info('Changelog generating skipped');
        nuxt.options.appConfig.changelog = [];
        nuxt.options.appConfig.version = 'DEV';
      } else {
        logger.info('Fetching changelog data');
        const logs = await getLogs();
        const changelog = await toChangelog(logs);
        nuxt.options.appConfig.changelog = changelog;
        nuxt.options.appConfig.version = toVersion(logs);
        logger.success('Changelog generated for version %s', nuxt.options.appConfig.version);
      }
    },
  },
});
