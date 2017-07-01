<template>
  <div id="app-main-live-start">
    <div class="background-avatar mask"></div>
    <div class="wrapper">
      <div class="top-bar">
        <div class="location">
          <div class="icon"></div>
          <div class="text">地區</div>
        </div>
        <a class="btn-cancel" @click="goBack()"></a>
      </div>
      <div class="avatar"></div>
      <div class="live-title">新增有 # 標籤的標題</div>
      <div class="form">
        <div class="row-input">
          <div class="icon icon-password"></div>
          <div class="text no-text">設置密碼</div>
        </div>
        <div class="row-input">
          <div class="icon icon-coin"></div>
          <div class="text no-text">設置收費</div>
        </div>
        <div class="row-input">
          <div class="icon icon-member"></div>
          <div class="text no-text">設置上限人數</div>
        </div>
      </div>
      <div class="tag-block">
        <div class="title">選擇一個類別來描述您的視頻直播</div>
        <ul>
          <li>大聲唱</li>
          <li>運動健身</li>
          <li class="selected">真心話</li>
          <li>聊聊</li>
          <li>大冒險</li>
        </ul>
      </div>
      <a class="btn-start-live" @click="startLive">
        <div class="icon"></div>
        <div class="text">開始直播</div>
      </a>
      <a class="btn-share">
        <div class="icon"></div>
        <div class="text">分 享</div>
      </a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
      startLive() {
        const vm = this;
        vm.$router.push({ name: 'main_live', params: { id: 0 } });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #app-main-live-start {
    .background-avatar {
      background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
    }
    .wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.2);
      padding: 53*@px 30*@px 0;
      .border-box();
      &.not-status-bar {
        padding-top: 13*@px;
      }
      .top-bar {
        overflow: hidden;
        height: 66*@px;
        .location {
          overflow: hidden;
          float: left;
          height: 66*@px;
          .icon {
            float: left;
            width: 60*@px;
            height: 60*@px;
            background: url("../../assets/image/B2/icon_location@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .text {
            height: 66*@px;
            line-height: 66*@px;
            float: left;
            font-size: 38*@px;
            color: #FFFFFF;
          }
        }
        .btn-cancel {
          float: right;
          width: 66*@px;
          height: 66*@px;
          background: url("../../assets/image/A/pop_icon_close@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .avatar {
        margin: 28*@px auto 0;
        .rounded-corners(50%);
        width: 205*@px;
        height: 205*@px;
        background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
      .live-title {
        font-size: 38*@px;
        color: #FFFFFF;
        text-align: center;
        margin: 30*@px 0 70*@px;
      }
      .form {
        width: 388*@px;
        margin: 0 auto 79*@px;
        .row-input {
          height: 63*@px;
          width: 100%;
          line-height: 63*@px;
          overflow: hidden;
          .border-box();
          background: rgba(0, 0, 0, 0.3);
          .rounded-corners(63*@px);
          margin-bottom: 20*@px;
          .icon {
            float: left;
            /*TODO: */
          }
          .text {
            float: right;
            width: 278*@px;
            height: 100%;
            line-height: 63*@px;
            color: #FFFFFF;
            font-size: 38*@px;
            &.no-text {
              color: #B5B7B7;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .tag-block {
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        .rounded-corners(10*@px);
        overflow: hidden;
        .title {
          font-size: 30*@px;
          color: #FFFFFF;
          text-align: center;
          height: 100*@px;
          line-height: 100*@px;
        }
        ul {
          padding: 0 50*@px;
          overflow: hidden;
          li {
            float: left;
            color: #FFFFFF;
            text-align: center;
            background: #8C8C8C;
            margin: 0 7.5*@px 28*@px;
            font-size: 24*@px;
            height: 40*@px;
            line-height: 40*@px;
            width: 130*@px;
            .rounded-corners(40*@px);
            &.selected {
              background: #9B1FF2;
            }
          }
        }
      }
      .btn-start-live {
        display: block;
        color: #FFFFFF;
        height: 90*@px;
        .rounded-corners(90*@px);
        width: 388*@px;
        margin: 40*@px auto 19*@px;
        background: #00C6BF;
        .icon {
          /*TODO */
          float: left;
          width: 140*@px;
          height: 90*@px;
        }
        .text {
          float: left;
          font-size: 38*@px;
          width: 184*@px;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;

        }
      }
      .btn-share {
        display: block;
        color: #FFFFFF;
        height: 90*@px;
        .rounded-corners(90*@px);
        width: 388*@px;
        margin: 0 auto;
        background: #00429D;
        .icon {
          /*TODO */
          float: left;
          width: 140*@px;
          height: 90*@px;
        }
        .text {
          float: left;
          font-size: 38*@px;
          width: 184*@px;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;

        }
      }
    }
  }
</style>
