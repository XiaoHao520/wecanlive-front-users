<template>
  <!--<router-view></router-view>-->
  <transition :name="transitionName">
    <router-view class="child-view" v-if="init"></router-view>
  </transition>

</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left',
        init: false,
      };
    },
    beforeRouteUpdate(to, from, next) {
      const isBack = window.isBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      window.isBack = false;
      next();
    },
    beforeMount() {
      const vm = this;
      vm.authenticate().then(() => {
        console.log('success');
        vm.init = true;
      }, (e) => {
        vm.init = true;
        vm.$router.replace({ name: 'passport_signin' });
      });
    },
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .child-view {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(20%, 0, 0);
    transform: translate3d(20%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }
</style>

