<template>
  <header class="component-header-common"
          :class="{'not-status-bar': !overlapStatusBar}">
    <slot name="left">
      <div class="btn-back-warpper" @click="back">
        <a class="btn btn-back"></a>
      </div>
    </slot>
    <slot name="middle">
      <h1 class="title">{{title || '頁面標題'}}</h1>
    </slot>
    <slot name="right"></slot>
  </header>
</template>

<script lang="babel">
  export default {
    methods: {
      back() {
        const vm = this;
        if (vm.backLink) {
          vm.goBack(vm.backLink);
        } else {
          vm.goBack();
        }
      },
    },
    props: {
      backLink: {
        type: Object,
      },
      title: {
        type: String,
      },
      order_header: {},
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-header-common {
    background: @bg-header;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 36*@px;
    height: @height-header;
    &.not-status-bar {
      padding-top: 0;
    }
    .title {
      display: block;
      height: @height-header;
      font-size: 38*@px;
      color: #fff;
      line-height: @height-header;
      text-align: center;
      margin: 0;
      font-weight: normal;
    }
    .btn-back-warpper {
      width: @height-header;
      position: absolute;
      left: 0;
      bottom: 0;
      height: @height-header;
      .btn-back {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 44*@px;
        height: 44*@px;
        background: url("../../assets/image/A/nav_back@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
    .deal-detail {
      display: block;
      width: 165*@px;
      height: 50*@px;
      line-height: 50*@px;
      text-align: center;
      font-size: 24*@px;
      color: #fff;
      background: #8967F5;
      border-radius: 25*@px;
      position: absolute;
      right: 25*@px;
      bottom: 18*@px;
    }
    .scan-btn {
      position: absolute;
      width: @height-header;
      right: 0;
      bottom: 0;
      height: @height-header;
      .scan-icon {
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/F/f_icon_scan@3x.png");
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }
    .submit-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      height: @height-header;
      font-size: 32*@px;
      a {
        line-height: @height-header;
        display: block;
        color: #fff;
        padding-right: 30*@px;
      }
    }
    .family-action {
      position: absolute;
      right: 0;
      bottom: 0;
      height: @height-header;
      width: 150*@px;
      .btn {
        position: absolute;
        top: 50%;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 44*@px;
        height: 44*@px;
        .unread {
          background: #FE0202;
          width: 12*@px;
          height: 12*@px;
          position: absolute;
          border-radius: 50%;
          top: 0;
          right: -6*@px;
        }
        &.mission-btn {
          background: url("../../assets/image/F/f5_1_icon_task@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          right: 30*@px;
        }
        &.notice-btn {
          background: url("../../assets/image/F/f5_1_icon_notice@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          right: 100*@px;
        }
      }
    }
  }
</style>
