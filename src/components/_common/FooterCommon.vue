<template>
  <header class="component-header-common ">
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
          vm.$router.replace(vm.backLink);
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
  @import (once) '../../vue2-front/assets/css/less-template/template';
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
  }
</style>
