<template>
  <div id="app-main-live"
       :class="{'not-status-bar': !overlapStatusBar}">
    <v-touch class="swift-block"
             :swipeOptions="swipeOptions"
             @swiperight="swiperight($event)"
             @swipeleft="swipeleft($event)"
             @swipeup="swipeup($event)"
             @swipedown="swipedown($event)">
      <transition name="fade">
        <section class="section-top" v-show="!is_hide_all">
          <div class="left" v-if="author_member">
            <div class="avatar"
                 :style="{backgroundImage: !!(author_member && author_member.avatar_url)
                 && 'url('+author_member.avatar_url+')'}"
                 @click="showMemberCard"></div>
            <!--:style="{backgroundImage: !!live && !$cordova && 'url('+ live.author_avatar +')'}"-->
            <div class="owner-info">
              <div class="nickname">
                {{author_member.member_avatar}}
                {{live ? live.nickname : ''}}
              </div>
              <div class="member-num">
                <div class="icon"></div>
                <div class="num">{{live ? live.count_view : 0}}</div>
              </div>
            </div>
            <template v-if="live && !is_owner">
              <a class="btn-tracking"
                 v-if="!author_member.is_following"
                 @click="toggleFollow">追蹤</a>
              <a class="btn-tracking is-tracked"
                 v-else
                 @click="toggleFollow">已追蹤</a>
            </template>
          </div>
          <div class="users">
            <template v-for="(watch_log, i) in watch_logs">
              <div class="avatar-container" v-if="i===0">
                <div class="user-avatar"
                     :style="{backgroundImage: 'url('+watch_log.author_avatar_url+')'}"></div>
                <div class="decoration"></div>
              </div>
              <div class="user-avatar" v-else-if="i<3"
                   :style="{backgroundImage: 'url('+watch_log.author_avatar_url+')'}"></div>
            </template>
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
              <template v-if="live.author===me.id">
                <div class="percent" v-if="live"
                     :style="{width: ((me.star_index_receiver_balance % 500) / 5)+'%'}"></div>
                <div class="num">{{me.star_index_receiver_balance}}/500</div>
              </template>
              <template v-else>
                <div class="percent" v-if="live"
                     :style="{width: ((me.star_index_sender_balance % 500) / 5)+'%'}"></div>
                <div class="num">{{me.star_index_sender_balance}}/500</div>
              </template>
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
            <!--<div class="audience-avatar-warpper">-->
              <!--<a class="audience-avatar">-->
                <!--<div class="level">Lv 1</div>-->
              <!--</a>-->
            <!--</div>-->
            <!--家族头像 END-->
          </div>

          <!--活动按钮-->
          <!--<a class="btn-activity"></a>-->

        </div>
      </transition>

      <!--弹幕-->
      <transition name="fade">
        <section class="section-popup-comment" v-show="!is_hide_all">
          <div class="container">
            <!--TODO notice內容過多處理-->
            <!-- TODO: D2-9 活動跑馬燈 -->
            <!--<transition name="fade">-->
            <!--<div class="notice" v-if="notice">-->
            <!--恭喜 Chris，Denka，Kelly，Trina，丫丫抽中 30 金幣-->
            <!--</div>-->
            <!--</transition>-->
            <!--普通弹幕-->
            <div class="popup-normal"
                 v-for="barrage in barrages"
                 :key="barrage"
                 :style="{top: barrage.positionTop}"
                 :ref="'barrage_'+barrage.id">
              <div class="avatar"
                   :style="{backgroundImage: !!(barrage && barrage.author_avatar_url)
                   && 'url('+barrage.author_avatar_url+')'}"></div>
              <div class="right">
                <div class="nickname">
                  <span class="name">{{barrage.author_nickname}}</span>
                  <span class="level">lv.{{barrage.author_level}}</span>
                  <span class="vip">{{barrage.author_vip_level}}</span>
                </div>
                <div class="content">{{barrage.content}}</div>
              </div>
            </div>
            <!--普通弹幕 END-->

            <!--礼物效果-->
            <div v-for="msg in gift_barrages"
                 :ref="'gift_'+msg.data.prizeOrder.id"
                 class="popup-gift">
              <!-- TODO: 此處實現的是小跑馬效果，還需要實現中跑馬和大跑馬 -->
              <div class="gift-icon">
                <!--:style="{backgroundImage: 'url(' + msg.data.prizeOrder.prize_marquee_url + ')'}">-->
                <img :src="msg.data.prizeOrder.prize_marquee_url"/>
              </div>
              <div class="gift-author">
                <div class="avatar"
                     :style="{backgroundImage: 'url(' + msg.sender.member_avatar + ')'}"></div>
                <div class="nickname">
                  <div class="name">{{ msg.sender.member_nickname }}</div>
                  <div class="level">lv.{{ msg.sender.member_level }}</div>
                  <div class="vip">{{ msg.sender.member_vip_level }}</div>
                </div>
                <div class="gift-name">送出{{ msg.data.prizeOrder.prize_name }}</div>
                <div class="gift-count">
                  <div class="add-icon"></div>
                  <div class="num-icon" v-if="parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) > 0"
                       :class="{'num-icon-1' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 1,
                       'num-icon-2' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 2,
                       'num-icon-3' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 3,
                       'num-icon-4' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 4,
                       'num-icon-5' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 5,
                       'num-icon-6' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 6,
                       'num-icon-7' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 7,
                       'num-icon-8' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 8,
                       'num-icon-9' : parseInt(msg.data.prizeOrder.prize_transaction_amount / 10, 0) == 9,
                       }">
                  </div>
                  <div class="num-icon"
                       :class="{'num-icon-1' : msg.data.prizeOrder.prize_transaction_amount % 10 == 1,
                       'num-icon-2' : msg.data.prizeOrder.prize_transaction_amount % 10 == 2,
                       'num-icon-3' : msg.data.prizeOrder.prize_transaction_amount % 10 == 3,
                       'num-icon-4' : msg.data.prizeOrder.prize_transaction_amount % 10 == 4,
                       'num-icon-5' : msg.data.prizeOrder.prize_transaction_amount % 10 == 5,
                       'num-icon-6' : msg.data.prizeOrder.prize_transaction_amount % 10 == 6,
                       'num-icon-7' : msg.data.prizeOrder.prize_transaction_amount % 10 == 7,
                       'num-icon-8' : msg.data.prizeOrder.prize_transaction_amount % 10 == 8,
                       'num-icon-9' : msg.data.prizeOrder.prize_transaction_amount % 10 == 9,
                  }">
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </transition>
      <!--弹幕 END-->

      <blink-star :display="blinkStar_display"
                  v-if="author_member"
                  :live="live"
                  @click="toggleBlinkStar"
                  :member="author_member"></blink-star>

      <div class="input-mask"
           v-if="show_input_box"
           @click="show_input_box=false"></div>
    </v-touch>


    <transition name="fade">
      <section class="section-bottom" v-show="!is_hide_all">
        <!--評論文字區-->
        <section class="section-messages" @click="show_input_box=false">
          <ul class="message-list">
            <li class="message-item" v-for="message in messages">
              <template v-if="message.type==='comment'">
                <div class="nickname-block">
                  <span class="name"
                        :class="{purple:me.id===message.sender.id,
                        yellow:me.id!==message.sender.id}">{{message.sender.member_nickname}}</span>
                  <span class="tag tag-level">lv.{{message.sender.member_level}}</span>
                  <span class="tag tag-vip"
                        v-if="message.sender.member_vip_level">{{message.sender.member_vip_level}}</span>
                </div>
                <div class="content" v-html="emojiText(message.data.comment.content)"></div>
              </template>
              <template v-else-if="message.type==='follow'">
                <div class="nickname-block">
                  <span class="name blue">{{message.user.member_nickname}}</span>
                  <span class="tag tag-level">lv.{{message.user.member_level}}</span>
                  <span class="tag tag-vip"
                        v-if="message.user.member_vip_level">{{message.user.member_vip_level}}</span>
                </div>
                <div class="content">已追蹤主播</div>
                <a class="btn-tracking" v-if="!is_owner && !author_member.is_following"
                   @click="toggleFollow">+ 追蹤</a>
              </template>
              <template v-else-if="message.type==='share'">
                <div class="nickname-block">
                  <span class="name red">{{message.user.member_nickname}}</span>
                  <span class="tag tag-level">lv.{{message.user.member_level}}</span>
                  <span class="tag tag-vip"
                        v-if="message.user.member_vip_level">{{message.user.member_vip_level}}</span>
                </div>
                <div class="content">已分享主播</div>
                <a class="btn-share" @click="makeShare()">
                  <span class="icon"></span>
                  分享
                </a>
              </template>
              <template v-else-if="message.type==='notify'">
                <div class="content">{{message.data.content}}</div>
              </template>
              <template v-else-if="message.type==='system'">
                <span class="tag-system">系统</span>
                <div class="content">{{message.data.content}}</div>
              </template>
            </li>

          </ul>
        </section>
        <!--評論文字區 END-->


        <!--底部右邊按鈕-->
        <ul class="btn-lists" v-show="!show_input_box && !show_audio_box">

          <li class="btn-item btn-item-left btn-item-text" @click="show_link_mic=true"></li>

          <template v-if="is_owner">
            <li class="btn-item btn-item-right btn-item-redbag" @click="redbag_display=true"></li>
            <li class="btn-item btn-item-right btn-item-tag">#</li>
            <li class="btn-item btn-item-right btn-item-camera" @click="switchCamera()"></li>
            <li class="btn-item btn-item-right btn-item-video"></li>
          </template>

          <template v-else>
            <li class="btn-item btn-item-right btn-item-like"
                ref="likeBox"
                @click="sendLike()">
              <!--<div class="moving-heart"></div>-->
              <div class="like-num" v-if="live && live.like_count">{{live.like_count}}</div>
            </li>
            <li class="btn-item btn-item-right btn-item-gift" @click="showGiftBag()"></li>
            <li class="btn-item btn-item-right btn-item-video"></li>
            <li class="btn-item btn-item-right btn-item-audio" @click="toggleAudioBox"></li>
          </template>

          <li class="btn-item btn-item-right btn-item-share" @click="makeShare()"></li>
        </ul>
        <!--底部右邊按鈕 END-->

        <input-item :display="show_input_box" @input="submit"></input-item>

        <div class="audio-box" v-if="show_audio_box">
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


        <div class="link-mc" v-if="show_link_mic">
          <div class="link-status">與主播連麥
            <div class="down-icon" @click="show_link_mic=false"></div>
          </div>
          <a class="link-btn link-start"></a>
          <a class="link-btn link-cancel"></a>
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
            <div class="avatar"
                 :style="{backgroundImage: !!(author_member && author_member.author_avatar)
                 && 'url('+author_member.author_avatar+')'}"></div>
            <div class="right">
              <div class="nickname">{{author_member.nickname}}</div>
              <div class="account">WECANLIVE賬號：{{author_member.user}}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <member-card :display="member_card_display"
                 :choice="choice"
                 :item="author_member"
                 v-if="author_member"
                 @click="toggleMemberCard"
                 @pick="choicePick"></member-card>

    <live-star-box :display="starbox_display"
                   :item="author_member"
                   @click="starbox()"></live-star-box>

    <!-- apply 會返回一個禮物流水對象 -->
    <live-gift-bag :display="giftbag_display"
                   :live="live"
                   @hide="giftbag_display=false"
                   @apply="sendGift"></live-gift-bag>

    <live-red-bag :display="redbag_display"
                  @click="redbag"></live-red-bag>

    <live-mission :display="mission_display"
                  @click="mission"></live-mission>

    <transition :name="transitionNameLive">
      <router-view class="live-child-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  import twemoji from 'twemoji';

  export default {
    name: 'main_live',
    data() {
      return {
        model: 'Live',
        transitionNameLive: 'slide-left',
        swipeOptions: {
//          direction: 'horizontal',
        },
        choice: [
          { text: '禁言', value: 0 },
          { text: '加入封鎖清單', value: 1 },
          { text: '舉報', value: 2 },
        ],
        messages: [],
        barrages: [],
        is_hide_all: false,
        bottom_nav_btn_display: false,
        member_card_display: false,
        bottom_nav_display: false,
        blinkStar_display: false,
        show_audio_box: false,
        show_input_box: false,
        show_link_mic: false,
        starbox_display: false,
        giftbag_display: false,
        redbag_display: false,
        notice: true,
        mission_display: false,
        inputBox: false,
        live: null,
        my_watch_log: null,
        watch_logs: [],
        author_member: null,
        gift_barrages: [],
      };
    },
    beforeRouteUpdate(to, from, next) {
      const toDepth = to.path.split('/')[3] ? to.path.split('/')[3].length : 0;
      const fromDepth = from.path.split('/')[3] ? from.path.split('/')[3].length : 0;
      this.transitionNameLive = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    },
    destroyed() {
      if (window.TencentMLVB) {
        document.body.style.background = 'white';
        window.TencentMLVB.stopPush(
//          success => {
//            alert(success);
//          },
//          error => {
//            alert(error);
//          }
        );
        window.TencentMLVB.stopPlay(
//          success => {
//            alert(success);
//          },
//          error => {
//            alert(error);
//          }
        );
      }
    },
    mounted() {
      const vm = this;
      document.body.style.background = 'transparent';
      vm.waitFor(vm, 'live').then(() => {
        vm.sendNotify(`${vm.me.nickname} 進入了房間`);
      });
    },
    computed: {
      is_owner() {
        const vm = this;
        return vm.live ? Number(vm.me.id) === Number(vm.live.author) : false;
      },
    },
    methods: {
      reload() {
        const vm = this;
        // 重新加載用戶信息
        vm.authenticate(true);
        vm.api('Live').get({
          id: vm.$route.params.id,
          fields: 'author,nickname,author_avatar,signature,' +
          'count_view,count_following_author,push_url,play_url,' +
          'author_is_following,count_author_diamond,count_author_starlight,' +
          'count_author_followed,like_count',
        }).then((resp) => {
          vm.live = resp.data;
          vm.api('Member').get({ id: vm.live.author }).then(resp2 => {
            vm.author_member = resp2.data;
          });
          if (window.TencentMLVB) {
            if (vm.is_owner) {
              // 主播的話開啓推流
              window.TencentMLVB.startPush(
                vm.live.push_url,
//                success => {
//                  alert(success);
//                },
//                error => {
//                  alert(error);
//                }
              );
            } else {
              // 觀衆的話開啓播放
              window.TencentMLVB.startPlay(
                vm.live.play_url,
                window.TencentMLVB.PLAY_URL_TYPE.PLAY_TYPE_LIVE_FLV,
                (success) => {
//                  alert(success);
                },
                (error) => {
//                  alert(error);
                },
              );
            }
          }
        });
        if (!vm.is_owner) {
          // 观众观看记录
          vm.api('LiveWatchLog').save({
            action: 'start_watch_log',
          }, {
            live: vm.$route.params.id,
          }).then((log) => {
            vm.my_watch_log = log.data;
          });
        }
        // 加載觀看記錄列表
        vm.loadWatchLogs();
      },
      loadWatchLogs() {
        const vm = this;
        vm.api('Live').get({
          id: vm.$route.params.id,
          action: 'get_watch_logs',
        }, {
          page: 1,
          page_size: 10,
          ordering: 'diamonds',
        }).then(resp => {
          vm.watch_logs = resp.data;
        });
      },
      submit(valObj) {
        const vm = this;
        if (!valObj.content) return;
        if (valObj.isBarrage) {  // 弹幕消息
          vm.sendBarrage(valObj.content);
        } else {  // 普通消息
          vm.sendComment(valObj.content);
        }
      },
      beginRecord(e) {
        e.preventDefault();
      },
      stopRecord() {
      },
      leaveLive() {
        const vm = this;
        if (vm.is_owner) {
          vm.confirm('是否結束直播？').then(() => {
            vm.api('Live').save({
              action: 'live_end',
              id: vm.$route.params.id,
            }, {}).then((resp) => {
              if (resp.data) {
                vm.$router.replace({ name: 'main_live_end' });
              }
            });
          });
        } else {
          vm.confirm('是否離開當前直播間？').then(() => {
            vm.api('LiveWatchLog').save({
              action: 'leave_live',
            }, {
              live: vm.$route.params.id,
            }).then(() => {
              vm.$router.replace({ name: 'main_index' });
            });
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
          vm.show_input_box = false;
        } else {
          vm.blinkStar_display = true;
          vm.is_hide_all = true;
        }
      },
      toggleBottomNav() {
        this.bottom_nav_display = !this.bottom_nav_display;
      },
      showMemberCard() {
        this.member_card_display = true;
      },
      toggleMemberCard(value) {
        this.member_card_display = value;
      },
      choicePick(value) {
        // TODO 根據返回的值執行
        console.log(value);
      },
      toggleBlinkStar(value) {
        this.blinkStar_display = value;
      },
      toggleAudioBox() {
        const vm = this;
//        vm.show_audio_box = !vm.show_audio_box;
        vm.show_link_mic = true;
      },
      starbox(value) {
        this.starbox_display = value;
      },
      redbag(value) {
        this.redbag_display = value;
      },
      mission(value) {
        const vm = this;
        vm.mission_display = false;
        if (value === 'share') {
          vm.share();
        }
      },
      showGiftBag() {
        const vm = this;
        vm.authenticate(true).then(() => {
          vm.giftbag_display = true;
        });
      },
      /**
       * 点击发送一个赞
       */
      sendLike() {
        const vm = this;
        vm.sendIM(`live_${vm.$route.params.id}`, { type: 'like' });
        // 即时显示动效避免延迟影响用户体验
        vm.showLikeEffect();
        // 定时 commit 这个数量到后台
        // 5秒内多次点击集中到一次提交
        vm.like_count_buffer = (vm.like_count_buffer || 0) + 1;
        if (vm.like_count_commit_timer) {
          clearTimeout(vm.like_count_commit_timer);
        }
        vm.like_count_commit_timer = setTimeout(() => {
          const count = vm.like_count_buffer;
          vm.like_count_buffer = 0;
          vm.like_count_commit_timer = null;
          vm.api().patch({
            id: vm.$route.params.id,
            action: 'add_like_count',
          }, { count });
        }, 5000);
      },
      /**
       * 某个用户点出一个红心赞，由消息到达路由触发
       */
      showLike(effect = true) {
        const vm = this;
        if (effect) vm.showLikeEffect();
      },
      /**
       * 显示红心飞出的动效
       */
      showLikeEffect() {
        const vm = this;
//        console.log('有人点赞了啊');
        vm.live.like_count += 1;
        // TODO: （动画效果有待优化）
        const heart = document.createElement('div');
        heart.className = 'moving-heart';
        heart.style.left = `${Math.random() * 50}%`;
        vm.$refs.likeBox.appendChild(heart);
        setTimeout(() => {
          vm.$refs.likeBox.removeChild(heart);
        }, 2000);
      },
      sendComment(content) {
        const vm = this;
        vm.api().save({
          id: vm.$route.params.id,
          action: 'make_comment',
        }, { content }).then(resp => {
          vm.sendIM(`live_${vm.$route.params.id}`, {
            type: 'comment',
            comment: resp.data,
          });
        });
      },
      showComment(comment) {
        const vm = this;
        vm.messages.push({ type: 'comment', ...comment });
      },
      sendBarrage(content) {
        const vm = this;
        vm.api().save({
          id: vm.$route.params.id,
          action: 'make_barrage',
        }, { content }).then(resp => {
          const barrage = resp.data;
          barrage.positionTop = `${Math.random() * 12.48}rem`;
          vm.sendIM(`live_${vm.$route.params.id}`, { type: 'barrage', barrage });
        });
      },
      showBarrage(barrage) {
        const vm = this;
        vm.barrages.push(barrage.data.barrage);
        setTimeout(() => {
          vm.barrages.splice(vm.barrages.indexOf(barrage.data.barrage), 1);
        }, 4000);
      },
      /**
       * 切换追踪或者不追踪
       */
      toggleFollow() {
        const vm = this;
        if (!vm.live) return;
        // 新增为跟踪
        const isFollow = !vm.author_member.is_following;
        vm.api('Member').save({
          action: 'follow',
          id: vm.live.author,
        }, {}).then(() => {
          if (isFollow) {
            vm.sendIM(`live_${vm.$route.params.id}`, { type: 'follow' });
          }
          vm.reload();
        });
      },
      showFollow(user) {
        const vm = this;
        vm.messages.push({ type: 'follow', user });
      },
      makeShare() {
        const vm = this;
        vm.share(); // TODO: 要真正调起分享，然后回调
        vm.sendShare();
      },
      sendShare() {
        const vm = this;
        vm.sendIM(`live_${vm.$route.params.id}`, { type: 'share' });
      },
      showShare(user) {
        const vm = this;
        vm.messages.push({ type: 'share', user });
      },
      sendNotify(content) {
        const vm = this;
        console.error(content);
        vm.sendIM(`live_${vm.$route.params.id}`, { type: 'notify', content });
      },
      showNotify(notify) {
        const vm = this;
        vm.messages.push({ type: 'notify', ...notify });
      },
      showSystem(msg) {
        const vm = this;
        vm.messages.push({ type: 'system', ...msg });
      },
      sendGift(prizeOrder) {
        const vm = this;
        vm.giftbag_display = false;
        if (prizeOrder) {
          vm.sendIM(`live_${vm.$route.params.id}`, { type: 'gift', prizeOrder });
        }
      },
      showGift(msg) {
        const vm = this;
        vm.gift_barrages.push(msg);
        vm.reload();
        setTimeout(() => {
          vm.gift_barrages.splice(vm.gift_barrages.indexOf(msg), 1);
        }, 7000);
      },
      switchCamera() {
        window.TencentMLVB.switchCamera();
      },
      emojiText(val) {
        return twemoji.parse(val);
      },
      swipeup(e) {
        const vm = this;
        vm.api('Live').get({
          up_liveing: vm.$route.params.id,
        }).then((resp) => {
          if (resp.data.count === 0) {
            vm.notify('已經到最後一個直播了');
          } else {
            vm.$router.replace({ name: 'main_live', params: { id: resp.data.results[0].id } });
            vm.reload();
          }
        });
      },
      swipedown(e) {
        const vm = this;
        vm.api('Live').get({
          down_liveing: vm.$route.params.id,
        }).then((resp) => {
          if (resp.data.count === 0) {
            vm.notify('已經到第一個直播了');
          } else {
            vm.$router.replace({ name: 'main_live', params: { id: resp.data.results[0].id } });
            vm.reload();
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less">
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .moving-heart {
    @sz: 1.65rem;
    position: absolute;
    top: 50%;
    /*left: 50%;*/
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
    width: @sz;
    height: @sz;
    /*background: rgba(0, 0, 0, 0.2);*/
    color: red;
    & {
      .keyframes(heartmove);
      .-frames(@-...) {
        0% {
          margin-top: 0;
          opacity: 1;
        }
        100% {
          margin-top: -10rem;
          left: 50%;
          opacity: 0;
        }
      }
    }
    .animation(heartmove, 2s, linear);
    &::before {
      font-family: fontello, sans-serif;
      content: '\e801';
      position: absolute;
      top: 0.08rem;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: @sz;
      line-height: @sz;
      opacity: 0.75;
    }
  }
</style>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  @text-shadow-color: rgba(0, 0, 0, 0.5);

  #app-main-live {
    /*background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;*/
    -webkit-background-size: cover;
    background-size: cover;
    .border-box();
    &.not-status-bar {
      .swift-block {
        padding-top: @height-statusbar;
      }
    }
    .swift-block {
      padding-top: @height-statusbar*2;
      .fill-absolute();
    }
    .input-mask {
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
          background: url("../../assets/image/logo.png") 50% 50% no-repeat;
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
        .circle();
        .box-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
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
          font-size: 25*@px;
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
            font-size: 25*@px;
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
      z-index: 1;
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
        padding-right: 28*@px;
        background: rgba(0, 0, 0, 0.4);
        .rounded-corners(72*@px);
        & {
          .keyframes(barrage_move);
          .-frames(@-...) {
            0% {
              .translate("100%", "0");
              right: 0;
            }
            100% {
              .translate("0", "0");
              right: 100%;
            }
          }
        }
        .animation(barrage_move, 4s, linear);
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        -o-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        .avatar {
          float: left;
          height: 68*@px;
          width: 68*@px;
          margin: 2*@px 0 0 2*@px;
          .rounded-corners(50%);
          background: 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
        }
        .right {
          margin-left: 80*@px;
          padding-top: 3*@px;
          .nickname {
            height: 32*@px;
            line-height: 32*@px;
            font-size: 24*@px;
            max-width: 14rem;
            .nowrap();
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
            max-width: 14rem;
            .nowrap();
            font-size: 22*@px;
          }
        }
      }
      .popup-gift {
        display: inline-block;
        top: 240*@px;
        position: absolute;
        z-index: 9;
        /*<!--& {-->*/
        /*<!--.keyframes(barrage_opacity);-->*/
        /*<!--.-frames(@-...) {-->*/
        /*<!--0% {-->*/
        /*<!--opacity: 100%;-->*/
        /*<!--}-->*/
        /*<!--99% {-->*/
        /*<!--opacity: 100%;-->*/
        /*<!--}-->*/
        /*<!--100% {-->*/
        /*<!--opacity: 0;-->*/
        /*<!--}-->*/
        /*<!--}-->*/
        /*<!--}-->*/
        /*<!--.animation(barrage_opacity, 10s, linear,@iteration-count:infinite);-->*/
        /*-webkit-animation-fill-mode: forwards;*/
        /*-moz-animation-fill-mode: forwards;*/
        /*-o-animation-fill-mode: forwards;*/
        /*animation-fill-mode: forwards;*/
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        -moz-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        transform: translate(-50%, 0);

        .gift-icon {
          margin: 0 auto;
          width: 465*@px;
          height: 160*@px;
          /*background: 50% 50% no-repeat;*/
          /*background-size: cover;*/
          text-align: center;
          img {
            max-width: 465*@px;
            max-height: 160*@px;
            display: block;
            margin: 0 auto;
          }
        }
        .gift-author {
          width: 360*@px;
          margin: 30*@px auto 0 auto;
          background: rgba(0, 0, 0, 0.3);
          height: 72*@px;
          border-radius: 35*@px;
          position: relative;
          padding-left: 80*@px;
          box-sizing: border-box;
          .avatar {
            height: 68*@px;
            width: 68*@px;
            border-radius: 50%;
            background: 50% 50% no-repeat;
            background-size: cover;
            position: absolute;
            top: 2*@px;
            left: 2*@px;
          }
          .nickname {
            .clearfix();
            .name {
              float: left;
              color: #fff;
              font-size: 24*@px;
            }
            .level {
              background: url("../../assets/image/B1/icon_huangguan@3x.png") 50% 50% no-repeat;
              background-size: 100%;
              width: 86*@px;
              height: 32*@px;
              float: left;
              color: #0928DF;
              font-size: 18*@px;
              padding-left: 38*@px;
              box-sizing: border-box;
              line-height: 32*@px;
            }
            .vip {
              float: left;
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
          .gift-name {
            font-size: 24*@px;
            color: #fff;
          }
          .gift-count {
            position: absolute;
            left: 310*@px;
            bottom: 0;
            min-width: 170*@px;
            height: 80*@px;
            .add-icon {
              display: inline-block;
              width: 46*@px;
              height: 80*@px;
              background: url("../../assets/image/num/numberX.gif") 50% 50% no-repeat;
              background-size: 100%;
            }
            .num-icon {
              display: inline-block;
              width: 50*@px;
              height: 80*@px;
              background: url("../../assets/image/num/number0.gif") 50% 50% no-repeat;
              background-size: 100%;
              &.num-icon-1 {
                background-image: url("../../assets/image/num/number1.gif");
              }
              &.num-icon-2 {
                background-image: url("../../assets/image/num/number2.gif");
              }
              &.num-icon-3 {
                background-image: url("../../assets/image/num/number3.gif");
              }
              &.num-icon-4 {
                background-image: url("../../assets/image/num/number4.gif");
              }
              &.num-icon-5 {
                background-image: url("../../assets/image/num/number5.gif");
              }
              &.num-icon-6 {
                background-image: url("../../assets/image/num/number6.gif");
              }
              &.num-icon-7 {
                background-image: url("../../assets/image/num/number7.gif");
              }
              &.num-icon-8 {
                background-image: url("../../assets/image/num/number8.gif");
              }
              &.num-icon-9 {
                background-image: url("../../assets/image/num/number9.gif");
              }
            }
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
              text-shadow: 1px 1px 1px @text-shadow-color;
            }
          }
          &.btn-item-gift {
            background: url("../../assets/image/D/d1_icon_gift@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.btn-item-video {
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
            background: url("../../assets/image/D/d1_icon_video@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
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
        ul.message-list {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          li.message-item {
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
              display: inline-block;
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
                text-shadow: 1px 1px 1px @text-shadow-color;
              }
            }
            .content {
              display: inline;
              text-shadow: 1px 1px 1px @text-shadow-color;
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
      .link-mc {
        height: 357*@px;
        background: rgba(255, 255, 255, 0.8);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding-top: 35*@px;
        .link-status {
          font-size: 29*@px;
          text-align: center;
          position: relative;
          margin-bottom: 62*@px;
          .down-icon {
            position: absolute;
            right: 30*@px;
            width: 44*@px;
            top: 0;
            height: 44*@px;
            background: url("../../assets/image/D/d_2_11_icon_hide@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
        .link-btn {
          width: 162*@px;
          height: 162*@px;
          margin: 0 auto;
          display: block;
          &.link-start {
            background: url("../../assets/image/D/d2_11_btn_linkmic@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
          &.link-cancel {
            display: none;
            background: url("../../assets/image/D/d2_11_btn_stoplink@3x.png") 50% 50% no-repeat;
            background-size: 100%;

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
    .popin-enter-active {
      transition: all .7s cubic-bezier(.55, 0, .1, 1);
    }
    .popin-leave-active {
      transition: all .7s cubic-bezier(.55, 0, .1, 1);
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
