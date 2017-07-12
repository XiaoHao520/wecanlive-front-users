<template>
  <div id="app-passport-signup">
    <header-common title="會員註冊"></header-common>
    <section class="section-signup">

      <div class="row-signup row-signup-select">
        <div class="mid-text">+886</div>
        <div class="right-block">
          臺灣
          <div class="icon"></div>
        </div>
      </div>

      <div class="row-signup row-signup-mobile">
        <input type="tel"
               class="input-mobile"
               placeholder="請輸入手機號碼"
               v-model="mobile">
        <a class="btn-send"
           v-if="resend_wait_seconds <= 0"
           @click="sendCode">傳送驗證碼</a>
        <div class="btn-send btn-send-disable" v-else
        >重新發送({{resend_wait_seconds}})</div>
      </div>

      <div class="row-signup row-signup-normal">
        <input type="password"
               placeholder="請輸入密碼"
               class="input-normal"
               v-model="password"
               @keyup="validate">
      </div>

      <div class="row-tips">
        密碼由 6-20 個字元，不含空格、「”」及「’」組成
      </div>

      <transition name="fade" appear>
        <div class="warn-tips" v-if="password_warn">{{password_warn}}</div>
      </transition>

      <div class="row-signup row-signup-normal">
        <input type="password"
               placeholder="請再次輸入密碼"
               class="input-normal"
               v-model="password_confirm"
               @keyup="confirm">
      </div>

      <transition name="fade" appear>
        <div class="warn-tips"
             v-if="password_confirm_warn">{{password_confirm_warn}}
        </div>
      </transition>

      <div class="row-signup row-signup-normal">
        <input type="text"
               placeholder="請輸入手機簡訊驗證碼"
               class="input-normal"
               v-model="code">
      </div>
      <div class="row-tips">本人已詳閱並同意 wecan 會員約定事項暨隱私權保護政策。</div>

      <transition name="fade" appear>
        <div class="warn-tips" v-if="code_warn">{{code_warn}}</div>
      </transition>
      <a class="btn-submit"
         @click="submit">確認</a>

    </section>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        mobile: '',
        password: '',
        password_confirm: '',
        code: '',
        password_warn: '',
        password_confirm_warn: '',
        code_warn: '',
        code_from_server: '',
        resend_wait_seconds: 0,
      };
    },
    methods: {
      reload() {
      },
      validate() {
        const vm = this;
        const reg = /(?!.*\s|.*"|.*')^.*$/;
        if ((vm.password.length && vm.password.length < 6) ||
          vm.password.length > 20) {
          vm.password_warn = '密碼长度不正确！';
        } else if (!reg.test(vm.password)) {
          vm.password_warn = '密碼包含空格、「”」或「’」！';
        } else {
          vm.password_warn = '';
        }
      },
      confirm() {
        const vm = this;
        if (vm.password !== vm.password_confirm) {
          vm.password_confirm_warn = '两次输入密码不匹配！';
          vm.disabled = true;
        } else {
          vm.password_confirm_warn = '';
          vm.disabled = false;
        }
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
          vm.code_from_server = resp.data.msg;
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
        const reg = /(?!.*\s|.*"|.*')^.*$/;
        // TODO 换成港澳台手机格式验证
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.mobile))) {
          vm.notify('手机号码格式不正确!');
          return;
        }
        if ((vm.password.length && vm.password.length < 6) ||
          vm.password.length > 20) {
          vm.password_warn = '密碼长度不正确！';
          vm.notify('密碼长度不正确！');
          return;
        }
        if (!reg.test(vm.password)) {
          vm.password_warn = '密碼包含空格、「”」或「’」！';
          vm.notify('密碼包含空格、「”」或「’」！');
          return;
        }
        if (vm.password !== vm.password_confirm) {
          vm.password_confirm_warn = '两次输入密码不匹配！';
          vm.notify('两次输入密码不匹配！');
          return;
        }
        if (vm.code !== vm.code_from_server) {
          vm.code_warn = '驗證碼不正確！';
          return;
        }
        vm.api('Member').save({
          action: 'register',
        }, {
          mobile: vm.mobile,
          password: vm.password,
          mobile_vcode: vm.code,
        }).then(() => {
          vm.authenticate().then(() => {
            vm.$router.push({ name: 'passport_signup_complete' });
          });
        }, () => {}).catch(() => {
          vm.notify('註冊失敗！');
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #app-passport-signup {
    background: #E4E4EB;
    input {
      outline: none;
      border: none;
      background: none;
    }
    .section-signup {
      padding-top: 30*@px;
      .app-scroll();
      .row-signup {
        position: relative;
        height: 90*@px;
        background: #FFFFFF;
        margin: 0 auto;
        width: 690*@px;
        .border-radius(90*@px);
        overflow: hidden;
        &.row-signup-select {
          margin-bottom: 30*@px;
          .mid-text {
            font-size: 32*@px;
            color: #303040;
            height: 90*@px;
            line-height: 90*@px;
            text-align: center;
          }
          .right-block {
            position: absolute;
            right: 45*@px;
            top: 0;
            height: 90*@px;
            width: 200*@px;
            line-height: 90*@px;
            font-size: 32*@px;
            color: #303040;
            text-align: right;
            .icon {
              float: right;
              width: 28*@px;
              height: 36*@px;
              margin-top: 27*@px;
              background: url("../../assets/image/A/icon_next@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
        }
        &.row-signup-mobile {
          margin-bottom: 30*@px;
          .input-mobile {
            float: left;
            font-size: 32*@px;
            color: #303040;
            height: 90*@px;
            line-height: 90*@px;
            width: 460*@px;
            padding: 0 48*@px;
            .border-box();
            .placeholder-color(#B4B4B4);
          }
          .btn-send {
            float: right;
            width: 230*@px;
            height: 90*@px;
            font-size: 32*@px;
            line-height: 90*@px;
            color: #FFFFFF;
            text-align: center;
            background: @bg-header;
            &.btn-send-disable {
              background: #c1c1c1;
            }
          }
        }
        &.row-signup-normal {
          margin-top: 30*@px;
          .input-normal {
            width: 100%;
            font-size: 32*@px;
            color: #303040;
            height: 90*@px;
            line-height: 90*@px;
            padding: 0 48*@px;
            .border-box();
            .placeholder-color(#B4B4B4);
          }
        }
      }
      .row-tips {
        padding: 0 80*@px;
        font-size: 26*@px;
        margin-top: 5*@px;
        margin-bottom: 5*@px;
        color: #959595;
        .border-box();
      }
      .warn-tips {
        font-size: 26*@px;
        color: #fe0202;
        padding: 0 80*@px;
        margin-top: 10*@px;
        .border-box();
      }
      .btn-submit {
        display: block;
        margin: 58*@px auto 0;
        height: 90*@px;
        line-height: 90*@px;
        width: 690*@px;
        .border-radius(90*@px);
        overflow: hidden;
        color: #FFFFFF;
        text-align: center;
        font-weight: normal;
        font-size: 40*@px;
        background: #3abbf0;
        &.disabled {
          background: #c1c1c1;
        }
      }
    }
  }
</style>
