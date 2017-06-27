<template>
  <div class="page-forgot-confirm">
    <header-common title="手機綁定"
                   :backLink="{name: 'passport_forgot'}"></header-common>

    <div class="forgot-confirm-block">
      <div class="confirm-title">請輸入您手機收到的簡訊驗證碼</div>

      <div class="row">
        <input type="text" v-model="vcode" placeholder="請輸入手機簡訊驗證碼">
      </div>

      <transition name="fade" appear>
      <div class="row-mistake" v-if="code_error">{{code_error}}</div>
      </transition>

      <div class="row">
        <input type="password" v-model="newpass" placeholder="請輸入新密碼">
      </div>

      <transition name="fade" appear>
        <div class="row-mistake" v-if="pass_error">{{pass_error}}</div>
      </transition>

      <div class="row">
        <input type="password" v-model="confirmpass" placeholder="請再次輸入新密碼">
      </div>
      <div class="row-mistake last"></div>

      <div class="submit-btn">
        <a href="javascript:;" @click="submit()" class="btn">下一步</a>
      </div>
    </div>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        mobile: '',
        vcode: '',
        newpass: '',
        confirmpass: '',
        code_error: '',
        pass_error: '',
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.mobile = vm.$route.params.mobile;
      },
      submit() {
        const vm = this;
        vm.pass_error = '';
        vm.code_error = '';
        if (vm.newpass !== vm.confirmpass) {
          vm.pass_error = '兩次密碼不匹配日';
          return;
        }
        vm.api('User').save({
          action: 'forgot',
        }, {
          mobile: vm.mobile,
          mobile_vcode: vm.vcode,
          password: vm.newpass,
        }).then(() => {
          vm.notify('密码修改成功，已经为您登录');
          vm.authenticate(true);
          vm.$router.push({ name: 'main_index' });
        }).catch((e) => {
          if (e.data.error_code === 50001) {
            vm.code_error = '驗證碼不正確';
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-forgot-confirm {
    background: #E3E0EA;
    .forgot-confirm-block {
      padding: 60*@px 30*@px 0 30*@px;
      .confirm-title {
        font-size: 33*@px;
        text-align: center;
        margin-bottom: 52*@px;
      }
      .row {
        height: 90*@px;
        background: #fff;
        border-radius: 40*@px;
        padding: 0 52*@px;
        box-sizing: border-box;
        margin-bottom: 22*@px;
        input {
          height: 90*@px;
          font-size: 32*@px;
          width: 100%;
        }
      }
      .row-mistake {
        margin-top: 15*@px;
        margin-bottom: 30*@px;
        height: 22*@px;
        font-size: 22*@px;
        color: #FE0202;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 48*@px;
        &.last {
          margin-bottom: 60*@px;
        }
      }
      .submit-btn {
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
    }
  }

</style>
