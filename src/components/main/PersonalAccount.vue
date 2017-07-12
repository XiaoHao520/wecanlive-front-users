<template>
  <div class="page-personal-account">
    <header-common title="賬號管理"></header-common>
    <div class="personal-account-list">
      <div class="row">
        <router-link :to="{name: 'main_personal_change_mobile'}">
          綁定手機號
        </router-link>
      </div>

      <div class="row">
        <a href="javascript:;">
          Facebook 賬號
        </a>
      </div>

      <div class="row">
        <a href="javascript:;">
          Google 賬號
        </a>
      </div>


      <div class="row">
        <router-link :to="{name: 'main_personal_change_password'}">
          修改密碼
        </router-link>
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';
  .page-personal-account {
    background: #E5E5EC;
    .personal-account-list {
      .row {
        background: #fff;
        border-bottom: 1px solid @color-border;
        a {
          height: 100*@px;
          line-height: 100*@px;
          display: block;
          padding: 0 30*@px;
          font-size: 30*@px;
          color: #000;
        }
      }
    }
  }
</style>
