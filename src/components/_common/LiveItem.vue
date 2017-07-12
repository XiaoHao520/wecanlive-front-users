<template>
  <div class="component-live-item"
       :style="{backgroundImage: !!item && 'url('+ item.author_avatar +')'}"
       @click="playLive">

    <div class="top-bar">
      <div class="member-num" v-if="!review">{{item ? item.count_view : 0}}</div>
      <div class="review-member-num" v-if="review">10086</div>
      <div class="location">
        <div class="icon"></div>
        <div class="text">臺北市</div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="title">直播間</div>
      <div class="owner-nickname">{{item ? item.nickname : ''}}</div>
    </div>

    <div class="icon-review" v-if="review"></div>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {};
    },
    methods: {
      reload() {
      },
      playLive() {
        const vm = this;
        if (vm.item.id) {
          vm.$router.push({ name: 'main_live', params: { id: vm.item.id } });
        }
      },
    },
    props: {
      item: Object,
      review: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-live-item {

    position: relative;
    height: 750*@px;
    background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    margin-bottom: 1px;
    .top-bar {
      width: 100%;
      height: 120*@px;
      overflow: hidden;
      .border-box();
      padding: 20*@px;
      background: svg-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
      .member-num {
        float: left;
        width: 216*@px;
        height: 36*@px;
        line-height: 36*@px;
        margin-left: 22*@px;
        background: url("../../assets/image/B1/table_live@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        color: #888888;
        font-size: 25*@px;
        text-indent: 135*@px;
      }
      .review-member-num {
        float: left;
        width: 216*@px;
        height: 36*@px;
        line-height: 36*@px;
        margin-left: 22*@px;
        background: url("../../assets/image/B1/table_review@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        color: #888888;
        font-size: 25*@px;
        text-indent: 135*@px;
      }
      .location {
        float: right;
        height: 40*@px;
        line-height: 40*@px;
        overflow: hidden;
        .icon {
          float: left;
          width: 40*@px;
          height: 40*@px;
          margin-right: 10*@px;
          background: url("../../assets/image/B2/icon_location@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .text {
          float: left;
          color: #FFFFFF;
          font-size: 26*@px;
          height: 40*@px;
          line-height: 40*@px;
        }
      }
    }
    .bottom-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 107*@px;
      padding-bottom: 5*@px;
      background: svg-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
      .title {
        text-indent: 20*@px;
        color: #FFFFFF;
        font-size: 38*@px;
      }
      .owner-nickname {
        width: 420*@px;
        text-indent: 20*@px;
        font-size: 30*@px;
        color: #FFFFFF;
        .single-text-overflow();
      }
    }

    .icon-review {
      position: absolute;
      width: 144*@px;
      height: 144*@px;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background: url("../../assets/image/B1/icon_play@3x.png") 50% 50% no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
</style>
