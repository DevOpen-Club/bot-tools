import { AppConfig } from 'nuxt/schema';
import { markRaw } from 'vue';
import { IconDelete, IconExclamationCircleFill, IconMessage } from '@arco-design/web-vue/es/icon';

const config: AppConfig = defineAppConfig({
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
      icon: markRaw(IconExclamationCircleFill),
      link: '/feature/audit',
    }],
  },
});

export default config;
