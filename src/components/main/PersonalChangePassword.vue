<template>
  <div class="page-change-password">
    <header-common title="修改密碼"></header-common>
    <div class="change-password">
      <div class="row">
        <input class="row-input" placeholder="請輸入原密碼"
               v-model="pass" type="password">
      </div>
      <div class="row">
        <input class="row-input" placeholder="請輸入新密碼"
               v-model="new_pass" type="password">
      </div>
      <div class="row last-row">
        <input class="row-input" placeholder="請再次輸入新密碼"
               v-model="confirm_pass" type="password">
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
        pass: '',
        new_pass: '',
        confirm_pass: '',
      };
    },
    methods: {
      reload() {
      },
      submit() {
        const vm = this;
        if (vm.new_pass.length === 0 || vm.new_pass.length === 0) {
          vm.notify('密码不能为空');
          return;
        }
        if (vm.new_pass !== vm.confirm_pass) {
          vm.notify('兩次密碼輸入不一致');
          return;
        }
        vm.api('User').save({
          action: 'change_password',
        }, {
          password_old: vm.pass,
          password_new: vm.new_pass,
        }).then(() => {
          vm.notify('修改成功');
          vm.authenticate(true);
//          vm.$router.push({ name: 'main_personal_settings' });
          vm.goBack();
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-change-password {
    background: #E4E4EB;
    .change-password {
      padding: 30*@px 27*@px 0 27*@px;
      .row {
        height: 90*@px;
        background: #fff;
        padding: 0 50*@px;
        border-radius: 40*@px;
        margin-bottom: 30*@px;
        .row-input {
          .placeholder-color(#959595);
          font-size: 30*@px;
          height: 100%;
          width: 100%;
        }
        &.last-row {
          margin-bottom: 56*@px;
        }
      }
      .submit-btn {
        a {
          text-align: center;
          font-size: 36*@px;
          background: @color-submit;
          display: block;
          height: 90*@px;
          color: #fff;
          line-height: 90*@px;
          border-radius: 40*@px;
        }
      }
    }
  }


</style>
