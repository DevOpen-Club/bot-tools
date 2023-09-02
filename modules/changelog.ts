import { defineNuxtModule } from 'nuxt/kit';
import { ChangeLogRecord, ChangeType } from '~~/global';
import { Octokit } from 'octokit';
import message from '@commitlint/parse';
import { escapeRegExp, trim } from 'lodash-es';

const LOG_COUNT_LIMIT = 20;
const VIA_PR_TESTER = /\(#\d+\)/;

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

type Log = Awaited<ReturnType<typeof getLogs>>['data'][0];
/** @returns 获取 commit log。 */
async function getLogs() {
  const octokit = new Octokit();
  return await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'DevOpen-Club',
    repo: 'bot-tools',
    per_page: LOG_COUNT_LIMIT,
    headers: { 'x-github-api-version': '2022-11-28' },
  });
}

/**
 * commit log 转更新记录。
 * @param logs commit log
 * @returns 更新记录
 */
async function toChangelog(logs: Log[]) {
  // 解析 commit
  return await Promise.all(logs.map(async (v): Promise<ChangeLogRecord> => {
    const msg = await message(v.commit.message);
    const pr = VIA_PR_TESTER.exec(msg.header)?.[0];
    return {
      author: {
        name: v.commit.author!.name!,
        url: v.author!.html_url,
      },
      date: v.commit.committer!.date!,
      type: (msg.type ?? 'chore') as ChangeType,
      content:
        (msg.subject && pr)
        ? replaceLast(msg.subject, ' ' + pr, '')
        : msg.header,
      url: pr
        ? `https://github.com/DevOpen-Club/bot-tools/pull/${trim(pr, '(#)')}`
        : v.html_url,
    };
  }));
}

/**
 * commit log 转当前版本号。
 * @param logs commit log
 * @returns 当前版本号
 */
function toVersion(logs: Log[]) {
  if (process.env.NODE_ENV === 'development') { // 开发环境
    return 'DEV';
  }
  if (process.env.PULL_REQUEST && process.env.PULL_REQUEST !== 'false') { // 内测环境
    return process.env.REVIEW_ID!.replace('deploy-', ''); // deploy-preview-12 改为 preview-12
  }
  return logs[0].sha.substring(0, 7); // 正式环境;
}

export default defineNuxtModule({
  meta: {
    name: 'changelog',
  },
  hooks: {
    ready: async (nuxt) => {
      if (process.env.NODE_ENV !== 'development') {
        console.log('ℹ Fetching changelog data');
        const logs = await getLogs();
        const changelog = await toChangelog(logs.data);
        nuxt.options.appConfig.changelog = changelog;
        nuxt.options.appConfig.version = toVersion(logs.data);
        console.log('ℹ Building version: %s', nuxt.options.appConfig.version);
      } else {
        console.log('ℹ Starting development server');
        nuxt.options.appConfig.changelog = [];
        nuxt.options.appConfig.version = 'DEV';
      }
    },
  },
});
