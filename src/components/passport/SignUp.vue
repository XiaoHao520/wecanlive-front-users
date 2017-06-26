<template>
  <div id="app-passport-signup">
    <header-common title="會員註冊"></header-common>
    <section class="section-signup">

      <div class="row-signup"></div>

    </section>
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
  #app-passport-signup {
    background: #E4E4EB;
    .section-signup {
      padding-top: 30*@px;
      .row-signup {
        height: 90*@px;
        background: #FFFFFF;
        margin: 0 auto;
        width: 690*@px;
        .border-radius(90*@px);
      }
    }
  }
</style>
