<template>
  <div class="page-personal-settings">
    <header-common title="設定"
                   :backLink="{name: 'main_member_detail',params: {id: me.id} }"
    ></header-common>


    <div class="setting-list">
      <ul>
        <li class="setting-item">
          <router-link :to="{name: 'main_personal_icoin'}">我的 i 幣</router-link>
        </li>

        <li class="setting-item">
          <router-link :to="{name: 'main_personal_profile'}">編輯個人資料</router-link>
        </li>

        <li class="setting-item">
          <router-link :to="{name: 'main_personal_account'}" href="javascript:;">賬號管理</router-link>
        </li>

        <li class="setting-item">
          <router-link :to="{name: 'main_personal_blacklist'}" href="javascript:;">封鎖清單</router-link>
        </li>

        <li class="setting-item">
          <router-link :to="{name: 'main_personal_referrer'}">邀請好友</router-link>
        </li>

        <li class="setting-item">
          <router-link :to="{name: 'main_personal_feedback'}">意見反饋</router-link>
        </li>

        <li class="setting-item">
          <a href="javascript:;">
            平臺客服郵箱
            <div class="mail">jfojwofn@ewhale.cn</div>
          </a>
        </li>
      </ul>
    </div>

    <div class="login-out-btn">
      <a @click="userLogout()" href="javascript:;" class="btn">登出</a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
      userLogout() {
        const vm = this;
        vm.notifyConfirm('确定要退出当前用户？', '取消', '確定').then(() => {
          vm.logout();
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-personal-settings {
    background: #E5E5EC;
    .setting-list {
      margin-bottom: 80*@px;
      .setting-item {
        background: #fff;
        border-bottom: 1px solid @color-border;
        a {
          display: block;
          height: 100*@px;
          padding: 0 30*@px;
          box-sizing: inherit;
          line-height: 100*@px;
          font-size: 28*@px;
          color: #000000;
          .mail {
            float: right;
            font-size: 26*@px;
            color: #989898;
          }
        }
      }
    }
    .login-out-btn {
      padding: 0 30*@px;
      .btn {
        height: 90*@px;
        line-height: 90*@px;
        color: #fff;
        background: #3ABBF0;
        display: block;
        font-size: 36*@px;
        border-radius: 40*@px;
        text-align: center;
      }
    }
  }


</style>
