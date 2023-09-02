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

export default defineNuxtModule({
  meta: {
    name: 'changelog',
  },
  hooks: {
    ready: async (nuxt) => {
      const octokit = new Octokit();
      const logs = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'DevOpen-Club',
        repo: 'bot-tools',
        per_page: LOG_COUNT_LIMIT,
        headers: { 'x-github-api-version': '2022-11-28' },
      });
      // 解析 commit
      const changelog = await Promise.all(logs.data.map(async (v): Promise<ChangeLogRecord> => {
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
      nuxt.options.appConfig.changelog = changelog;
      nuxt.options.appConfig.version =
        process.env.NODE_ENV === 'development'
        ? 'DEV'
        : logs.data[0].sha.substring(0, 7);
      console.log('ℹ Building version: %s', nuxt.options.appConfig.version);
    },
  },
});
