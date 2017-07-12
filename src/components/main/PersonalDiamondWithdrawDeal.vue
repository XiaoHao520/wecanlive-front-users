<template>
  <div>
    <header-common title="wecanLive 提款協議"></header-common>

    <div class="deal-content">
      <h2>提款須知</h2>
      <p>1您必須擁有paypal賬號以及</p>
      <p>1您必須擁有paypal賬號以及</p>
      <p class="red">1您必須擁有paypal賬號以及</p>

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

  .deal-content {
    padding: 30*@px 25*@px 0 25*@px;
    h2 {
      font-size: 32*@px;
      color: #7B6CF2;
      margin-bottom: 28*@px;
    }
    p {
      font-size: 24*@px;
      color: #8D8D8D;
      margin-bottom: 48*@px;
      &.red {
        color: #FE0202;
      }
    }
  }
</style>
