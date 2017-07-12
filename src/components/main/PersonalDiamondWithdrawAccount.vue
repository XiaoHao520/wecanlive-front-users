<template>
  <div class="page-personal-diamond-withdraw-account">
    <header-common title="輸入賬號"></header-common>

    <div class="account-input-block">
      <div class="account-icon"></div>

      <div class="account-input">
        <div class="row">
          <div class="label">Paypal 用戶名</div>
          <input placeholder="輸入 paypal 的用戶名" type="text">
        </div>

        <div class="row">
          <div class="label">Paypal 賬號</div>
          <input placeholder="輸入 paypal 的賬號" type="text">
        </div>
      </div>

      <a href="javascript:;" class="submit-btn">確定</a>
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-personal-diamond-withdraw-account {
    background: #E5E5EC;
    .account-input-block {
      padding-top: 100*@px;
      .account-icon {
        height: 60*@px;
        width: 255*@px;
        margin: 0 auto;
      }
      .account-input {
        margin-top: 84*@px;
        background: #fff;
        padding: 0 30*@px;
        .row {
          .clearfix();
          border-bottom: 1px solid @color-border;
          height: 120*@px;
          &:last-child {
            border: 0;
          }
          .label {
            height: 120*@px;
            line-height: 120*@px;
            float: left;
            font-size: 30*@px;
            width: 225*@px;
          }
          input {
            font-size: 30*@px;
            height: 120*@px;
            float: left;
            .placeholder-color(#BCBEC0);
            width: 420*@px;
          }
        }
      }
      .submit-btn {
        position: absolute;
        bottom: 30*@px;
        left: 30*@px;
        right: 30*@px;
        display: block;
        height: 90*@px;
        line-height: 90*@px;
        background: @color-submit;
        color: #fff;
        font-size: 36*@px;
        border-radius: 45*@px;
        text-align: center;
      }
    }
  }
</style>
