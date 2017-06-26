<template>
  <div class="page-signin">
    <div class="wecan-icon"></div>

    <div class="login-block">
      <div class="login-way">
        <a class="login-btn facebook" href="javascript:;"></a>
        <router-link to="/signin/mobile" class="login-btn mobile" href="javascript:;"></router-link>
        <a class="login-btn google" href="javascript:;"></a>
      </div>

      <div class="login-warn">
        <div class="warn-text">登入即代表您同意</div>
        <router-link to="/license"></router-link>
        <div class="warn-text">的服務條款與隱私權政策</div>
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

  .page-signin {
    background: svg-gradient(to bottom, #D500FE, #21AEDA);
    padding-top: 280*@px;
    .wecan-icon {
      width: 400*@px;
      height: 400*@px;
      margin: 0 auto;
      background: url("../../assets/image/A/startpage_logo@3x.png") 50% 50% no-repeat;
      background-size: 100%;
    }
    .login-block {
      position: absolute;
      bottom: 75*@px;
      left: 0;
      right: 0;
      text-align: center;
      .login-way {
        display: inline-block;
        .clearfix();
        .login-btn {
          width: 100*@px;
          height: 100*@px;
          display: block;
          background: 50% 50% no-repeat;
          background-size: 100%;
          float: left;
          margin-right: 40*@px;
          &:last-child {
            margin-right: 0;
          }
          &.facebook {
            background-image: url("../../assets/image/A/startpage_icon_facebook@3x.png");
          }
          &.mobile {
            background-image: url("../../assets/image/A/startpage_icon_phone@3x.png");
          }
          &.google {
            background-image: url("../../assets/image/A/startpage_icon_google@3x.png");
          }
        }
      }
      .login-warn {
        margin-top: 20*@px;
        font-size: 24*@px;
        color: #fff;
        display: inline-block;
        .clearfix();
        .warn-text {
          float: left;
          line-height: 30*@px;
          height: 30*@px;
        }
        a {
          float: left;
          height: 24*@px;
          display: inline-block;
          width: 120*@px;
          background: url("../../assets/image/A/font_wencan@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          margin: 0 5*@px;
        }
      }
    }

  }

</style>
