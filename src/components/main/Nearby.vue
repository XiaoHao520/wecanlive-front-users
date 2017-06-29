<template>
  <div id="app-main-discover">
    <ul class="lists">
      <li class="item">
        <div class="active"></div>
        <div class="bottom">30m</div>
      </li>
      <li class="item">
        <div class="bottom">30m</div>
      </li>
    </ul>
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

  #app-main-discover {
    background: #E4E4EB;
    .app-scroll();
    .lists {
      overflow: hidden;
      padding: 5*@px;
      .border-box();
      .item {
        position: relative;
        margin: 5*@px;
        float: left;
        width: 236*@px;
        height: 236*@px;
        background: url("../../assets/image/B3/list_icon_user_unknow@3x.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        .active {
          position: absolute;
          width: 44*@px;
          height: 44*@px;
          top: 10*@px;
          left: 10*@px;
          background: url("../../assets/image/B3/icon_live_2@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: right;
          color: #FFFFFF;
          height: 36*@px;
          line-height: 36*@px;
          font-size: 30*@px;
          padding-right: 10*@px;
          .border-box();
        }
      }
    }
  }
</style>
