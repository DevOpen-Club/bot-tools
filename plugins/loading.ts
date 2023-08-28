import nprogress from 'nprogress';

export default defineNuxtPlugin((app) => {
  nprogress.configure({ showSpinner: false, trickleSpeed: 100, speed: 1000 });
  app.hook('page:start', () => {
    nprogress.start();
  });
  app.hook('page:finish', () => {
    nprogress.done();
  });
});
