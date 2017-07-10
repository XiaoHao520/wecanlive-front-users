<template>
  <div>
    <header-common :title="'朋友 ('+friends_list_count+')'">
      <div slot="right" class="scan-btn">
        <!--todo-->
        <a href="javascript:;" class="scan-icon"></a>
      </div>
    </header-common>


    <div class="member-friends">
      <div class="member-info">
        <div class="avatar" :style="{backgroundImage: 'url('+ me.avatar_url +')'}"></div>
        <div class="member">
          <div class="name">{{ me.nickname }}</div>
          <div class="id">ID :{{ me.id }}</div>
        </div>
      </div>

      <div class="friend-block">
        <div class="friends-type">
          交友邀請 ({{ friends_invite_count }})
          <a href="javascript:;" @click="invite=!invite"
             :class="{'hide-icon': !invite}"
             class="open-icon"></a>
        </div>

        <div :class="{'hide' : !invite}" class="member-list">
          <ul>
            <li v-for="invite in friends_invite" class="member-item">
              <div class="avatar" :style="{backgroundImage: 'url('+ invite.avatar_url +')'}"></div>
              <div class="name">{{ invite.nickname }}</div>
              <div class="action">
                <a href="javascript:;" class="btn cancel-btn" @click="refuse(invite)">忽略</a>
                <a href="javascript:;" class="btn confirm-btn" @click="agree(invite)">確認</a>
              </div>
            </li>
          </ul>
        </div>

        <div class="friends-type">
          朋友 ({{ friends_list_count }})
          <a href="javascript:;"
             :class="{'hide-icon': !friend}"
             @click="friend=!friend" class="open-icon"></a>
        </div>


        <div :class="{'hide' : !friend}" class="member-list">
          <ul>
            <li v-for="friend in friends_list" class="member-item">
              <div class="avatar" :style="{backgroundImage: 'url('+ friend.avatar_url +')'}"></div>
              <div class="name">{{ friend.nickname }}</div>
              <div class="action">
                <a href="javascript:;" class="message-btn">
                  <div class="unread-count" v-if="friend.unread">{{ friend.unread }}</div>
                </a>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <transition name="fade">
      <div v-if="add_friend_success" class="add-success" @click="reload()">
        <div class="add-warn">
          您已成功添加{{ add_friend_name }}爲好友
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        invite: true,
        friend: true,
        add_friend_success: false,
        add_friend_name: '',
        friends_list: [],
        friends_list_count: 0,
        friends_invite: [],
        friends_invite_count: 0,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.add_friend_success = false;
//      我的好友
        vm.api('Member').get({
          action: 'get_contact_list',
        }).then((resp) => {
          vm.friends_list = resp.data;
          vm.friends_list_count = resp.data.length;
        });
//      申请加我
        vm.api('Member').get({
          invite: 'True',
        }).then((resp) => {
          vm.friends_invite = resp.data.results;
          vm.friends_invite_count = resp.data.count;
        });
      },
      agree(user) {
        const vm = this;
        vm.api('Contact').save({
          author: vm.me.id,
          user: user.user,
          type: 'OPEN',
        }).then(() => {
          vm.add_friend_name = user.nickname;
          vm.add_friend_success = true;
        });
      },
      refuse(user) {
        const vm = this;
        vm.api('Contact').get({
          author: user.user,
          user: vm.me.id,
        }).then((resp) => {
          vm.api('Contact').delete({
            id: resp.data.results[0].id,
          }).then(() => {
            vm.notify('已經拒絕對方的邀請');
            vm.reload();
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .member-friends {
    .member-info {
      height: 252*@px;
      background: @bg-header;
      padding: 30*@px 0 0 220*@px;
      box-sizing: border-box;
      position: relative;
      .avatar {
        position: absolute;
        left: 27*@px;
        width: 166*@px;
        height: 166*@px;
        border-radius: 50%;
        background: 50% 50% no-repeat #ccc;
        background-size: cover;
      }
      .member {
        height: 166*@px;
        padding-top: 50*@px;
        box-sizing: border-box;
        color: #fff;
        .name {
          font-size: 33*@px;
          height: 33*@px;
          line-height: 33*@px;
        }
        .id {
          font-size: 24*@px;
          height: 24*@px;
          line-height: 24*@px;
          margin-top: 15*@px;
        }
      }
    }

    .friend-block {
      background: #E5E5EC;
      position: absolute;
      top: 378*@px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: scroll;
      .app-scroll();
      .friends-type {
        height: 70*@px;
        padding: 0 30*@px;
        line-height: 70*@px;
        color: #fff;
        font-size: 32*@px;
        background: svg-gradient(to right, #1094FC, #03E6EA);
        position: relative;
        .open-icon {
          display: block;
          position: absolute;
          right: 30*@px;
          top: 0;
          bottom: 0;
          background: url("../../assets/image/D/d2_1_icon_retandown@3x.png") 50% 50% no-repeat;
          background-size: 44*@px;
          width: 44*@px;
          &.hide-icon {
            background-image: url("../../assets/image/D/d2_1_icon_retanup@3x.png");
          }
        }
      }

      .member-list {
        background: #fff;
        padding: 0 30*@px;
        overflow: hidden;
        &.hide {
          height: 0;
        }
        .member-item {
          padding: 15*@px 0;
          border-bottom: 1px solid @color-border;
          &:last-child {
            border-bottom: 0;
          }
          .clearfix();
          position: relative;
          .avatar {
            width: 120*@px;
            height: 120*@px;
            background: 50% 50% no-repeat;
            background-size: cover;
            border-radius: 50%;
            float: left;
          }
          .name {
            font-size: 24*@px;
            height: 120*@px;
            line-height: 120*@px;
            float: left;
            margin-left: 15*@px;
          }
          .action {
            position: absolute;
            right: 0;
            top: 50%;
            .clearfix();
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
            .btn {
              float: right;
              width: 120*@px;
              height: 50*@px;
              line-height: 50*@px;
              display: block;
              margin-left: 20*@px;
              font-size: 25*@px;
              color: #fff;
              text-align: center;
              border-radius: 20*@px;
              &.confirm-btn {
                background: #3ABBF0;
              }
              &.cancel-btn {
                background: #BCBEC0;
              }
            }

            .message-btn {
              width: 60*@px;
              height: 60*@px;
              background:url("../../assets/image/f-f4/f3_icon_message@3x.png") 50% 50% no-repeat;
              background-size: 100%;
              margin-right: 20*@px;
              position: relative;
              display: block;
              .unread-count {
                background: #FF0202;
                border-radius: 50%;
                width: 30*@px;
                height: 30*@px;
                position: absolute;
                top: -15*@px;
                right: -15*@px;
                font-size: 16*@px;
                color: #fff;
                text-align: center;
              }
            }

          }
        }
      }
    }
  }

  .add-success {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 99;
    .add-warn {
      position: fixed;
      top: 50%;
      color: #fff;
      left: 0;
      right: 0;
      font-size: 34*@px;
      text-align: center;
      -webkit-transform: translate(0, -50%);
      -moz-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      transform: translate(0, -50%);
      z-index: 999;
    }
  }

  // 弹出效果
  .popin-enter-active {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
  }

  .popin-leave-active {
    transition: all .4s cubic-bezier(.55, 0, .1, 1);
  }

  .popin-enter, .popin-leave-active {
    -webkit-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
    -moz-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
    -ms-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
    -o-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
    transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
    opacity: 0;
  }
</style>
