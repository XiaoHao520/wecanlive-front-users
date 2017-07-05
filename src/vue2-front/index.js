/** Absolute Imports */
import 'font-awesome/less/font-awesome.less';

import VueRouter from 'vue-router';
// import Deferred from 'es6-deferred';

/** Relative Imports */
import './assets/css/style.less';

// TODO: 需要改写成移动端版本
// import ImageViewer from './plugins/image-viewer';
import mixins from './mixins';

import AwesomeSwiper from 'vue-awesome-swiper';

import VueTouch from 'vue-touch';

import notifier from './plugins/notifier';

// 应用内配置文件
import config from '../config/config';

// Components routes and entrance
import routes from '../components/routes';

export default {
  install(Vue, options = {}) {
    // -------------------------
    // Vue Mixin
    // -------------------------

    // [config] action_init 钩子
    if (config.action_init) {
      config.action_init(Vue);
    }

    Vue.mixin(mixins);

    // [config] action_init_mixins 钩子
    if (config.action_init_mixins) {
      config.action_init_mixins(Vue, mixins);
    }

    // -------------------------
    // Plugins
    // -------------------------
    Vue.use(notifier);

    Vue.use(AwesomeSwiper);

    Vue.use(VueTouch, { name: 'v-touch' });

    // -------------------------
    // Vue resource config
    // -------------------------
    Vue.http.options.root = config.api_root || '/api';
    if (config.cross_origin !== false) {
      Vue.http.options.credentials = true;
      Vue.http.options.xhr = { withCredentials: true };
    }

    // -------------------------
    // Vue notify http error
    // -------------------------
    Vue.http.interceptors.push((req, next) => {
      const request = req;
      request.headers = request.headers || {};
      // 对响应结果的业务处理
      next(response => {
        if (window.app && window.app.notify &&
          ((typeof config.report_http_error === 'undefined') || !!config.report_http_error)) {
          if (response.data && response.data.msg) {
            // console.log(response);
            if (response.data.ok) {
              window.app.notify(response.data.msg, '接口调用成功');
            } else {
              window.app.notify(response.data.msg, '接口调用失败');
            }
          } else if (response.status >= 400) {
            window.app.notify(response.body, `接口调用失败：${response.status}`);
          }
        }
        return response;
      });
    });

    // ----------------------------
    // Vue http api loading counter
    // ----------------------------
    (() => {
      let counter = 0;
      // Loading 计数器处理
      Vue.http.interceptors.push((request, next) => {
        counter += 1;
        if (window.app && window.app.loading) {
          window.app.loading.counter = counter;
        }
        next(() => {
          counter -= 1;
          if (window.app && window.app.loading) {
            window.app.loading.counter = counter;
          }
        });
      });
    })();

    // [config] action_init_http 钩子
    if (config.action_init_http) {
      config.action_init_http(Vue);
    }

    // -------------------------
    // Vue router config
    // -------------------------

    Vue.use(VueRouter);

    const router = new VueRouter({ routes });

    // router.beforeEach((to, from, next) => {
    //   // noReuse 模式，启用组件内参数跳转自动 reload
    //   if (to.name === from.name && window.app) {
    //     const vm = window.app.$router.app;
    //     window.afterRoutePromise = new Deferred();
    //     console.log('dododo');
    //     window.afterRoutePromise.then(() => {
    //       delete window.afterRoutePromise;
    //       console.log('then');
    //       console.log('before-reload', vm);
    //       if (vm.reload) {
    //         console.log('reload', vm);
    //         vm.$nextTick(() => {
    //           vm.reload();
    //         });
    //       }
    //     });
    //   }
    //   next();
    // });

    router.afterEach(route => {
      // 将路由信息分级放置到 body 的 class 里面
      let name = 'app';
      let classNames = 'app';
      if (route.name) {
        route.name.split('_').forEach(str => {
          if (str) {
            name += `-${str}`;
            classNames += ` ${name}`;
          }
        });
      }
      // // 强制启动路由跳转后激活 reload
      // if (window.afterRoutePromise) {
      //   window.afterRoutePromise.resolve();
      // }
      // console.log(route);
      document.body.className = classNames;
      console.log(`>>> ${route.name}`);
    });

    // [config] action_init_router 钩子
    if (config.action_init_router) {
      config.action_init_router(Vue, router);
    }

    const AppConstructor = Vue.extend(require('./components/App.vue'));  // eslint-disable-line
    window.app = new AppConstructor({ router, el: '#app' });
  },
};

