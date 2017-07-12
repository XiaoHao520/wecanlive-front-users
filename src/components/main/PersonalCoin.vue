<template>
  <div>
    <header-common title="我的金幣">
      <router-link :to="{name: 'main_personal_coin_transactions'}" class="deal-detail" slot="right">交易明細
      </router-link>
    </header-common>

    <div class="personal-coin">
      <div class="diamond-balance">
        <div class="diamond-icon"></div>
        <div class="balance">10000</div>
        <div class="diamond-form">金幣</div>
      </div>

      <div class="detail-list">
        <ul>
          <li class="detail-item">
            <div class="coin-icon"></div>
            <div class="coin-num">69</div>
            <div class="coin-award">+60 首次加值獎勵</div>
            <div class="coin-btn">NT$ 150</div>
          </li>
        </ul>
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

  .personal-coin {
    position: absolute;
    top: @height-header;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .app-scroll();
    .diamond-balance {
      height: 520*@px;
      background: #170175;
      box-sizing: border-box;
      padding-top: 120*@px;
      .diamond-icon {
        width: 175*@px;
        height: 170*@px;
        background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 50% 50% no-repeat;
        background-size: 100%;
        margin: 0 auto;
      }
      .balance {
        margin-top: 25*@px;
        font-size: 45*@px;
        text-align: center;
        color: #fff;
        height: 45*@px;
        line-height: 45*@px;
      }
      .diamond-form {
        color: #9995B9;
        text-align: center;
        font-size: 26*@px;
        margin-top: 10*@px;
        height: 26*@px;
        line-height: 26*@px;
      }
    }

    .detail-list {
      padding: 0 30*@px;
      .detail-item {
        padding: 28*@px 0;
        .clearfix();
        border-bottom: 1px solid @color-border;
        .coin-icon {
          width: 62*@px;
          height: 62*@px;
          background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          float: left;
          margin-right: 14*@px;
        }
        .coin-num {
          font-size: 32*@px;
          height: 62*@px;
          line-height: 62*@px;
          float: left;
          width: 92*@px;
        }
        .coin-award {
          float: left;
          font-size: 26*@px;
          height: 62*@px;
          line-height: 62*@px;
          color: #2D02ED;
        }
        .coin-btn {
          height: 62*@px;
          width: 200*@px;
          float: right;
          font-size: 32*@px;
          line-height: 62*@px;
          text-align: center;
          color: #fff;
          background-color: #A201FD;
          border-radius: 30*@px;
        }
      }
    }

  }
</style>
