<template>
  <div id="app-main-live">
    <v-touch class="swift-block"
             :swipeOptions="swipeOptions"
             @swiperight="swiperight($event)"
             @swipeleft="swipeleft($event)">
      <transition name="fade">
        <section class="section-top" v-show="!is_hide_all">
          <div class="left">
            <div class="avatar"
                 :style="{backgroundImage: !!live && 'url('+ live.author_avatar +')'}"
                 @click="showMemberCard"></div>
            <div class="owner-info">
              <div class="nickname">{{live ? live.nickname : ''}}</div>
              <div class="member-num">
                <div class="icon"></div>
                <div class="num">{{live ? live.count_view : 0}}</div>
              </div>
            </div>
            <template v-if="live">
              <a class="btn-tracking"
                 v-if="!live.author_is_following"
                 @click="toggleFollow">追蹤</a>
              <a class="btn-tracking is-tracked"
                 v-if="live.author_is_following"
                 @click="toggleFollow">已追蹤</a>
            </template>
          </div>
          <div class="users">
            <div class="avatar-container">
              <div class="user-avatar"></div>
              <div class="decoration"></div>
            </div>
            <div class="user-avatar"></div>
            <div class="user-avatar"></div>
          </div>
          <a class="btn-close" @click="leaveLive()"></a>
        </section>
      </transition>
      <transition name="fade">
        <div class="top-left-block" v-show="!is_hide_all">
          <router-link class="diamond-block"
                       :to="{name: 'main_live_diamond', params: {id:$route.params.id}}">
            <div class="icon-diamond"></div>
            <div class="num">{{live ? live.count_author_diamond : 0}}</div>
            <div class="icon-caret"></div>
          </router-link>
          <div class="starlight-block">
            <div class="icon-warpper"></div>
            <div class="percent-block">
              <div class="percent" v-if="live"
                   :style="{width: ((live.count_author_starlight % 500) / 5)+'%'}"></div>
              <div class="num">{{live ? live.count_author_starlight % 500 : 0}}/500</div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="top-right-block" v-show="!is_hide_all">
          <div class="right">
            <a class="btn-jewel-box" @click="starbox_display=true"></a>

            <a class="btn-mission" @click="mission_display=true"></a>
            <!--家族头像-->
            <div class="audience-avatar-warpper">
              <a class="audience-avatar">
                <div class="level">Lv 1</div>
              </a>
            </div>
            <!--家族头像 END-->
          </div>

          <a class="btn-activity"></a>

        </div>
      </transition>

      <!--弹幕-->
      <transition name="fade">
        <section class="section-popup-comment" v-show="!is_hide_all">
          <div class="container">
            <!--TODO notice內容過多處理-->
            <transition name="fade">
              <div class="notice" v-if="notice">
                恭喜 Chris，Denka，Kelly，Trina，丫丫抽中 30 金幣
              </div>
            </transition>
            <!--普通弹幕-->
            <div class="popup-normal"
                 v-for="barrage in barrages"
                 :key="barrage"
                 :style="{top: barrage.positionTop}" :ref="barrage.ref">
              <div class="avatar"
                   :style="{backgroundImage: !!barrage && 'url('+barrage.senderAvatarUrl+')'}"></div>
              <div class="right">
                <div class="nickname">
                  <span class="name">{{barrage.senderNickname}}</span>
                  <span class="level">LV.{{barrage.senderLevel}}</span>
                  <span class="vip">{{barrage.senderVip}}</span>
                </div>
                <div class="content">
                  {{barrage.content}}
                </div>
              </div>
            </div>
            <!--普通弹幕 END-->
          </div>
        </section>
      </transition>
      <!--弹幕 END-->


      <blink-star :display="blinkStar_display"
                  @click="toggleBlinkStar"></blink-star>

      <div class="inout-mask"
           v-if="inputBox_display"
           @click="toggleInputBox"></div>
    </v-touch>


    <transition name="fade">
      <section class="section-bottom" v-show="!is_hide_all">
        <!--評論文字區-->
        <section class="section-messages">

          <div class="message-item">
            <span class="tag-system">系统</span>
            <span class="content">
            我們倡導清新綠色直播，
            任何違反wecanleve規範的行爲都將收到相應的懲罰。
          </span>
          </div>

          <div class="message-item">
          <span class="nickname-block">
            <span class="name blue">Kevin Chiu</span>
            <span class="tag tag-level">LV.20</span>
            <span class="tag tag-vip">2</span>
          </span>
            <span class="content">已追蹤主播</span>

            <a class="btn-tracking">
              <span class="icon">+</span>
              追蹤
            </a>

          </div>

          <div class="message-item">
          <span class="nickname-block">
            <span class="name red">Kevin Chiu</span>
            <span class="tag tag-level">LV.20</span>
            <span class="tag tag-vip">2</span>
          </span>
            <span class="content">已分享主播</span>

            <a class="btn-share" @click="share">
              <span class="icon"></span>
              分享
            </a>
          </div>

          <div class="message-item">
          <span class="nickname-block">
            <span class="name purple">Kevin Chiu</span>
            <span class="tag tag-level">LV.20</span>
            <span class="tag tag-vip">2</span>
          </span>
            <span class="content">你好可愛喔！</span>
          </div>

          <div class="message-item">
          <span class="nickname-block">
            <span class="name ">Kevin Chiu</span>
            <span class="tag tag-level">LV.20</span>
            <span class="tag tag-vip">2</span>
          </span>
            <span class="content">你好可愛喔！</span>
          </div>

        </section>
        <!--評論文字區 END-->


        <!--底部右邊按鈕-->
        <ul class="btn-lists" v-if="!inputBox_display && !audioBox_display">

          <li class="btn-item btn-item-left btn-item-text" @click="toggleInputBox"></li>

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
            <li class="btn-item btn-item-right btn-item-audio"
                @click="toggleAudioBox"></li>
          </template>

          <li class="btn-item btn-item-right btn-item-share" @click="share"></li>
        </ul>
        <!--底部右邊按鈕 END-->

        <input-item :display="inputBox_display" @input="submit"></input-item>

        <div class="audio-box" v-if="audioBox_display">
          <div class="text">按住至少3秒</div>
          <div class="percent-box">
            <div class="percent"></div>
          </div>
          <div class="audio-body">
            <v-touch tag="a"
                     @press="beginRecord($event)"
                     @pressup="stopRecord()"
                     @panend="stopRecord()"
                     @panup="stopRecord()"
                     class="btn-record"></v-touch>
            <a class="btn-cancel" @click="toggleAudioBox">取消</a>
          </div>
        </div>

      </section>
    </transition>

    <transition name="slide-down-up">
      <div class="bottom-nav-open"
           v-show="bottom_nav_btn_display && !bottom_nav_display"
           @click="toggleBottomNav">
        <span class="icon"></span>
      </div>
    </transition>

    <transition name="slide-down-up">
      <div class="bottom-nav" v-if="bottom_nav_display">
        <div class="btn-hide-bottom-nav"
             @click="toggleBottomNav">
          <span class="icon"></span>
        </div>
        <div class="nav-container">
          <div class="nav-item">
            <div class="avatar"></div>
            <div class="right">
              <div class="nickname">ICEKING</div>
              <div class="account">wecanlive賬號：2342342342</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <member-card :display="memberCard_display"
                 :choice="choice"
                 :item="authorMember"
                 v-if="authorMember"
                 @click="toggleMemberCard"
                 @pick="choicePick"></member-card>


    <live-starbox :display="starbox_display" @click="starbox()"></live-starbox>

    <live-giftbag :display="giftbag_display" @click="giftbag()"></live-giftbag>

    <live-redbag :display="redbag_display" @click="redbag()"></live-redbag>

    <live-mission :display="mission_display" @click="mission()"></live-mission>



    <transition :name="transitionNameLive">
      <router-view class="live-child-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        transitionNameLive: 'slide-left',
        swipeOptions: {
          direction: 'horizontal',
        },
        choice: [
          { text: '禁言', value: 0 },
          { text: '加入封鎖清單', value: 1 },
          { text: '舉報', value: 2 },
        ],
        barrages: [],
        is_hide_all: false,
        memberCard_display: false,
        bottom_nav_btn_display: false,
        bottom_nav_display: false,
        audioBox_display: false,
        starbox_display: false,
        giftbag_display: false,
        redbag_display: false,
        mission_display: false,
        notice: true,
        inputBox: false,
        blinkStar_display: false,
        inputBox_display: false,
        live: null,
        authorMember: null,
        live_watch_log: [],
      };
    },
    beforeRouteUpdate(to, from, next) {
      const toDepth = to.path.split('/')[3] ? to.path.split('/')[3].length : 0;
      const fromDepth = from.path.split('/')[3] ? from.path.split('/')[3].length : 0;
      this.transitionNameLive = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    },
    mounted() {
    },
    computed: {
      is_owner() {
        const vm = this;
        return vm.live ? Number(vm.me.id) === Number(vm.live.author_id) : false;
      },
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Live').get({
          id: vm.$route.params.id,
          fields: 'author_id,nickname,author_avatar,signature,' +
          'count_view,count_following_author,push_url,play_url,' +
          'author_is_following,count_author_diamond,count_author_starlight,' +
          'count_author_followed',
        }).then((resp) => {
          console.log(resp.body);
          vm.live = resp.body;
          vm.authorMember = {
            id: vm.live.author_id,
            nickname: vm.live.nickname,
            avatar_url: vm.live.author_avatar,
            signature: vm.live.signature,
            following_count: vm.live.count_following_author,
            followed_count: vm.live.count_author_followed,
            is_followed: vm.live.author_is_following,
          };
          if (window.TencentMLVB) {
            if (vm.is_owner) {
              // 主播的話開啓推流
              window.TencentMLVB.startPush(vm.live.push_url);
            } else {
              // 觀衆的話開啓播放
              window.TencentMLVB.startPlay(vm.live.play_url);
            }
          }
        });
        //
        vm.api('LiveWatchLog').save({
          action: 'start_watch_log',
        }, {
          live: vm.$route.params.id,
        }).then((resp) => {
          vm.live_watch_log = resp.data;
        });
      },
      submit(valObj) {
        const vm = this;
        if (valObj.isBarrage) {
          const top = Math.random() * 12.48;
          const barrageid = Math.random() * 10000;
          const barrage = {
            content: valObj.content,
            positionTop: `${top}rem`,
            senderAvatarUrl: '',
            senderNickname: '哈哈哈哈',
            senderLevel: 15,
            senderVip: 2,
            ref: `barrage${barrageid}`,
          };
          vm.barrages.push(barrage);
          vm.$nextTick(() => {
            setTimeout(() => {
              vm.$refs[barrage.ref][0].style.transform = 'translate3d(-20rem,0,0)';
              /* 监听 transition! */
              vm.$refs[barrage.ref][0].addEventListener('webkitTransitionEnd', () => {
                vm.barrages.splice(vm.barrages.indexOf(barrage), 1);
              });
              vm.$refs[barrage.ref][0].addEventListener('transitionend', () => {
                vm.barrages.splice(vm.barrages.indexOf(barrage), 1);
              });
            }, 0);
          });
        }
      },
      toggleFollow() {
        const vm = this;
        if (vm.live) {
          vm.api('Member').save({
            action: 'follow',
            id: vm.live.author_id,
          }, {}).then(() => {
            vm.live.is_followed = !vm.live.is_followed;
          }, () => {
          });
        }
      },
      beginRecord(e) {
        e.preventDefault();
      },
      stopRecord() {
      },
      leaveLive() {
        const vm = this;
        if (vm.me.id === vm.live.author_id) {
          vm.confirm('是否結束直播？').then(() => {
            vm.$router.push({ name: 'main_index' });
          });
        } else {
          vm.confirm('是否離開當前直播間？').then(() => {
            if (vm.live_watch_log.length !== 0) {
              vm.api('LiveWatchLog').save({
                action: 'leave_live',
              }, {
                live: vm.$route.params.id,
              }).then(() => {
                vm.$router.push({ name: 'main_index' });
              });
            }
          });
        }
      },
      swiperight(e) {
        const vm = this;
        if (!vm.blinkStar_display) {
          vm.is_hide_all = true;
          vm.bottom_nav_btn_display = true;
        } else {
          vm.blinkStar_display = false;
          vm.is_hide_all = false;
        }
      },
      swipeleft(e) {
        const vm = this;
        if (vm.is_hide_all) {
          vm.is_hide_all = false;
          vm.bottom_nav_btn_display = false;
          vm.bottom_nav_display = false;
          vm.inputBox_display = false;
        } else {
          vm.blinkStar_display = true;
          vm.is_hide_all = true;
        }
      },
      toggleBottomNav() {
        this.bottom_nav_display = !this.bottom_nav_display;
      },
      showMemberCard() {
        this.memberCard_display = true;
      },
      toggleMemberCard(value) {
        this.memberCard_display = value;
      },
      choicePick(value) {
        // TODO 根據返回的值執行
        console.log(value);
      },
      toggleInputBox() {
        const vm = this;
        vm.inputBox_display = !vm.inputBox_display;
      },
      toggleBlinkStar(value) {
        this.blinkStar_display = value;
      },
      showHearts() {
      },
      toggleAudioBox() {
        const vm = this;
        vm.audioBox_display = !vm.audioBox_display;
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
      mission(value) {
        this.mission_display = value;
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
    padding: @height-status-bar 0 0;
    .border-box();
    &.not-status-bar {
      padding-top: 0;
    }
    .swift-block {
      height: 100%-@height-status-bar;
    }
    .inout-mask {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .section-top {
      padding: 0 30*@px;
      height: 88*@px;
      overflow: hidden;
      .border-box();
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
            font-size: 25*@px;
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
          &.is-tracked {
            background: #00BBEC;
          }
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
      padding-left: 30*@px;
      .border-box();
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
          color: #FFFFFF;
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
      margin-right: 30*@px;
      position: relative;
      float: right;
      width: 220*@px;
      margin-top: 30*@px;
      .right {
        float: right;
        margin-left: 30*@px;
        width: 94*@px;
      }
      a {
        float: right;
        width: 94*@px;
        height: 94*@px;
        margin-bottom: 26*@px;
        &.btn-activity {
          background: url("../../assets/image/D/d1_icon_event@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        &.btn-jewel-box {
          background: url("../../assets/image/D/d1_icon_box@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        &.btn-mission {
          width: 94*@px;
          height: 101*@px;
          background: url("../../assets/image/D/d1_icon_yuanqi@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
      }
      .audience-avatar-warpper {
        float: right;
        width: 94*@px;
        height: 94*@px;
        .audience-avatar {
          position: relative;
          width: 94*@px;
          height: 94*@px;
          .rounded-corners(50%);
          background: #000 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
          .level {
            position: absolute;
            left: 50%;
            bottom: 0;
            height: 24*@px;
            line-height: 24*@px;
            width: 66*@px;
            .rounded-corners(24*@px);
            .transform(translateX(-50%));
            text-align: center;
            color: #FFFFFF;
            font-size: 18*@px;
            background: svg-gradient(to right, #F4A246, #FF8534);
          }
        }
      }
    }

    .section-popup-comment {
      position: absolute;
      top: 220*@px;
      left: 0;
      width: 100%;
      height: 540*@px;
      overflow: hidden;
      .container {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .notice {
        height: 47*@px;
        width: 100%;
        line-height: 47*@px;
        text-align: center;
        overflow: hidden;
        color: #FFFFFF;
        font-size: 25*@px;
        background: rgba(238, 144, 99, 0.7);
      }
      .popup-normal {
        position: absolute;
        height: 72*@px;
        overflow: hidden;
        color: #FFFFFF;
        right: 0;
        padding-right: 28*@px;
        background: rgba(0, 0, 0, 0.4);
        .rounded-corners(72*@px);
        -webkit-transform: translate3d(100%, 0, 0);
        -moz-transform: translate3d(100%, 0, 0);
        -ms-transform: translate3d(100%, 0, 0);
        -o-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        -webkit-transition: all 4s linear;
        -moz-transition: all 4s linear;
        -ms-transition: all 4s linear;
        -o-transition: all 4s linear;
        transition: all 4s linear;
        .avatar {
          float: left;
          height: 68*@px;
          width: 68*@px;
          margin: 2*@px 0 0 2*@px;
          .rounded-corners(50%);
          background: #000 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        .right {
          float: left;
          margin-left: 8*@px;
          padding-top: 3*@px;
          .nickname {
            height: 32*@px;
            line-height: 32*@px;
            font-size: 24*@px;
            .level {
              display: inline-block;
              width: 86*@px;
              height: 32*@px;
              line-height: 32*@px;
              background: url("../../assets/image/B1/icon_crown@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              color: #0928DF;
              font-size: 18*@px;
              text-indent: 36*@px;
              vertical-align: text-bottom;
            }
            .vip {
              display: inline-block;
              vertical-align: text-bottom;
              height: 32*@px;
              line-height: 32*@px;
              width: 62*@px;
              color: #5E21EE;
              font-size: 20*@px;
              text-indent: 43*@px;
              background: url("../../assets/image/B1/icon_vip@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              .border-box();
              padding-top: 2*@px;
            }
          }
          .content {
            font-size: 22*@px;
          }
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
          &.btn-item-gift {
            background: url("../../assets/image/D/d1_icon_gift@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-vidio {
            background: url("../../assets/image/D/d1_icon_video@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-audio {
            background: url("../../assets/image/D/d1_icon_mic@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
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
        height: 400*@px;
        width: 550*@px;
        color: #FFFFFF;
        font-size: 28*@px;
        .app-scroll();
        &::-webkit-scrollbar {
          display: none;
        }
        .yellow {
          color: #FFF446;
        }
        .blue {
          color: #00EDE7;
        }
        .gray {
          color: #BABDBE;
        }
        .red {
          color: #FF0017;
        }
        .purple {
          color: #A41AC7;
        }
        .message-item {
          margin-bottom: 10*@px;
          line-height: 44*@px;
          .tag-system {
            display: inline-block;
            height: 44*@px;
            width: 80*@px;
            line-height: 44*@px;
            text-align: center;
            color: #000;
            font-size: 24*@px;
            background: #FFFFFF;
            .rounded-corners(44*@px);
          }
          .nickname-block {
            .tag {
              display: inline-block;
              height: 32*@px;
              line-height: 32*@px;
              .border-box();
              vertical-align: middle;
              &.tag-vip {
                width: 62*@px;
                color: #5E21EE;
                font-size: 22*@px;
                background: url("../../assets/image/B1/icon_vip@3x.png") 50% 50% no-repeat;
                background-size: 100%;
                padding-left: 40*@px;
              }
              &.tag-level {
                width: 86*@px;
                font-size: 16*@px;
                color: #0021E6;
                padding-left: 38*@px;
                padding-top: 2*@px;
                background: url("../../assets/image/B1/icon_huangguan@3x.png") 50% 50% no-repeat;
                background-size: 100%;
              }
            }
            .name {
              text-shadow: 1px 1px 1px #000;
            }
          }
          .content {
            text-shadow: 1px 1px 1px #000;
            margin-left: 5*@px;
          }
          &:last-child {
            margin-bottom: 0;
          }
          .btn-tracking {
            display: block;
            height: 50*@px;
            line-height: 50*@px;
            text-align: center;
            font-size: 29*@px;
            .rounded-corners(50*@px);
            width: 160*@px;
            .border-box();
            background: url("../../assets/image/D/d1_btn_track_1@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            margin-top: 5*@px;
            .icon {
              .border-box();
              display: inline-block;
              height: 50*@px;
              line-height: 50*@px;
              font-size: 40*@px;
              vertical-align: middle;
            }
          }
          .btn-share {
            display: block;
            height: 50*@px;
            line-height: 50*@px;
            text-align: center;
            font-size: 29*@px;
            .rounded-corners(50*@px);
            width: 160*@px;
            .border-box();
            margin-top: 5*@px;
            background: url("../../assets/image/D/d1_btn_share@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            .icon {
              display: inline-block;
              width: 26*@px;
              height: 26*@px;
              background: url("../../assets/image/D/d1_icon_share_s@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
        }
      }
      .audio-box {
        height: 239*@px;
        padding-top: 37*@px;
        .border-box();
        position: relative;
        .text {
          width: 100%;
          position: absolute;
          font-size: 30*@px;
          color: #FFFFFF;
          text-align: center;
          left: 0;
          top: -15*@px;
        }
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
          .btn-cancel {
            position: absolute;
            font-size: 38*@px;
            color: #FFFFFF;
            left: 103*@px;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
          }
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

    .bottom-nav-open {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 70*@px;
      line-height: 70*@px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      z-index: 2;
      .icon {
        display: inline-block;
        width: 66*@px;
        height: 66*@px;
        background: url("../../assets/image/D/d2_1_icon_retanup@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
    .bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      .btn-hide-bottom-nav {
        height: 70*@px;
        line-height: 70*@px;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        .icon {
          display: inline-block;
          width: 66*@px;
          height: 66*@px;
          background: url("../../assets/image/D/d2_1_icon_retandown@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .nav-container {
        padding-left: 30*@px;
        max-height: 400*@px;
        .app-scroll();
        .border-box();
        background: rgba(0, 0, 0, 0.5);
        &::-webkit-scrollbar {
          display: none;
        }
        .nav-item {
          height: 160*@px;
          .border-box();
          border-bottom: 1px solid #8C8C8C;
          overflow: hidden;
          .avatar {
            float: left;
            width: 120*@px;
            height: 120*@px;
            .rounded-corners(50%);
            margin: 20*@px 20*@px 0 0;
            background: #000 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
          }
          .right {
            float: left;
            width: 550*@px;
            margin-top: 45*@px;
            .nickname {
              color: #FFFFFF;
              font-size: 30*@px;
              .nowrap();
            }
            .account {
              font-size: 30*@px;
              color: #B6B9BA;
              .nowrap();
            }
          }
        }
      }
    }
    .live-child-view {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      z-index: 9;
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
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

    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      .transform(translate3d(50%, 0, 0));
    }
    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      .transform(translate3d(-50%, 0, 0));
    }

    .list-enter-active, .list-leave-active {
      -webkit-transition: all 1.5s;
      -moz-transition: all 1.5s;
      -ms-transition: all 1.5s;
      -o-transition: all 1.5s;
      transition: all 1.5s;
    }
    .list-enter {
      -webkit-transform: translate3d(300%, 0, 0);
      -moz-transform: translate3d(300%, 0, 0);
      -ms-transform: translate3d(300%, 0, 0);
      -o-transform: translate3d(300%, 0, 0);
      transform: translate3d(300%, 0, 0);
    }

  }
</style>
