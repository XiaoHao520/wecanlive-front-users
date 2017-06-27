<template>
  <div class="page-forgot">
    <header-common title="忘記密碼"
                   :backLink="{ name: 'passport_signin_mobile' }"></header-common>

    <div class="forgot-block">
      <div class="forgot-title">我們將傳送重設密碼的驗證碼</div>
      <div class="mobile-row">
        <div class="mobile-location">
          <div class="location-name">臺灣</div>
          <div class="select-icon"></div>
        </div>

        <input v-model="mobile"
               type="text"
               class="mobile-num"
               placeholder="+886 | 手機號碼">
      </div>

      <div class="mistake-notify">{{error}}</div>

      <div class="next-btn">
        <a href="javascript:;" @click="send_vcode()" class="btn">下一步</a>
      </div>

      <div class="next-warn">
        若您使用ican艾肯平臺綁定手機號碼登入，本系統將同步更新您ican艾肯平臺綁定手機號登入密碼，使用時請特別注意.
      </div>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">

  export default {
    data() {
      return {
        mobile: '',
        error: '',
      };
    },
    methods: {
      reload() {
      },
      send_vcode() {
        const vm = this;
        vm.error = '';
        vm.api('User').save({
          action: 'send_vcode',
        }, {
          mobile: vm.mobile,
        }).then(() => {
          vm.$router.push({ name: 'passport_forgot_confirm', params: { mobile: vm.mobile } });
        }).catch((e) => {
          vm.error = e.data.msg;
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-forgot {
    background: #E5E2EC;
    .forgot-block {
      padding: 60*@px 30*@px 0 30*@px;
      .forgot-title {
        font-size: 33*@px;
        text-align: center;
      }
      .mobile-row {
        margin-top: 30*@px;
        height: 92*@px;
        border-radius: 40*@px;
        background: #fff;
        padding-left: 160*@px;
        position: relative;
        font-size: 32*@px;
        overflow: hidden;
        .mobile-location {
          position: absolute;
          left: 50*@px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          transform: translateY(-50%);
          color: #959595;
          .clearfix();
          .location-name {
            float: left;
            font-size: 32*@px;
            line-height: 44*@px;
            height: 44*@px;
          }
          .select-icon {
            float: left;
            width: 44*@px;
            height: 44*@px;
            background: url("../../assets/image/A/icon_more@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
        .mobile-num {
          outline: none;
          height: 92*@px;
          padding: 0;
          border: 0;
          width: 100%;
          font-size: 32*@px;
        }
      }
      .mistake-notify {
        margin-top: 15*@px;
        font-size: 22*@px;
        color: #FE0202;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 48*@px;
        height: 22*@px;
      }
      .next-btn {
        margin-top: 60*@px;
        .btn {
          display: block;
          height: 90*@px;
          color: #fff;
          background: #3ABBF0;
          font-size: 30*@px;
          text-align: center;
          line-height: 90*@px;
          border-radius: 40*@px;
        }
      }
      .next-warn {
        margin-top: 15*@px;
        padding: 0 57*@px;
        box-sizing: border-box;
        color: #959595;
        font-size: 26*@px;
      }
    }
  }
</style>
