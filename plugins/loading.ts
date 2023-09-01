import nprogress from 'nprogress';

let first = true;
/** 开始读进度条。 */
function start() {
  if (first) first = false; // 首屏显示的路由不显示进度条
  else nprogress.start();
}

export default defineNuxtPlugin(() => {
  nprogress.configure({ showSpinner: false, trickleSpeed: 100, speed: 1000 });
  const router = useRouter();
  const { push, replace } = useRouter();
  router.push = (...args) => { // hook to push
    start();
    return push(...args);
  }
  router.replace = (...args) => { // hook to replace
    start();
    return replace(...args);
  }
  router.afterEach(() => nprogress.done()); // hook to finish
});
