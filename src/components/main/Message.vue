<template>
  <div class="page-message">
    <header-common title="收件匣"></header-common>
    <div class="message-list" :class="{'not-status-bar': !overlapStatusBar}">
      <ul>
        <li class="message-item">
          <router-link :to="{name: 'main_message_list', params:{type: 'system'}}">
            <div class="avatar system-avatar"></div>
            <div class="content">
              <div class="message-form">
                系統訊息
                <div class="message-date">16:40</div>
              </div>
              <div class="message-content">親愛的用戶</div>
            </div>
          </router-link>
        </li>
        <li class="message-item">
          <a href="javascript:;">
            <div class="avatar activity-avatar"></div>
            <div class="content">
              <div class="message-form">
                活動訊息
                <div class="message-date">16:40</div>
              </div>
              <div class="message-content">親愛的用戶</div>
            </div>
          </a>
        </li>
        <li class="message-item">
          <a href="javascript:;">
            <div class="avatar dynamic-avatar"></div>
            <div class="content">
              <div class="message-form">
                動態訊息
                <div class="message-date">16:40</div>
              </div>
              <div class="message-content">親愛的用戶</div>
            </div>
          </a>
        </li>
        <li class="message-item">
          <a href="javascript:;">
            <div class="avatar stranger-avatar"></div>
            <div class="content">
              <div class="message-form">
                陌生人訊息
                <div class="message-date">16:40</div>
              </div>
              <div class="message-content">親愛的用戶</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <footer-common></footer-common>
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

  .page-message {
    background: #E5E5EC;
    .message-list {
      position: absolute;
      left: 0;
      right: 0;
      bottom: @height-footer;
      top: 126*@px;
      &.not-status-bar {
        top: @height-header;
      }
      ul {
        padding: 0 30*@px;
        background: #fff;
        .message-item {
          padding: 12*@px 0 12*@px 136*@px;
          box-sizing: border-box;
          border-bottom: 1px solid @color-border;
          position: relative;
          &:first-child {
            padding-top: 30*@px;
          }
          .avatar {
            width: 120*@px;
            height: 120*@px;
            border-radius: 50%;
            position: absolute;
            left: 0;
            &.system-avatar {
              background: url("../../assets/image/E/e_list_icon_sysmessage@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
            &.activity-avatar {
              background: url("../../assets/image/E/e_list_icon_eventmessage@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
            &.dynamic-avatar {
              background: url("../../assets/image/E/e_list_icon_livemessage@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
            &.stranger-avatar {
              background: url("../../assets/image/E/e_list_icon_trackmessage@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
          .content {
            height: 120*@px;
            padding-top: 27*@px;
            box-sizing: border-box;
            .message-form {
              font-size: 30*@px;
              position: relative;
              color: #000000;
              height: 30*@px;
              line-height: 30*@px;
              .message-date {
                position: absolute;
                right: 0;
                bottom: 0;
                font-size: 24*@px;
                color: #959595;
              }
            }
            .message-content {
              color: #959595;
              font-size: 24*@px;
              height: 24*@px;
              line-height: 24*@px;
              margin-top: 10*@px;
            }
          }
        }
      }

    }
  }
</style>
