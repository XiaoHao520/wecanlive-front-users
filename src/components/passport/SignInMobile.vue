<template>
  <div class="signin-mobile">
    <header-common title="手機號登錄"
                   :backLink="{name: 'passport_signin'}"></header-common>

    <div class="signin-mobile-block">
      <div class="row mobile-row">
        <div class="row-label">
          <div class="icon mobile-icon"></div>
          <div class="mobile-location">+886</div>
        </div>
        <input type="text" v-model="mobile" class="row-input" placeholder="請輸入手機號">
      </div>

      <div class="row pass-row">
        <div class="row-label">
          <div class="icon pass-icon"></div>
        </div>
        <input type="password" v-model="password" class="row-input" placeholder="請輸入密碼">
      </div>


      <div class="submit-row">
        <a class="btn" @click="submit()" href="javascript:;">登錄</a>
      </div>

      <div class="action-row">
        <router-link to="/forgot" class="btn forgot-btn">忘記密碼</router-link>
        <router-link to="/signup" class="btn register-btn">立即註冊</router-link>
      </div>


    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        mobile: '',
        password: '',
      };
    },
    methods: {
      reload() {
      },
      submit() {
        const vm = this;
        vm.login(vm.mobile, vm.password).then(() => {
          vm.$router.push({ name: 'main_index' });
          vm.notify('登錄成功');
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .signin-mobile {
    background: #E5E5EC;
    .signin-mobile-block {
      padding: 30*@px 30*@px 0 30*@px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .row {
        height: 92*@px;
        background: #fff;
        padding-left: 192*@px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 30*@px;
        border-radius: 45*@px;
        overflow: hidden;
        &.pass-row {
          margin-bottom: 60*@px;
        }
        .row-label {
          font-size: 32*@px;
          position: absolute;
          left: 50*@px;
          top: 24*@px;
          .clearfix();
          .icon {
            float: left;
            width: 44*@px;
            height: 44*@px;
            background: 50% 50% no-repeat;
            background-size: 100%;
            &.mobile-icon {
              background-image: url("../../assets/image/A/login_icon_phone@3x.png");
            }
            &.pass-icon {
              background-image: url("../../assets/image/A/login_icon_password@3x.png");
            }
          }
          .mobile-location {
            float: left;
            margin-left: 8*@px;
            line-height: 44*@px;
          }
        }
        .row-input {
          width: 100%;
          padding: 0;
          border: 0;
          height: 100%;
          font-size: 32*@px;
          .placeholder-color(#959595);
        }
      }
      .submit-row {
        margin-bottom: 15*@px;
        .btn {
          border-radius: 45*@px;
          color: #fff;
          background: #3abbf0;
          display: block;
          height: 90*@px;
          line-height: 90*@px;
          text-decoration: none;
          text-align: center;
          font-size: 40*@px;
        }
      }
      .action-row {
        padding: 0 50*@px;
        .btn {
          font-size: 32*@px;
          color: #959595;
          text-decoration: none;
          &.register-btn {
            float: right;
          }
        }
      }

    }
  }


</style>
