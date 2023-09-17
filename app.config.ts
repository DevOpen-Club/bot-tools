import { AppConfig } from 'nuxt/schema';
import { markRaw } from 'vue';
import { IconDelete, IconExclamationCircle, IconMessage } from '@arco-design/web-vue/es/icon';

const FANBOOK_ICON = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns:xlink="http://www.w3.org/1999/xlink" height="1024px" version="1.1" viewBox="0 0 1024 1024" width="1024px" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill-rule="nonzero"><path d="M224,0 L800,0 C923.711784,-2.2725486e-14 1024,100.288216 1024,224 L1024,800 C1024,923.711784 923.711784,1024 800,1024 L224,1024 C100.288216,1024 1.5150324e-14,923.711784 0,800 L0,224 C-1.5150324e-14,100.288216 100.288216,2.2725486e-14 224,0 Z" fill="#FFFFFF"/><g transform="translate(199.111112, 164.977777)"><path d="M244.622222,267.37664 L244.622222,665.6 C244.622222,681.309435 231.88721,694.044447 216.177778,694.044447 L113.777778,694.044447 C98.0683448,694.044447 85.3333335,681.309435 85.3333335,665.6 L85.3333335,267.37664 L244.622222,267.37664 Z M216.177778,0 C231.88721,0 244.622222,12.7350116 244.622222,28.4444445 L244.622222,108.08832 L85.3333335,108.08832 L85.3333335,28.4444445 C85.3333335,12.7350116 98.0683448,0 113.777778,0 L216.177778,0 Z" fill="#198CFE"/><path d="M540.444447,585.95328 L540.444447,665.6 C540.444447,681.309435 527.709435,694.044447 512,694.044447 L409.6,694.044447 C393.890567,694.044447 381.155555,681.309435 381.155555,665.6 L381.155555,585.95328 L540.444447,585.95328 Z M512,0 C527.709435,0 540.444447,12.7350116 540.444447,28.4444445 L540.444447,426.66496 L381.155555,426.66496 L381.155555,28.4444445 C381.155555,12.7350116 393.890567,0 409.6,0 L512,0 Z" fill="#00B34A"/><path d="M85.32992,426.666666 L85.32992,585.955553 L28.4444445,585.955553 C12.7350116,585.955553 0,573.220541 0,557.511112 L0,455.111111 C0,439.401678 12.7350116,426.666666 28.4444445,426.666666 L85.32992,426.666666 Z M597.333335,426.666666 C613.042765,426.666666 625.777777,439.401678 625.777777,455.111111 L625.777777,557.511112 C625.777777,573.220541 613.042765,585.955553 597.333335,585.955553 L244.61824,585.955553 L244.61824,426.666666 L597.333335,426.666666 Z" fill="#FFAA00"/><path d="M381.15328,108.088889 L381.15328,267.377778 L28.4444445,267.377778 C12.7350116,267.377778 0,254.642766 0,238.933334 L0,136.533334 C0,120.823901 12.7350116,108.088889 28.4444445,108.088889 L381.15328,108.088889 Z M597.333335,108.088889 C613.042765,108.088889 625.777777,120.823901 625.777777,136.533334 L625.777777,238.933334 C625.777777,254.642766 613.042765,267.377778 597.333335,267.377778 L540.4416,267.377778 L540.4416,108.088889 L597.333335,108.088889 Z" fill="#F24D1E"/></g></g></g></svg>';
const FANBOOK_INVITE_LINK = 'https://fanbook.mobi/rjCNRFUN';

const config: AppConfig = defineAppConfig({
  version: undefined, // 在 ~/modules/changelog.ts 中注入
  changelog: [], // 在 ~/modules/changelog.ts 中注入
  featureEntries: {
    '互动': [{
      label: '消息互动',
      icon: markRaw(IconMessage), // 取消响应式追踪
      link: '/feature/message',
    }],
    '管理': [{
      label: '清除成员',
      icon: markRaw(IconDelete),
      link: '/feature/clear',
    }, {
      label: '风险检测',
      icon: markRaw(IconExclamationCircle),
      link: '/feature/audit',
    }],
  },
  docus: {
    title: 'Fanbook 机器人工具',
    description: '让普通人也能控制机器人',
    socials: {
      github: 'DevOpen-Club/bot-tools',
      fanbook: {
        label: 'Fanbook',
        icon: FANBOOK_ICON,
        href: FANBOOK_INVITE_LINK,
      },
    },
    github: {
      root: 'docs',
      edit: true,
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    },
    footer: {
      iconLinks: [{
        label: 'NuxtJS',
        href: 'https://nuxtjs.org',
        icon: 'IconNuxt'
      }, {
        label: 'Vue Telescope',
        href: 'https://vuetelescope.com',
        icon: 'IconVueTelescope'
      }],
    },
  },
});

export default config;
