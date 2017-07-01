<template>
  <div id="app-main-live">
    <section class="section-top">
      <div class="left">
        <div class="avatar"></div>
        <div class="owner-info">
          <div class="nickname">Denkaaaopenyss</div>
          <div class="member-num">
            <div class="icon"></div>
            <div class="num">1025600</div>
          </div>
        </div>
        <a class="btn-tracking">追蹤</a>
      </div>
      <div class="users">
        <div class="avatar-container">
          <div class="user-avatar"></div>
          <div class="decoration"></div>
        </div>
        <div class="user-avatar"></div>
        <div class="user-avatar"></div>
      </div>
      <a class="btn-close"></a>
    </section>
    <div class="top-left-block">
      <div class="diamond-block">
        <div class="icon-diamond"></div>
        <div class="num">10945685</div>
        <div class="icon-caret"></div>
      </div>
      <div class="starlight-block">
        <div class="icon-warpper"></div>
        <div class="percent-block">
          <div class="percent"></div>
          <div class="num">205/500</div>
        </div>
      </div>
    </div>
    <div class="top-right-block">
      <a class="btn-activity"></a>
      <a class="btn-jewel-box" @click="starbox_display=true"></a>
    </div>

    <!--最底部輸入框-->
    <div class="bottom-input">
      <a class="btn-more">+</a>
      <div class="input-box">
        <div class="icon"></div>
        <input type="text" placeholder="說些什麼...">
      </div>
    </div>
    <!--最底部輸入框 END-->

    <!--底部右邊按鈕-->
    <ul class="btn-lists">
      <li class="btn-item btn-item-like"></li>
      <li class="btn-item btn-item-camera"></li>
      <li class="btn-item btn-item-video"></li>
      <li class="btn-item btn-item-tag"></li>
      <li class="btn-item btn-item-share" @cilck="share"></li>
    </ul>
    <!--底部右邊按鈕 END-->

    <section class="section-messages">

    </section>


    <live-starbox :display="starbox_display" @click="starbox()"></live-starbox>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        starbox_display: false,
      };
    },
    methods: {
      reload() {
      },
      starbox(value) {
        this.starbox_display = value;
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #app-main-live {
    background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding: @height-status-bar 30*@px 0;
    .border-box();
    &.not-status-bar {
      padding-top: 0;
    }
    .section-top {
      height: 88*@px;
      overflow: hidden;
      .left {
        float: left;
        height: 88*@px;
        width: 410*@px;
        background: rgba(0, 0, 0, 0.4);
        .rounded-corners(88*@px);
        .border-box();
        padding: 0 9*@px 0 3*@px;
        .avatar {
          float: left;
          width: 82*@px;
          height: 82*@px;
          .rounded-corners(50%);
          margin-top: 3*@px;
          background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        .owner-info {
          float: left;
          width: 155*@px;
          color: #FFFFFF;
          margin-top: 10*@px;
          margin-left: 8*@px;
          .nickname {
            font-size: 32*@px;
            .nowrap();
          }
          .member-num {
            height: 36*@px;
            line-height: 36*@px;
            overflow: hidden;
            .icon {
              /*TODO*/
              float: left;
              width: 36*@px;
              height: 36*@px;
            }
            .num {
              float: left;
              height: 36*@px;
              line-height: 36*@px;
              font-size: 27*@px;
              .nowrap();
            }
          }
        }
        .btn-tracking {
          float: right;
          height: 70*@px;
          width: 129*@px;
          margin-top: 9*@px;
          line-height: 70*@px;
          text-align: center;
          color: #FFFFFF;
          background: @bg-header;
          .rounded-corners(70*@px);
          font-size: 37*@px;
        }
      }
      .users {
        float: left;
        height: 60*@px;
        margin-top: 14*@px;
        .avatar-container {
          float: left;
          position: relative;
          /*TODO*/
          width: 60*@px;
          height: 60*@px;
          .user-avatar {
            .block-center();
            margin: 0;
          }
        }
        .user-avatar {
          float: left;
          width: 50*@px;
          height: 50*@px;
          margin-left: 10*@px;
          margin-top: 5*@px;
          .rounded-corners(50%);
          background: url("../../assets/image/B6/pic_user@2x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
      }
      .btn-close {
        float: right;
        width: 66*@px;
        height: 66*@px;
        margin-top: 11*@px;
        background: url("../../assets/image/A/pop_icon_close@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
    .top-left-block {
      overflow: hidden;
      float: left;
      height: 47*@px;
      color: #FFFFFF;
      font-size: 27*@px;
      margin-top: 30*@px;
      .diamond-block {
        float: left;
        width: 220*@px;
        height: 47*@px;
        background: rgba(0, 0, 0, 0.4);
        .rounded-corners(47*@px);
        .icon-diamond {
          float: left;
          width: 36*@px;
          height: 36*@px;
          background: url("../../assets/image/B6/icon_diamond_s@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          margin: 5.5*@px 5*@px 0 15*@px;
        }
        .num {
          float: left;
          height: 47*@px;
          line-height: 47*@px;
          width: 120*@px;
          .nowrap();
        }
        .icon-caret {
          float: right;
          /*TODO */
        }
      }
      .starlight-block {
        position: relative;
        margin-left: 20*@px;
        height: 47*@px;
        width: 171*@px;
        float: left;
        background: rgba(0, 0, 0, 0.4);
        .rounded-corners(47*@px);
        overflow: hidden;
        .icon-warpper {
          position: absolute;
          height: 47*@px;
          width: 47*@px;
          .rounded-corners(47*@px);
          background: #736A63;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .percent-block {
          float: right;
          height: 47*@px;
          width: 137*@px;
          line-height: 47*@px;
          text-align: center;
          .border-box();
          position: relative;
          padding: 3*@px 3*@px 3*@px 0;
          .num {
            .block-center();
            font-size: 32*@px;
          }
          .percent {
            width: 60%;
            height: 100%;
            background: #FFA940;
            border-bottom-right-radius: 41*@px;
            border-top-right-radius: 41*@px;
          }
        }
      }
    }
    .top-right-block {
      float: right;
      margin-top: 30*@px;
      a {
        float: left;
        width: 95*@px;
        height: 95*@px;
        .rounded-corners(50%);
        background: url("../../assets/image/B6/pic_user@2x.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        &.btn-activity {
          margin-right: 30*@px;
        }
      }
    }
    .bottom-input {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 140*@px;
      .border-box();
      padding: 30*@px;
      .btn-more {
        float: left;
        width: 80*@px;
        height: 80*@px;
        .rounded-corners(50%);
        background: #00E0E8;
        line-height: 80*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 105*@px;
        /*TODO*/
      }
      .input-box {
        float: right;
        width: 580*@px;
        height: 80*@px;
        .rounded-corners(80*@px);
        background: rgba(0, 0, 0, 0.4);
        .icon {
          float: left;
          /*TODO*/
        }
        input {
          margin-top: 20*@px;
          height: 40*@px;
          line-height: 40*@px;
          font-size: 38*@px;
          float: right;
          .placeholder-color(#9A9C9E);
          color: #FFFFFF;
          width: 473*@px;
        }
      }
    }
    .btn-lists {
      position: fixed;
      right: 30*@px;
      bottom: 140*@px;
      width: 95*@px;
      .btn-item {
        width: 95*@px;
        height: 95*@px;
        .rounded-corners(50%);
        background: #000;
        margin-bottom: 10*@px;
        &:last-child {
          margin-bottom: 0;
        }
        /*TODO*/
        &.btn-item-like {
        }
        &.btn-item-camera {
        }
        &.btn-item-video {
        }
        &.btn-item-tag {
        }
        &.btn-item-share {
        }
      }
    }
  }
</style>
