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

  .block-choices {
    .fill-fixed();
    background: rgba(0, 0, 0, 0.2);
    font-size: 0.8rem;
    z-index: 10;
    header {
      display: none;
    }
    ul {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1.2rem 0;
      @item-height: 1.8rem;
      max-height: @item-height * 6;
      overflow-y: auto;
      background: white;
      li a {
        display: block;
        line-height: @item-height;
        padding: 0 1rem;
        .nowrap();
        &.active {
          color: @color-main;
        }
      }
    }
  }

  .block-confirm {
    .fill-fixed();
    background: rgba(0, 0, 0, 0.2);
    font-size: 0.8rem;
    z-index: 99999;
    .modal-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 15rem;
      font-size: 40*@px;
      /*<!--.translate('-50%', '-50%');-->*/
      background: white;
      color: @color-text-fade;
      .rounded-corners(0.4rem);

      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);

      .modal-header {
        display: none;
      }
      .modal-body {
        padding: 90*@px;
        line-height: 48*@px;
        /*text-align: center;*/
        white-space: pre-wrap;
      }
      .modal-footer {
        border-top: 1px solid @color-bg;
        height: 120*@px;
        line-height: 120*@px;
        width: 100%;
        .clearfix();
        .btn {
          display: block;
          float: left;
          width: 50%;
          text-align: center;
          .border-box();
        }
        .btn-confirm {
          color: #4580ED;
          border-right: 1px solid @color-bg;
        }
      }
    }
  }

</style>

