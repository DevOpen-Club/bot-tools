import viteLegacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// base url 需要以 `/` 开头和结尾
let baseUrl = process.env.NUXT_APP_BASE_URL ?? '/';

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  ssr: false,
  app: {
    baseURL: baseUrl,
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'Fanbook 机器人工具',
      link: [
        { href: `${baseUrl}logo.png`, rel: 'icon' },
      ],
    },
  },
  components: false, // https://github.com/antfu/unplugin-vue-components/issues/657
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  vite: {
    plugins: [
      viteLegacy({
        targets: ['chrome >= 77'],
      }),
      Components({
        dts: true,
        dirs: ['components'],
        directoryAsNamespace: true,
        resolvers: [
          ArcoResolver({ resolveIcons: true }),
        ],
      }),
    ],
  },
  devServer: {
    port: 5443,
  },
  content: {
    sources: {
      content: {
        driver: 'fs',
        prefix: '/docs',
        base: path.resolve(__dirname, './docs'),
      },
    },
  },
});
