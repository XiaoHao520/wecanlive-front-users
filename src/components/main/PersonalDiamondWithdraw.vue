<template>
  <div class="page-personal-diamond-withdraw">
    <header-common title="兌換成現金"></header-common>

    <div class="personal-diamond-withdraw">
      <div class="personal-balance">
        <div class="balance diamond">
          <div class="num">10000</div>
          <div class="unit">鑽石</div>
        </div>
        <div class="balance coin">
          <div class="num">10000</div>
          <div class="unit">金幣</div>
        </div>
      </div>

      <div class="withdraw-num">
        <div class="withdraw-input">
          <div class="withdraw-label">提現金額</div>
          <input type="text" placeholder="最低提款金額爲 100 美元">
        </div>

        <div class="max-withdraw">最多可以提現 600 美元</div>
        <!--<div class="max-withdraw error">輸入金額小魚100美元</div>-->
      </div>


      <div class="withdraw-way">
        <div class="title">提現方式</div>
        <div class="withdraw-way-choose" @click="accountInput()">
          <!--todo-->
          <div class="withdraw-icon"></div>

          <div class="withdraw-account">1235678912345678</div>

          <div class="withdraw-way-active"></div>

        </div>
      </div>

      <div class="submit">
        <div class="submit-warn">
          按確定即代表您同意
          <router-link :to="{name: 'main_personal_diamond_withdraw_deal'}"><< wecanLive 提款協議>></router-link>
        </div>

        <a href="javascript:;" class="submit-btn">確定</a>

      </div>


    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
      accountInput() {
        const vm = this;
        vm.$router.push({ name: 'main_personal_diamond_withdraw_account' });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-personal-diamond-withdraw {
    background: #E5E5EC;
    .personal-diamond-withdraw {
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
            margin-top: 35*@px;
            padding-left: 140*@px;
            height: 120*@px;
            background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 120*@px;
          }
          &.diamond {
            padding-left: 140*@px;
            height: 120*@px;
            background: url("../../assets/image/f-f4/f_icon_diamond@3x.png") 0 50% no-repeat;
            background-size: 120*@px;
          }
        }
      }
      .withdraw-num {
        background: #fff;
        padding: 0 30*@px;
        .withdraw-input {
          .clearfix();
          border-bottom: 1px solid @color-border;
          .withdraw-label {
            height: 120*@px;
            font-size: 30*@px;
            line-height: 120*@px;
            width: 154*@px;
            float: left;
          }
          input {
            width: 360*@px;
            float: left;
            height: 120*@px;
            font-size: 30*@px;
            .placeholder-color(#BCBEC0);
          }
        }
        .max-withdraw {
          color: #BCBEC0;
          font-size: 26*@px;
          height: 58*@px;
          line-height: 58*@px;
          padding-left: 154*@px;
          &.error {
            color: #FF1F1F;
          }
        }
      }
      .withdraw-way {
        margin-top: 57*@px;
        .title {
          font-size: 30*@px;
          height: 30*@px;
          line-height: 30*@px;
          padding-left: 30*@px;
          margin-bottom: 12*@px;
        }
        .withdraw-way-choose {
          background: #fff;
          padding: 0 110*@px 0 30*@px;
          height: 120*@px;
          position: relative;
          .withdraw-icon {
            width: 152*@px;
            height: 120*@px;
            background: 50% 50% no-repeat;
            background-size: 152*2px;
            display: inline-block;
          }
          .withdraw-account {
            height: 120*@px;
            line-height: 120*@px;
            font-size: 24*@px;
            color: #BCBEC0;
            float: right;
          }
          .withdraw-way-active {
            width: 50*@px;
            height: 50*@px;
            position: absolute;
            top: 50%;
            right: 30*@px;
            background: url("../../assets/image/D/d1_icon_success@3x.png");
            background-size: 100%;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
          }
        }
      }
      .submit {
        margin-top: 125*@px;
        padding: 0 30*@px;
        .submit-warn {
          text-align: center;
          color: #8D8D8D;
          font-size: 26*@px;
          height: 26*@px;
          line-height: 26*@px;
          a {
            color: @color-submit;
          }
        }
        .submit-btn {
          margin-top: 13*@px;
          display: block;
          height: 90*@px;
          font-size: 36*@px;
          text-align: center;
          line-height: 90*@px;
          background: @color-submit;
          color: #fff;
          border-radius: 45*@px;
        }
      }

    }
  }
</style>
