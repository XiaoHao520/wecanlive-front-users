<template>
  <div class="page-personal-diamond">
    <header-common title="我的鑽石">
      <router-link :to="{name: 'main_personal_diamond_transactions'}"
                   class="deal-detail" slot="right">交易明細
      </router-link>
    </header-common>


    <div class="personal-diamond">
      <div class="diamond-balance">
        <div class="diamond-icon"></div>
        <div class="balance">10000</div>
        <div class="diamond-form">收到鑽石</div>
      </div>

      <div class="btn exchange-goal-btn">
        <router-link :to="{name: 'main_personal_diamond_exchange_coin'}">兌換成金幣</router-link>
      </div>

      <div class="btn exchange-cash-btn">
        <router-link :to="{name: 'main_personal_diamond_withdraw'}">兌換成現金</router-link>
      </div>

      <div class="exchange-warn">
        <div class="warn-title">什麼是鑽石？</div>
        <p>1.當你直播時收到關總送的禮物，例如魔法棒或是保時捷等物品，您即可獲得與該物同等值的鑽石數量。</p>
        <p>1.您可以選擇將鑽石兌換成金幣，或是兌換成現金領出。</p>
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

  .page-personal-diamond {
    .personal-diamond {
      position: absolute;
      top: @height-header;
      left: 0; right: 0; bottom: 0;
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
          background: url("../../assets/image/f-f4/f_icon_diamond@3x.png") 50% 50% no-repeat;
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
      .btn {
        padding: 0 30*@px;
        text-align: center;
        line-height: 90*@px;
        a {
          background: #A201FD;
          color: #fff;
          height: 90*@px;
          display: block;
          border-radius: 45*@px;
          font-size: 36*@px;
        }
        &.exchange-goal-btn {
          margin-top: 50*@px;
        }
        &.exchange-cash-btn {
          margin-top: 30*@px;
          a {
            background: @color-submit;
          }
        }

      }
      .exchange-warn {
        margin-top: 60*@px;
        padding: 0 30*@px;
        .warn-title {
          font-size: 30*@px;
          margin-bottom: 40*@px;
        }
        p {
          font-size: 25*@px;
          color: #959595;
          margin: 0;
          line-height: 35*@px;
        }
      }
    }
  }


</style>
