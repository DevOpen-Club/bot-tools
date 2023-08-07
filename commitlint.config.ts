import { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-leading-blank': [2, 'always'],
    'body-leading-blank': [2, 'always'],
    'scope-enum': [1, 'always', [
      'bot',
    ]],
  },
};

module.exports = config;
