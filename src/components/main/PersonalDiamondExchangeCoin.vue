<template>
  <div>
    <header-common title="兌換成金幣"></header-common>
    <div class="diamond-exchange-coin" :class="{'not-status-bar': !overlapStatusBar}">
      <div class="personal-balance">
        <div class="balance coin">
          <div class="num">{{ me.coin_balance }}</div>
          <div class="unit">金幣</div>
        </div>
        <div class="balance diamond">
          <div class="num">{{ me.diamond_balance }}</div>
          <div class="unit">鑽石</div>
        </div>
      </div>


      <div class="exchange-list">
        <ul>
          <li class="exchange-item">
            <div class="num">50</div>
            <div @click="exchange(50)" class="exchange-btn">100 鑽石</div>
          </li>

          <li class="exchange-item">
            <div class="num">150</div>
            <div @click="exchange(150)" class="exchange-btn">300 鑽石</div>
          </li>

          <li class="exchange-item">
            <div class="num">300</div>
            <div @click="exchange(300)" class="exchange-btn">600 鑽石</div>
          </li>

          <li class="exchange-item">
            <div class="num">500</div>
            <div @click="exchange(500)" class="exchange-btn">1000 鑽石</div>
          </li>

          <li class="exchange-item">
            <div class="num">1000</div>
            <div @click="exchange(1000)" class="exchange-btn">2000 鑽石</div>
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
        const vm = this;
        vm.authenticate(true).then(() => {
        });
      },
      exchange(coinCount) {
        const vm = this;
        vm.confirm(`是否確認兌換${coinCount}金幣`).then(() => {
          vm.api('DiamondExchangeRecord').save({
            action: 'diamond_exchange_coin',
          }, {
            coin_count: coinCount,
          }).then((resp) => {
            vm.reload();
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .diamond-exchange-coin {
    position: absolute;
    top: 126*@px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    .app-scroll();
    &.not-status-bar {
      top: @height-header;
    }
    .personal-balance {
      background: #170175;
      height: 515*@px;
      box-sizing: border-box;
      padding-top: 135*@px;
      .balance {
        color: #fff;
        width: 340*@px;
        margin: 0 auto;
        box-sizing: border-box;
        .unit {
          color: #A7A4C2;
          float: left;
          height: 120*@px;
          line-height: 133*@px;
          font-size: 24*@px;
          margin-left: 20*@px;
        }
        .num {
          width: 130*@px;
          font-size: 48*@px;
          height: 120*@px;
          line-height: 120*@px;
          float: left;
          text-align: right;
        }
        &.coin {
          padding-left: 140*@px;
          height: 120*@px;
          background: url("../../assets/image/F/f_icon_coin@3x.png") 0 50% no-repeat;
          background-size: 120*@px;
        }
        &.diamond {
          margin-top: 35*@px;
          padding-left: 140*@px;
          height: 120*@px;
          background: url("../../assets/image/F/f_icon_diamond@3x.png") 0 50% no-repeat;
          background-size: 120*@px;
        }
      }
    }
    .exchange-list {
      padding: 0 30*@px;
      .exchange-item {
        border-bottom: 1px solid @color-border;
        padding: 30*@px 0 30*@px 78*@px;
        background: url("../../assets/image/F/f_icon_coin@2x.png") 0 50% no-repeat;
        background-size: 62*@px;
        position: relative;
        .num {
          font-size: 32*@px;
          height: 62*@px;
          line-height: 62*@px;
        }
        .exchange-btn {
          height: 62*@px;
          position: absolute;
          right: 0;
          top: 30*@px;
          font-size: 32*@px;
          line-height: 62*@px;
          background: #A201FD;
          color: #fff;
          text-align: center;
          width: 200*@px;
          border-radius: 30*@px;
        }
      }
    }
  }
</style>
