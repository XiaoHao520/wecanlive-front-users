<template>
  <div class="page-license">
    <header-common title="會員服務條款"></header-common>

    <div class="license-content">
      <div class="content">
        歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到
        歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到
        歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到歡飲來到

      </div>

      <div class="bottom-btn">
        <a class="btn" @click="goBack()">同 意</a>
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

  .page-license {
    .license-content {
      font-size: 28*@px;
      line-height: 45*@px;
      padding: 30*@px;
      .content {
        position: absolute;
        top: @height-header;
        bottom: 120*@px;
        left: 0;
        right: 0;
        overflow-y: scroll;
        .app-scroll();
        padding: 30*@px;
      }
      .bottom-btn {
        background: #fff;
        position: fixed;
        bottom: 30*@px;
        left: 0;
        right: 0;
        padding: 30*@px 30*@px 0 30*@px;
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
