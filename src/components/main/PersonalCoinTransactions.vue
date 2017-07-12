<template>
  <div>
    <header-common title="交易明細"></header-common>

    <div class="transactions-list">
      <ul>
        <li class="transactions-item">
          <div class="transactions-type">購買金幣 $30</div>
          <div class="transactions-date">2017-05-07</div>

          <div class="transactions-use">69</div>
        </li>
        <li class="transactions-item">
          <div class="transactions-type">購買金幣 $30</div>
          <div class="transactions-date">2017-05-07</div>

          <div class="transactions-use">12345</div>
        </li>

        <li class="transactions-item">
          <div class="transactions-type">購買金幣 $30</div>
          <div class="transactions-date">2017-05-07</div>

          <div class="transactions-use">69</div>
        </li>
        <li class="transactions-item">
          <div class="transactions-type">購買金幣 $30</div>
          <div class="transactions-date">2017-05-07</div>

          <div class="transactions-use">69</div>
        </li>

      </ul>
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

  .transactions-list {
    padding: 0 30*@px;
    position: absolute;
    top: @height-header;
    left: 0; right: 0; bottom: 0; overflow-y: scroll;
    .app-scroll();
    .transactions-item {
      padding: 30*@px 0;
      border-bottom: 1px solid @color-border;
      position: relative;
      .transactions-type {
        font-size: 30*@px;
      }
      .transactions-date {
        font-size: 20*@px;
        color: #8D8D8D;
        margin-top: 10*@px;
      }
      .transactions-use {
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 180*@px;
        padding-left: 75*@px;
        box-sizing: border-box;
        height: 62*@px;
        line-height: 62*@px;
        background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 0 50% no-repeat;
        background-size: 62*@px;
        color: #2D02ED;
        font-size: 32*@px;
      }
    }
  }
</style>
