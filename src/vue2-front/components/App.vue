<template>

  <div id="app">
    <router-view></router-view>
    <!--<notifier-registry ref="notifier"/>-->
    <!--<geo-picker-registry ref="geopicker"/>-->
    <div class="block-loading" v-if="loading.counter > 0">
      <loading :loading="loading.counter > 0"
               :color="loading.color"></loading>
    </div>
  </div>

</template>

<script type="text/babel">
  // Mixins

  //  import Deferred from 'es6-deferred';
  //  import * as controls from '../components/_control';
  //  import * as modules from '../components/_modules';
  //  import * as api from '../resource/api';
  import config from '../../config/config';

  // Root component
  export default {
//    route: { canReuse: false },
    name: 'vue2-front',
    data() {
      return {
        // 页面是否已经初始化（加载完用户信息）
        initialized: false,
        current_user: config.current_user || null,
        context: {},
        loading: {
          counter: 0,
          color: '#545F71',
          size: 64,
        },
      };
    },
    mounted() {
      // 将根 VM 共享到全局变量
      const vm = window.app = this;
      // [config] on_root_mounted
      const promiseRootMounted = vm.config.on_root_mounted ?
        vm.config.on_root_mounted.apply(vm) : Promise.resolve();
      promiseRootMounted.then(() => {
      });
    },
    methods: {},
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import (once) "../assets/css/less-template/template";
  @import (once) "../../assets/css/defines";

  .block-loading {
    z-index: 1000;
    .fill-fixed();
    .v-spinner {
      .block-center-fixed();
    }
  }

  .block-notify {
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.8rem;
    line-height: 0.9rem;
    z-index: 99999;
    .row {
      margin: 0.2rem 0;
      padding: 0.05rem 0;
      &:not(:first-child) {
        display: none;
      }
      .alert {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        max-width: 12rem;
        //.nowrap();
        .rounded-corners(0.8rem);
      }
    }
  }

  .block-datepicker {
    .cov-vue-date {

    }
    .datepickbox {
      .block-invisible();
    }
  }



</style>

