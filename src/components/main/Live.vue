<template>
  <div id="app-main-live">
    <section class="section-top">
      <div class="left">
        <div class="avatar" :style="{backgroundImage: 'url('+ live_author.avatar_url +')'}"
             @click="showMemberCard"></div>
        <div class="owner-info">
          <div class="nickname">{{ live_author.nickname }}</div>
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


    <section class="section-bottom">
      <section class="section-messages">
        <section class="messages-box">
          <div class="message-item">
            <div class="nickname-block">
              <div class="tag tag-level">20</div>
              <div class="tag tag-vip">VIP0</div>
              <div class="name yellow">Kevin Chiu</div>
            </div>
            <div class="content">你好可愛喔！</div>
          </div>
          <div class="message-item">
            <div class="nickname-block">
              <div class="name blue">Kevin Chiu</div>
            </div>
            <div class="content">你好可愛喔！</div>
          </div>
          <div class="message-item">
            <div class="nickname-block">
              <div class="name gray">Kevin Chiu</div>
            </div>
            <div class="content gray">已加入</div>
          </div>
        </section>

        <a class="btn-tracking">
          <span class="icon">+</span>
          <span class="text">追蹤 Denkaaaerxdzxc</span>
        </a>

        <a class="btn-share">
          <div class="icon"></div>
          <div class="text">分享到</div>
        </a>

        <div class="share-message-item">
          <div class="nickname-block">
            <div class="name blue">Sho</div>
          </div>
          <div class="content">已分享直播並獲得 5 枚金幣！</div>
        </div>

      </section>
      <!--底部右邊按鈕-->
      <ul class="btn-lists">

        <li class="btn-item btn-item-left btn-item-text"></li>

        <template v-if="is_owner">
          <li class="btn-item btn-item-right btn-item-redbag" @click="redbag_display=true"></li>
          <li class="btn-item btn-item-right btn-item-tag">#</li>
          <li class="btn-item btn-item-right btn-item-camera"></li>
        </template>

        <template v-else>
          <li class="btn-item btn-item-right btn-item-like" @click="showHearts">
            <div class="like-num">6.3K</div>
          </li>
          <li class="btn-item btn-item-right btn-item-gift" @click="giftbag_display=true"></li>
          <li class="btn-item btn-item-right btn-item-vidio"></li>
          <li class="btn-item btn-item-right btn-item-audio"></li>
        </template>

        <li class="btn-item btn-item-right btn-item-share" @click="share"></li>
      </ul>
      <!--底部右邊按鈕 END-->

      <div class="audio-box" v-if="audioBox">
        <div class="percent-box">
          <div class="percent"></div>
        </div>
        <div class="audio-body">
          <a class="btn-record"></a>
        </div>
      </div>

    </section>


    <member-card :display="memberCard"
                 :choice="choice"
                 @click="toggleMemberCard"
                 @pick="choicePick"></member-card>


    <live-starbox :display="starbox_display" @click="starbox()"></live-starbox>

    <live-giftbag :display="giftbag_display" @click="giftbag()"></live-giftbag>

    <live-redbag :display="redbag_display" @click="redbag()"></live-redbag>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        is_owner: true,
        memberCard: false,
        heart_1: false,
        choice: [
          { text: '禁言', value: 0 },
          { text: '加入封鎖清單', value: 1 },
          { text: '舉報', value: 2 },
        ],
        audioBox: false,
        starbox_display: false,
        giftbag_display: false,
        redbag_display: false,
        live: [],
        live_author: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Live').get({
          id: vm.$route.params.id,
        }).then((resp) => {
          vm.live = resp.data;
          vm.api('Member').get({
            id: vm.live.author,
          }).then((m) => {
            vm.live_author = m.data;
          });
        });
      },
      showMemberCard() {
        this.memberCard = true;
      },
      toggleMemberCard(value) {
        this.memberCard = value;
      },
      choicePick(value) {
        // TODO 根據返回的值執行
        console.log(value);
      },
      showHearts() {
        const vm = this;
        vm.heart_1 = !vm.heart_1;
      },
      toggleAudioBox() {
        this.audioBox = !this.audioBox;
      },
      starbox(value) {
        this.starbox_display = value;
      },
      giftbag(value) {
        this.giftbag_display = value;
      },
      redbag(value) {
        this.redbag_display = value;
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
              float: left;
              margin-top: 3*@px;
              margin-right: 5*@px;
              width: 30*@px;
              height: 20*@px;
              background: url("../../assets/image/D/d1_icon_eye@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
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
          font-size: 30*@px;
        }
      }
      .users {
        float: left;
        height: 60*@px;
        margin-top: 14*@px;
        margin-left: 15*@px;
        .avatar-container {
          float: left;
          position: relative;
          /*TODO*/
          width: 60*@px;
          height: 60*@px;
          .decoration {
            position: absolute;
            left: 50%;
            .transform(translate(-50%, -20%));
            width: 61*@px;
            height: 78*@px;
            z-index: 1;
            background: url("../../assets/image/D/d1_icon_champion@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
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
          width: 11*@px;
          height: 16*@px;
          margin-top: 15.5*@px;
          margin-right: 16*@px;
          background: url("../../assets/image/D/d1_icon_next_b@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
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
          background-image: url('../../assets/image/D/icon_star@2x.png');
          background-position: 50% 50%;
          background-repeat: no-repeat;
          -webkit-background-size: 80%;
          background-size: 80%;
          background-color: #000;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .percent-block {
          float: right;
          height: 41*@px;
          width: 134*@px;
          line-height: 47*@px;
          text-align: center;
          .border-box();
          position: relative;
          margin-right: 3*@px;
          margin-top: 3*@px;
          overflow: hidden;
          border-top-right-radius: 41*@px;
          border-bottom-right-radius: 41*@px;
          .num {
            .block-center();
            font-size: 32*@px;
          }
          .percent {
            width: 95%;
            height: 100%;
            background: #FFA940;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
          }
        }
      }
    }
    .top-right-block {
      float: right;
      margin-top: 30*@px;
      a {
        float: left;
        width: 94*@px;
        height: 94*@px;
        .rounded-corners(50%);
        &.btn-activity {
          margin-right: 30*@px;
          background: url("../../assets/image/D/d1_icon_event@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        &.btn-jewel-box {
          background: url("../../assets/image/D/d1_icon_box@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
      }
    }

    .section-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: svg-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5));
      .btn-lists {
        width: 100%;
        height: 144*@px;
        padding: 20*@px 30*@px 30*@px;
        .border-box();
        position: relative;
        .black-mask {
          position: absolute;
          left: 0;
          top: -30*@px;
          width: 100%;
          height: 30*@px;
          z-index: 1;
        }
        .btn-item {
          position: relative;
          width: 94*@px;
          height: 94*@px;
          .rounded-corners(50%);
          background: #000;
          color: #FFFFFF;
          line-height: 94*@px;
          text-align: center;
          &.btn-item-right {
            float: right;
            margin-left: 20*@px;
          }
          &.btn-item-left {
            float: left;
          }
          &.btn-item-text {
            background: url("../../assets/image/D/d1_icon_message@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-like {
            background: url("../../assets/image/D/d1_icon_love@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            .like-num {
              position: absolute;
              height: auto;
              line-height: 25*@px;
              left: 50%;
              .transform(translateX(-50%));
              top: -30*@px;
              font-size: 23*@px;
              color: #FFFFFF;
              width: 95*@px;
              text-align: center;
              text-shadow: 1px 1px 1px #000;
            }
          }
          &.btn-item-camera {
            background: url("../../assets/image/D/d1_icon_changecam@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-video {
          }
          &.btn-item-tag {
            font-size: 63*@px;
            font-weight: bold;
            background: svg-gradient(to bottom right, #FF1B38, #AE1DD8);
          }
          &.btn-item-share {
            background: url("../../assets/image/D/d1_icon_share_b@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-redbag {
            background: url("../../assets/image/D/d1_icon_redpocket@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
        }
        .hearts {
          position: relative;
          .heart {
            position: absolute;
            width: 80*@px;
            height: 80*@px;
            background: #9D20F6;
            top: -80*@px;
          }
        }
      }
      .section-messages {
        position: absolute;
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -ms-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
        left: 30*@px;
        height: 350*@px;
        width: 560*@px;
        color: #FFFFFF;
        font-size: 31*@px;
        .yellow {
          color: #FFF446;
        }
        .blue {
          color: #00EDE7;
        }
        .gray {
          color: #BABDBE;
        }
        .messages-box {
          .app-scroll();
          width: 100%;
          .message-item {
            overflow: hidden;
            margin-bottom: 10*@px;
            height: 37*@px;
            .nickname-block {
              overflow: hidden;
              float: left;
              height: 37*@px;
              .tag {
                float: left;
                height: 37*@px;
                line-height: 37*@px;
                .rounded-corners(5*@px);
                margin-right: 5*@px;
                font-size: 28*@px;
                .border-box();
                &.tag-vip {
                  padding: 2*@px 5*@px 0;
                  background: #8B8B8B;
                }
                &.tag-level {
                  /*TODO*/
                  padding: 0 3.5*@px;
                  background: #FEC83B;
                }
              }
              .name {
                float: left;
                height: 37*@px;
                line-height: 37*@px;
                text-shadow: 1px 1px 1px #000;
              }
            }
            .content {
              float: left;
              height: 37*@px;
              line-height: 37*@px;
              text-shadow: 1px 1px 1px #000;
              margin-left: 15*@px;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        .btn-tracking {
          display: block;
          height: 66*@px;
          line-height: 66*@px;
          text-align: center;
          text-shadow: 1px 1px 1px #000;
          font-size: 37*@px;
          .rounded-corners(66*@px);
          background: @bg-header;
          width: 395*@px;
          padding-left: 30*@px;
          .border-box();
          margin-top: 20*@px;
          .icon {
            float: left;
            margin-right: 28*@px;
            height: 66*@px;
            line-height: 66*@px;
            font-size: 40*@px;
          }
          .text {
            float: left;
            height: 66*@px;
            line-height: 66*@px;
            width: 280*@px;
            .nowrap();
          }
        }
        .btn-share {
          display: block;
          height: 66*@px;
          line-height: 66*@px;
          text-align: center;
          text-shadow: 1px 1px 1px #000;
          font-size: 37*@px;
          .rounded-corners(66*@px);
          background: rgba(74, 182, 220, 0.8);
          width: 228*@px;
          .border-box();
          margin-top: 20*@px;
          margin-bottom: 10*@px;
          .icon {
            float: left;
            margin-right: 28*@px;
            height: 66*@px;
          }
          .text {
            float: left;
            height: 66*@px;
            line-height: 66*@px;
          }
        }
        .share-message-item {
          overflow: hidden;
          height: 37*@px;
          .nickname-block {
            overflow: hidden;
            float: left;
            height: 37*@px;
            .tag {
              float: left;
              height: 37*@px;
              line-height: 37*@px;
              .rounded-corners(5*@px);
              margin-right: 5*@px;
              font-size: 28*@px;
              .border-box();
              &.tag-vip {
                padding: 2*@px 5*@px 0;
                background: #8B8B8B;
              }
              &.tag-level {
                /*TODO*/
                padding: 0 3.5*@px;
                background: #FEC83B;
              }
            }
            .name {
              float: left;
              height: 37*@px;
              line-height: 37*@px;
              text-shadow: 1px 1px 1px #000;
            }
          }
          .content {
            float: left;
            height: 37*@px;
            line-height: 37*@px;
            text-shadow: 1px 1px 1px #000;
            margin-left: 15*@px;
          }
        }
      }
      .audio-box {
        height: 239*@px;
        padding-top: 37*@px;
        .border-box();
        .percent-box {
          position: relative;
          height: 6*@px;
          background: #FFFFFF;
          width: 100%;
          .percent {
            height: 100%;
            width: 50%;
            background: #B01FF6;
          }
        }
        .audio-body {
          height: 196*@px;
          background: rgba(0, 0, 0, 0.5);
          position: relative;
          .btn-record {
            display: block;
            .block-center();
            border: 12*@px solid #FFFFFF;
            width: 126*@px;
            height: 126*@px;
            background: svg-gradient(to bottom right, #9D20F6, #0021E7);
            .rounded-corners(50%);
          }
        }
      }
    }
    // 弹出效果
    .heart-up-enter-active {
      transition: all 1.5s ease;
    }
    .heart-up-leave-active {
      transition: all .3s ease;
      opacity: 0;
    }
    .heart-up-enter {
      -webkit-transform: translate3d(0, 100%, 0);
      -moz-transform: translate3d(0, 100%, 0);
      -ms-transform: translate3d(0, 100%, 0);
      -o-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
