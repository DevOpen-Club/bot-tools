/** 需要添加机器人才能进入的页面。 */

import { Modal } from '@arco-design/web-vue';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!hasAnyBot()) {
    Modal.warning({
      title: '请先添加机器人',
      content: '此功能需要使用机器人。',
    });
    if (to.fullPath === from.fullPath) return '/bot'; // 直接进入页面，abort 会报错
    return abortNavigation();
  }
});
