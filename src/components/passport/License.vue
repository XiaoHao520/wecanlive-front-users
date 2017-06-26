<template>
  <div class="page-license">
    <header-common title="會員服務條款"></header-common>

    <div class="license-content">
      <div class="content">
        歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到
        歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到
      </div>

      <div class="bottom-btn">
        <router-link class="btn" to="/signin">同 意</router-link>
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

  .page-license {
    .license-content {
      font-size: 28*@px;
      line-height: 45*@px;
      padding: 30*@px;
      position: relative;
      .content {
        padding-bottom: 150*@px;
      }
      .bottom-btn {
        position: fixed;
        bottom: 30*@px;
        left: 30*@px;
        right: 30*@px;
        padding-top: 30*@px;
        .btn {
          display: block;
          height: 90*@px;
          line-height: 90*@px;
          font-size: 36*@px;
          word-spacing: 33*@px;
          text-align: center;
          color: #fff;
          background: #3ABBF0;
          text-decoration: none;
          border-radius: 40*@px;
        }
      }
    }
  }
</style>
