<template>
  <div class="signin-mobile">
    <header-common></header-common>

    <div class="signin-mobile-block">
      <div class="row mobile-row">
        <div class="row-label">
          <div class="icon mobile-icon"></div>
          <div class="mobile-location">+886</div>
        </div>
        <input type="text" class="row-input" placeholder="請輸入手機號">
      </div>

      <div class="row pass-row">
        <div class="row-label">
          <div class="icon pass-icon"></div>
        </div>
        <input type="text" class="row-input" placeholder="請輸入手機號">
      </div>


      <div class="submit-row">
        <a href="javascript:;">登錄</a>
      </div>


    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .signin-mobile-block {
    position: absolute;
    top: 162*@px;
    left: 0; right: 0; bottom: 0;
    background: #E5E5EC;
    padding: 30*@px 30*@px 0 30*@px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .row {

    }

  }
</style>
