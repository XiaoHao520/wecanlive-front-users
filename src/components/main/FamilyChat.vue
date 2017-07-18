<template>
  <div class="page-family-chat">
    <header-common :title="title">
      <div class="family-action" slot="right">
        <a href="javascript:;" @click="mission=!mission" class="btn mission-btn">
          <div class="unread"></div>
        </a>
        <a href="javascript:;" class="btn notice-btn">
          <div class="unread"></div>
        </a>
      </div>
    </header-common>
    <transition name="slide-down-up">
      <div v-if="mission" class="family-notice">
        <div class="avatar"></div>
        <div class="notice-info">
          <div class="header">
            <span class="title">[家族任务]新人须知</span>
            <span class="date">2017-05-10 14:00</span>
          </div>
          <div class="content">
            新加入家族的童鞋可以修改自己的家族名片哦，格式例如：１１
            <a href="javascript:;" class="more-btn">更多</a>
          </div>
        </div>
      </div>
    </transition>

    <div class="chat-list">

      <div class="date">04/06 10:59</div>

      <div class="message side-message">
        <div class="avatar"></div>
        <div class="content">我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦</div>
      </div>

      <div class="message side-message">
        <div class="avatar"></div>
        <div class="content">我跟你说哦</div>
      </div>

      <div class="message own-message">
        <div class="avatar"></div>
        <div class="content">我跟你说哦</div>
      </div>

      <div class="message own-message">
        <div class="avatar"></div>
        <div class="content">我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦我跟你说哦</div>
      </div>
    </div>

    <div class="chat-input">
      <a href="javascript:;" class="add-icon"></a>
      <input type="text" placeholder="輸入對話內容">
      <a href="javascript:;" class="submit-btn">發送</a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        title: '兄弟家族(13)',
        mission: false,
      };
    },
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-chat {
    background: #E5E5EC;
    .component-header-common {
      z-index: 99;
    }
    .family-notice {
      z-index: 9;
      padding: 40*@px 30*@px 40*@px 165*@px;
      background: #fff;
      position: relative;
      .avatar {
        height: 120*@px;
        width: 120*@px;
        background: url("../../assets/image/F/f5_1_icon_newnotice@3x.png") 50% 50% no-repeat;
        background-size: 100%;
        position: absolute;
        left: 30*@px;
      }
      .notice-info {
        .header {
          position: relative;
          .title {
            font-size: 30*@px;
          }
          .date {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 24*@px;
            color: #BCBEC0;
          }
        }
        .content {
          height: 78*@px;
          font-size: 24*@px;
          line-height: 35*@px;
          color: #8D8D8D;
          position: relative;
          .more-btn {
            position: absolute;
            color: #2C02EA;
            bottom: 90*@px;
            right: 0;
          }
        }
      }
    }

    .chat-list {
      position: absolute;
      top: @height-header;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 15*@px 30*@px 0 30*@px;
      .date {
        margin-bottom: 15*@px;
        text-align: center;
        font-size: 24*@px;
        color: #A7A7A9;
      }
      .message {
        margin-bottom: 25*@px;
        .clearfix();
        position: relative;
        .avatar {
          position: absolute;
          width: 100*@px;
          height: 100*@px;
          border-radius: 50%;
          background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
          background-size: cover;
        }
        .content {
          display: inline-block;
          padding: 32*@px 30*@px 32*@px 30*@px;
          background: #fff;
          font-size: 28*@px;
          line-height: 36*@px;
          .border-box();
        }
        &.side-message {
          padding-left: 115*@px;
          .avatar {
            top: 0;
            left: 0;
          }
          .content {
            border-radius: 20*@px;
            border-top-left-radius: 0;
          }
        }

        &.own-message {
          padding-right: 115*@px;
          text-align: right;
          .avatar {
            top: 0;
            right: 0;
          }
          .content {
            text-align: left;
            border-radius: 20*@px;
            border-top-right-radius: 0;
          }
        }
      }

    }
    .chat-input {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 90*@px;
      padding: 0 180*@px 0 100*@px;
      background: #fff;
      .add-icon {
        left: 30*@px;
        top: 20*@px;
        position: absolute;
        width: 50*@px;
        height: 50*@px;
        background: url("../../assets/image/F/f5_1_icon_add@3x.png") 50% 50% no-repeat;
        background-size: 100%;
      }
      input {
        height: 100%;
        font-size: 24*@px;
        width: 100%;
        padding-right: 10*@px;
      }
      .submit-btn {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 180*@px;
        background: @bg-header;
        font-size: 30*@px;
        line-height: 90*@px;
        text-align: center;
        color: #fff;
      }
    }

  }

  .slide-down-up-enter-active {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-down-up-leave-active {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-down-up-enter, .slide-down-up-leave-active {
    -webkit-transform: translate3d(0, -100%, 0);
    -moz-transform: translate3d(0, -100%, 0);
    -ms-transform: translate3d(0, -100%, 0);
    -o-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }


</style>
