<template>
  <div id="popup-member-card">
    <transition name="popin">
      <div class="popup-member-card-body" v-if="display">
        <div class="popup-member-card-header">
          <a class="btn-manage" @click="handlePick">管理</a>
          <a class="btn-close" @click="handleClick"></a>
          <div class="avatar"
               :style="{backgroundImage: !!item && 'url('+ item.avatar_url +')'}"></div>
          <div class="nickname">{{item.nickname}}</div>
          <div class="description">{{item.signature}}</div>
        </div>
        <div class="popup-member-card-btn">
          <a class="btn-find-friend" @click="addFriend()"></a>
          <a class="btn-message"></a>
        </div>
        <div class="popup-member-card-content">
          <div class="row">
            <div class="title">追蹤</div>
            <div class="content">{{item.following_count}}</div>
          </div>
          <div class="row">
            <div class="title">粉絲</div>
            <div class="content">{{item.followed_count}}</div>
          </div>
          <div class="row">
            <div class="title">貢獻榜</div>
            <div class="content">
              <div class="fans-avatar"></div>
              <div class="fans-avatar"></div>
              <div class="fans-avatar"></div>
            </div>
          </div>
        </div>
        <div class="popup-member-card-footer">

          <a class="btn-footer btn-like btn-liked"
             v-if="item.is_following">已追蹤</a>


          <a class="btn-footer btn-like"
             v-else
             @click="addFollow()">
            <span class="icon">+</span>追蹤
          </a>

          <router-link :to="{name: 'main_member_detail' ,params:{id: item.user}}" class="btn-footer btn-aboutme">關於我</router-link>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="maske" @click="handleClick" v-if="display"></div>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
      handlePick() {
        const vm = this;
        if (vm.choice.length) {
          vm.pickChoice(vm.choice).then((val) => {
//            this.$emit('pick', val);
            if (val === 2) {
              // 举报
              vm.pickChoice([
                { text: '色情', value: '色情' },
                { text: '騷擾', value: '騷擾' },
                { text: '機械軍火', value: '機械軍火' },
                { text: '虐待孩童', value: '虐待孩童' },
                { text: '嚴重暴力', value: '嚴重暴力' },
                { text: '廣告', value: '廣告' },
                { text: '詐騙', value: '詐騙' },
                { text: '取消', value: false },
              ]).then((report) => {
                if (!report) return;
                vm.api('Live').save({
                  action: 'live_report',
                  id: vm.$route.params.id,
                }, {
                  content: report,
                }).then(() => {
                  vm.notify('舉報成功，我們會儘快處理。');
                });
              });
            }
          });
        }
      },
      handleClick(evt) {
        this.$emit('click', !this.display);
      },
      addFriend() {
        const vm = this;
        if (vm.item.contact_form_me && vm.item.contact_to_me) {
          vm.notify('你们已经是好友了');
        } else if (vm.item.contact_form_me && !vm.item.contact_to_me) {
          vm.notify('已經發送好友申請，等待對方回覆');
        } else if (!vm.item.contact_form_me) {
          vm.api('Contact').save({
            author: vm.me.id,
            user: vm.item.user,
            type: 'OPEN',
          }).then(() => {
            vm.notify('已經發送好友申請，等待對方回覆');
            vm.item.contact_form_me = true;
          });
        }
      },
      addFollow() {
        const vm = this;
        vm.api('Member').save({
          action: 'follow',
          id: vm.item.user,
        }, {}).then(() => {
          vm.item.is_following = true;
        });
      },
    },
    props: {
      display: Boolean,
      choice: {
        type: Array,
        default() {
          return [];
        },
      },
      item: Object,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #popup-member-card {
    .maske {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.5);
    }
    .popup-member-card-body {
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 100;
      width: 690*@px;
      height: 905*@px;
      overflow: hidden;
      background: #FFFFFF;
      .border-radius(15*@px);
      .popup-member-card-header {
        height: 343*@px;
        background: @bg-header;
        position: relative;
        color: #FFFFFF;
        padding-top: 40*@px;
        .border-box();
        .btn-manage {
          position: absolute;
          top: 35*@px;
          left: 30*@px;
          font-size: 30*@px;
        }
        .btn-close {
          position: absolute;
          width: 66*@px;
          height: 66*@px;
          top: 20*@px;
          right: 20*@px;
          background: url("../../assets/image/B3/pop_icon_close@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .avatar {
          width: 160*@px;
          height: 160*@px;
          margin: 0 auto;
          .border-radius(50%);
          background: #000 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        .nickname {
          text-align: center;
          font-size: 42*@px;
          margin-top: 15*@px;
        }
        .description {
          width: 630*@px;
          text-align: center;
          font-size: 25*@px;
          margin: 0 auto;
        }
      }
      .popup-member-card-btn {
        padding: 10*@px;
        overflow: hidden;
        .btn-find-friend {
          float: left;
          width: 330*@px;
          height: 76*@px;
          background: url("../../assets/image/B3/btn_friend@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .btn-message {
          float: right;
          width: 330*@px;
          height: 76*@px;
          background: url("../../assets/image/B3/btn_message@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .popup-member-card-content {
        padding: 22*@px 0 42*@px 150*@px;
        color: #000;
        font-size: 30*@px;
        .row {
          overflow: hidden;
          height: 60*@px;
          line-height: 60*@px;
          .title {
            float: left;
            width: 144*@px;
            height: 60*@px;
            line-height: 60*@px;
          }
          .content {
            float: left;
            overflow: hidden;
            height: 60*@px;
            line-height: 60*@px;
            .fans-avatar {
              float: left;
              width: 60*@px;
              height: 60*@px;
              margin-right: 20*@px;
              background: #000 50% 50% no-repeat;
              -webkit-background-size: cover;
              background-size: cover;
              .border-radius(50%);
            }
          }
        }
      }
      .popup-member-card-footer {
        .btn-footer {
          display: block;
          height: 77*@px;
          line-height: 77*@px;
          text-align: center;
          color: #FFFFFF;
          width: 566*@px;
          margin: 0 auto;
          font-size: 37*@px;
          .border-radius(77*@px);
          &:first-child {
            margin-bottom: 30*@px;
          }
          &.btn-like {
            background: #9D20F6;
            .icon {
              font-size: 40*@px;
              margin-right: 5*@px;
            }
          }
          &.btn-liked {
            background: #00BBEC;
          }
          &.btn-aboutme {
            background: #0021E6;
          }
        }
      }
    }
    // 弹出效果
    .popin-enter-active {
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }
    .popin-leave-active {
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }
    .popin-enter, .popin-leave-active {
      -webkit-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
      -moz-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
      -ms-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
      -o-transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
      transform: translate(-50%, -50%) scale3d(0.5, 0.5, 1);
      opacity: 0;
    }
  }
</style>
