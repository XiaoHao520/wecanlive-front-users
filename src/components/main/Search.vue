<template>
  <div class="page-search">
    <section class="search-header"
             :class="{'not-status-bar': !overlapStatusBar}">
      <div class="search-block">
        <div class="search-icon"></div>
        搜尋
      </div>

      <div class="right">
        <a href="javascript:;" class="code-icon"></a>
      </div>
    </section>


    <div class="search-block-main">
      <div class="top-live">
        <div class="top-live-header">衆星雲集</div>
        <div class="top-live-list">
          <ul>
            <li class="top-live-item">
            </li>
          </ul>
        </div>
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

  .page-search {
    .search-header {
      background: @bg-header;
      height: @height-header;
      padding-top: 26*@px;
      position: relative;
      &.not-status-bar {
        padding-top: 0;
      }
      .search-block {
        margin: 13*@px 0 0 30*@px;
        width: 606*@px;
        background: #fff;
        height: 65*@px;
        line-height: 65*@px;
        position: relative;
        text-align: center;
        font-size: 32*@px;
        color: #989898;
        border-radius: 25*@px;
        .search-icon {
          width: 45*@px;
          height: 45*@px;
          left: 43*@px;
          top: 10*@px;
          background: url("../../assets/image/B1/icon_search_nor@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          position: absolute;
        }
      }
      .right {
        width: 65*@px;
        height: 65*@px;
        position: absolute;
        right: 28*@px;
        bottom: 12*@px;
        .code-icon {
          background: 50% 50% no-repeat #ccc;
          background-size: 100%;
          height: 50*@px;
          width: 50*@px;
          position: absolute;
          top: 7.5*@px;
          right: 0;

        }
      }
    }
  }


</style>
