<template>
  <div>
    <footer class="component-footer-common">
      <div class="footer-warpper">
        <router-link class="footer-btn-home" to="/"></router-link>
        <router-link class="footer-btn-member" :to="{name: 'main_member_detail',params: {id: me.id}}"></router-link>
        <div class="footer-btn-popup" @click="toggleBtn"></div>
        <a class="footer-btn-search" @click="notify('開發中')"></a>
        <router-link :to="{name: 'main_message'}" class="footer-btn-message" ></router-link>
        <!--<router-link class="footer-btn-search" to="/search"></router-link>-->
        <!--<router-link class="footer-btn-message" to="/message"></router-link>-->
      </div>
    </footer>

    <transition name="fade">
      <div class="mask-block" @click="toggleBtn" v-show="btnBar"></div>
    </transition>

    <transition name="fade">
      <div class="btn-live" @click="startLive" v-show="btnBar"></div>
    </transition>
    <transition name="quick-slide">
      <div class="btn-image" @click="writeEvent" v-show="btnBar"></div>
    </transition>
    <!--<transition name="quick-slide-down">-->
    <!--<div class="btn-video" v-show="btnBar"></div>-->
    <!--</transition>-->
    <transition name="quick-slide-down-right">
      <div class="btn-camera" @click="openCamera()" v-show="btnBar"></div>
    </transition>

  </div>

</template>

<script lang="babel">
  export default {
    data() {
      return {
        act: '',
        btnBar: false,
      };
    },
    methods: {
      reload() {
      },
      startLive() {
        const vm = this;
        vm.$router.push({ name: 'main_live_start' });
      },
      toggleBtn() {
        const vm = this;
        vm.btnBar = !vm.btnBar;
      },
      writeEvent() {
        const vm = this;
        vm.$router.push({ name: 'main_active_event' });
      },
      openCamera() {
        const vm = this;
        vm.pickImage().then(() => {
        });
      },
    },
    props: {},
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-footer-common {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: @height-footer;
    background: #FFFFFF;
    .footer-warpper {
      width: 100%;
      height: 100%;
      position: relative;
      .border-box();
      padding-top: 19*@px;
      .footer-btn-home {
        float: left;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_home_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        margin-left: 45*@px;
        &.footer-avtive, &.router-link-active {
          background-image: url("../../assets/image/B1/icon_home_pred@3x.png");
        }
      }
      .footer-btn-member {
        float: left;
        margin-left: 90*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_person_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive, &.router-link-active {
          background-image: url("../../assets/image/B1/icon_person-_pred@3x.png");
        }
      }
      .footer-btn-message {
        float: right;
        margin-right: 90*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_message_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive, &.router-link-active {
          background-image: url("../../assets/image/B1/icon_message_pred@3x.png");
        }
      }
      .footer-btn-search {
        float: right;
        margin-right: 45*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_search_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive, &.router-link-active {
          background-image: url("../../assets/image/B1/icon_search_pred@3x.png");
        }
      }
      .footer-btn-popup {
        position: absolute;
        bottom: 22*@px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 120*@px;
        height: 120*@px;
        background: url("../../assets/image/B1/icon_live_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
  }

  .btn-live {
    position: fixed;
    z-index: 101;
    bottom: 22*@px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 120*@px;
    height: 120*@px;
    background: url("../../assets/image/B1/icon_live_pred@3x.png") 50% 50% no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .btn-image {
    position: fixed;
    z-index: 100;
    left: 224*@px;
    bottom: 150*@px;
    width: 80*@px;
    height: 80*@px;
    background: url("../../assets/image/B1/icon_photo@3x.png") 50% 50% no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .btn-video {
    position: fixed;
    z-index: 100;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 195*@px;
    width: 80*@px;
    height: 80*@px;
    // TODO 圖片更換
    background: url("../../assets/image/B1/icon_photo@3x.png") 50% 50% no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .btn-camera {
    position: fixed;
    z-index: 100;
    right: 224*@px;
    bottom: 150*@px;
    width: 80*@px;
    height: 80*@px;
    background: url("../../assets/image/B1/icon_takephoto@3x.png") 50% 50% no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  // 由下往上小幅度渐变
  .quick-slide-enter-active,
  .quick-slide-down-enter-active,
  .quick-slide-down-right-enter-active {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
  }

  .quick-slide-leave-active,
  .quick-slide-down-leave-active,
  .quick-slide-down-right-leave-active {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
  }

  .quick-slide-enter,
  .quick-slide-leave-active {
    -webkit-transform: translate3d(100%, 100%, 0);
    -moz-transform: translate3d(100%, 100%, 0);
    -ms-transform: translate3d(100%, 100%, 0);
    -o-transform: translate3d(100%, 100%, 0);
    transform: translate3d(100%, 100%, 0);
    opacity: 0;
  }

  .quick-slide-down-enter,
  .quick-slide-down-leave-active {
    -webkit-transform: translate3d(-50%, 200%, 0);
    -moz-transform: translate3d(-50%, 200%, 0);
    -ms-transform: translate3d(-50%, 200%, 0);
    -o-transform: translate3d(-50%, 200%, 0);
    transform: translate3d(-50%, 200%, 0);
    opacity: 0;
  }

  .quick-slide-down-right-enter,
  .quick-slide-down-right-leave-active {
    -webkit-transform: translate3d(-100%, 100%, 0);
    -moz-transform: translate3d(-100%, 100%, 0);
    -ms-transform: translate3d(-100%, 100%, 0);
    -o-transform: translate3d(-100%, 100%, 0);
    transform: translate3d(-100%, 100%, 0);
    opacity: 0;
  }
</style>
