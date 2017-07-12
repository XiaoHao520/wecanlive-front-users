<template>
  <div class="page-personal-diamond-transactions">
    <header-common title="交易明細"></header-common>

    <div class="transactions-list">
      <ul>
        <li class="transactions-item">
          <div class="transactions-header">
            <div class="transactions-type">兌換金幣</div>
            <div class="transactions-date">2017-05-07</div>
          </div>
          <div class="transactions-num">
            <div class="transactions-diamond">
              30
            </div>

            <div class="transactions-coin">
              60
            </div>
          </div>
        </li>

        <li class="transactions-item">
          <div class="transactions-header">
            <div class="transactions-type">兌換金幣</div>
            <div class="transactions-date">2017-05-07</div>
          </div>
          <div class="transactions-num">
            <div class="transactions-diamond">
              30
            </div>

            <div class="transactions-cash">
              60
            </div>
          </div>
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-personal-diamond-transactions {
    .transactions-list {
      padding: 30*@px 30*@px 0 30*@px;
      position: absolute;
      top: @height-header;
      bottom: 0; left: 0; right: 0;
      overflow-y: scroll;
      .app-scroll();
      .transactions-item {
        border-bottom: 1px solid @color-border;
        padding-bottom: 15*@px;
        margin-bottom: 15*@px;
        .transactions-header {
          position: relative;
          .transactions-type {
            font-size: 30*@px;
          }
          .transactions-date {
            font-size: 20*@px;
            position: absolute;
            right: 0;
            bottom: 0;
            color: #898989;
          }
        }
        .transactions-num {
          margin-top: 12*@px;
          font-size: 35*@px;
          color: #2D02ED;
          .transactions-diamond {
            padding-left: 56*@px;
            background: url("../../assets/image/f-f4/f_icon_diamond@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            display: inline-block;
            line-height: 56*@px;
            height: 50*@px;
          }
          .transactions-coin {
            float: right;
            padding-left: 56*@px;
            background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            line-height: 56*@px;
            height: 50*@px;
          }
          /*todo 切圖圖標*/
          .transactions-cash {
            float: right;
            padding-left: 56*@px;
            background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            line-height: 56*@px;
            height: 50*@px;
          }
        }
      }
    }
  }
</style>
