<template>
  <div class="page-personal-diamond-transactions">
    <header-common title="交易明細"></header-common>

    <div class="transactions-list" :class="{'not-status-bar': !overlapStatusBar}">
      <ul>
        <li class="transactions-item" v-for="item in items">
          <div class="transactions-header">
            <div class="transactions-type">兌換金幣</div>
            <div class="transactions-date">{{ item.date_create | date('yy-mm-dd') }}</div>
          </div>
          <div class="transactions-num">
            <div class="transactions-diamond">
              {{ item.diamond_count }}
            </div>

            <div class="transactions-coin">
              {{ item.coins_count }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        items: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        // todo: 兌換現金流水
        vm.api('DiamondExchangeRecord').get({
          author: vm.me.id,
        }).then((resp) => {
          vm.items = resp.data.results;
          console.log(vm.items);
        });
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
      top: 126*@px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: scroll;
      .app-scroll();
      &.not-status-bar {
        top: @height-header;
      }
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
            background: url("../../assets/image/F/f_icon_diamond@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            display: inline-block;
            line-height: 56*@px;
            height: 50*@px;
          }
          .transactions-coin {
            float: right;
            padding-left: 56*@px;
            background: url("../../assets/image/F/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            line-height: 56*@px;
            height: 50*@px;
          }
          /*todo 切圖圖標*/
          .transactions-cash {
            float: right;
            padding-left: 56*@px;
            background: url("../../assets/image/F/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 50*@px;
            line-height: 56*@px;
            height: 50*@px;
          }
        }
      }
    }
  }
</style>
