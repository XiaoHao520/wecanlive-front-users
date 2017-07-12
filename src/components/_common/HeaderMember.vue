<template>
  <header class="component-header-member"
          :class="{'not-status-bar': !overlapStatusBar}">
    <div class="top-bar">
      <div class="top-btn-bar">
        <router-link :to="{name:'main_personal_settings'}"
                     class="btn-settings"></router-link>
        <router-link :to="{name:'main_member_friends'}"
                     class="btn-friend"></router-link>
      </div>
      <div class="info-bar">
        <div class="avatar"
             @click="modifyAvatar"
             :style="{backgroundImage: !!me && 'url('+ me.avatar_url +')'}">
          <a class="btn-camera"></a>
        </div>
        <div class="right-block">
          <div class="nickname">{{me.nickname}}</div>
          <div class="basic-info">
            <div class="icon" :class="{femail: me.gender == 'F'}"></div>
            {{ choices.gender[me.gender] }} • {{ me.age }} 歲 • {{ choices.constellation[me.constellation] }}
          </div>
          <div class="live-num-block">
            <div class="num-block">
              <div class="title">粉絲</div>
              <div class="num">{{ me.count_followed }}</div>
            </div>
            <div class="num-block">
              <div class="title">追蹤</div>
              <div class="num">{{ me.count_follow }}</div>
            </div>
            <div class="num-block">
              <div class="title">直播</div>
              <div class="num">45612</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="description">{{ me.signature }}</div>
  </header>
</template>

<script lang="babel">
  export default {
    methods: {
      modifyAvatar() {
        const vm = this;
        vm.pickImage().then((resp) => {
          vm.api('Member').patch({
            id: vm.me.id,
          }, {
            avatar: resp.id,
          }).then(() => {
            vm.authenticate(true);
          });
        });
      },
    },
    props: {
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-header-member {
    background: @bg-header;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding: 36*@px 21*@px 0;
    color: #FFFFFF;
    &.not-status-bar {
      padding-top: 0;
    }
    .top-bar {
      height: 317*@px;
      padding-top: 21*@px;
      border-bottom: 1px solid #481078;
      .border-box();
      .top-btn-bar {
        overflow: hidden;
        width: 100%;
        .border-box();
        .btn-settings {
          float: left;
          width: 52*@px;
          height: 52*@px;
          background: url("../../assets/image/B5/icon_setting@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .btn-friend {
          float: right;
          width: 52*@px;
          height: 52*@px;
          background: url("../../assets/image/B5/icon_friend@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .info-bar {
        overflow: hidden;
        width: 100%;
        margin-top: 46*@px;
        .avatar {
          position: relative;
          float: left;
          width: 165*@px;
          height: 165*@px;
          .border-radius(50%);
          background: #000;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
          .btn-camera {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 60*@px;
            height: 60*@px;
            background: url("../../assets/image/B5/icon_changepic@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
        }
        .right-block {
          float: right;
          width: 505*@px;
          .nickname {
            font-size: 36*@px;
            width: 100%;
            .single-text-overflow();
          }
          .basic-info {
            overflow: hidden;
            height: 36*@px;
            line-height: 36*@px;
            font-size: 24*@px;
            color: #BCA4F7;
            .icon {
              float: left;
              width: 36*@px;
              height: 36*@px;
              background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              &.femail {
                background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
            }
          }
          .live-num-block {
            overflow: hidden;
            margin-top: 18*@px;
            .num-block {
              float: left;
              margin-right: 28*@px;
              width: 140*@px;
              .title {
                font-size: 23*@px;
              }
              .num {
                font-size: 33*@px;
                color: #00E2FD;
                word-break: break-all;
              }
              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
    .description {
      margin: 0 auto;
      height: 126*@px;
      .border-box();
      text-align: center;
      padding: 25*@px 0;
      font-size: 25*@px;
      color: #E7DCFB;
    }

  }
</style>
