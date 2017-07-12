<template>
  <div class="page-personal-change-mobile">
    <header-common title="綁定手機號"></header-common>

    <div class="personal-change-mobile">
      <div class="now-mobile">
        <p class="mobile">您現在綁定的手機爲：{{ now_mobile }}</p>
        <p>輸入新的手機號+驗證碼，即可更換手機號碼</p>
      </div>

      <div class="row mobile-row">
        <div class="mobile-local">臺灣</div>
        <input type="text" v-model="mobile" class="mobile-input" placeholder="+886| 手機號碼">
      </div>

      <div class="row code-row">
        <input type="text" v-model="code" class="code-input" placeholder="輸入驗證碼">
        <a href="javascript:;"
           v-if="resend_wait_seconds <= 0"
           @click="sendCode()" class="code-btn">傳送驗證碼</a>
        <a href="javascript:;"
           v-else
           class="code-btn">重新發送({{ resend_wait_seconds }})</a>
      </div>

      <div class="submit-btn">
        <a href="javascript:;" @click="submit()">完成</a>
      </div>

    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        now_mobile: '',
        mobile: '',
        code: '',
        resend_wait_seconds: 0,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.authenticate(true).then(() => {
          vm.now_mobile = vm.me.username;
        });
      },
      sendCode() {
        const vm = this;
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.mobile))) {
          vm.notify('手机号码格式不正确');
          return;
        }

        vm.api('User').save({
          action: 'send_vcode',
        }, {
          mobile: vm.mobile,
        }).then((resp) => {
          // 启动再次发送倒计时
          (() => {
            let remain = 60;
            vm.resend_wait_seconds = 60;
            const timer = setInterval(() => {
              remain -= 1;
              if (remain <= 0) clearInterval(timer);
              vm.resend_wait_seconds = remain;
            }, 1000);
          })();
        });
      },
      submit() {
        const vm = this;
        vm.api('User').save({
          action: 'bind_new_mobile',
        }, {
          mobile: vm.mobile,
          mobile_vcode: vm.code,
        }).then(() => {
          vm.$router.push({ name: 'passport_signin' });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-personal-change-mobile {
    background: #E5E5EC;
    .personal-change-mobile {
      padding: 40*@px 30*@px 0 30*@px;
      .now-mobile {
        margin-bottom: 40*@px;
        p {
          margin: 0;
          font-size: 30*@px;
          color: #8D8D8D;
          line-height: 30*@px;
          &.mobile {
            margin-bottom: 10*@px;
          }
        }
      }
      .row {
        background: #fff;
        height: 92*@px;
        overflow: hidden;
        border-radius: 45*@px;
        box-sizing: border-box;
        position: relative;
        &.mobile-row {
          padding-left: 160*@px;
          margin-bottom: 30*@px;
          .mobile-local {
            position: absolute;
            left: 50*@px;
            font-size: 30*@px;
            top: 0;
            height: 92*@px;
            width: 97*@px;
            line-height: 98*@px;
            color: #959595;
            background: url("../../assets/image/A/icon_more@3x.png") 100% 50% no-repeat;
            background-size: 24*@px;
          }
          .mobile-input {
            height: 100%;
            font-size: 30*@px;
            width: 100%;
            .placeholder-color(#959595);
          }
        }
        &.code-row {
          padding: 0 232*@px 0 50*@px;
          margin-bottom: 56*@px;
          .code-input {
            height: 100%;
            font-size: 30*@px;
            width: 100%;
            .placeholder-color(#959595);
          }
          .code-btn {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 232*@px;
            background: @bg-header;
            color: #fff;
            text-align: center;
            line-height: 98*@px;
            font-size: 30*@px;
          }
        }
      }
      .submit-btn {
        width: 100%;
        height: 90*@px;
        a {
          font-size: 32*@px;
          color: #fff;
          text-align: center;
          line-height: 90*@px;
          display: block;
          border-radius: 45*@px;
          background: #3ABBF0;
        }
      }
    }
  }
</style>
