<template>
  <div id="popup-blink-star">
    <transition name="slide-left">
      <div class="blink-star-warpper"
           v-if="display">

        <div class="top-block">
          <div class="top-area">

            <div class="top-1">
              <div class="avatar"
                   :style="{backgroundImage: !!(item && item.avatar_url)
                 && 'url('+item.avatar_url+')'}"></div>
              <div class="left-area">
                <div class="nickname">
                  <span class="name">{{ item.nickname }}</span>
                  <span class="gender"
                        :class="{'gender-female':item.gender =='F',
                                 'gender-male':item.gender =='M'}"></span>
                  <span class="level">LV.{{ item.level }}</span>
                  <span class="vip">{{ item.vip_level }}</span>
                </div>
                <div class="time">{{ item.first_live_date | date('yyyy'+ ' 年' + 'm' + ' 月' + 'd' + ' 號' ) }}成爲 wecan
                  主播
                </div>
              </div>
            </div>

            <div class="top-2">
              <div class="next-target" @click="togglePopup">下個目標</div>
              <div class="blink-star">
                <div class="icon" :style="{backgroundImage: 'url(' + next_badge.icon_item.image + ')'}"></div>
                {{ next_badge.name }}
              </div>
            </div>

            <div class="diamond-percent">
              <div class="icon"></div>
              <div class="percent-block">
                <div class="percent"
                     :style="{width: (live.count_author_diamond *100 / next_badge.item_value) + '%'}"></div>
              </div>
              <div class="num">{{ live.count_author_diamond }} / {{ next_badge.item_value }}</div>
            </div>
          </div>
        </div>


        <ul class="tab-list">
          <li class="tab-left"
              :class="{active: tab == 0}"
              @click="tabTo(0)">成就徽章
          </li>
          <li class="tab-right"
              :class="{active: tab == 1}"
              @click="tabTo(1)">收到的禮物
          </li>
        </ul>


        <ul class="badge-list" v-show="tab == 0">
          <li v-for="badge in author_badge">
            <div class="thumbnail" :style="{backgroundImage: 'url(' + badge.icon_url + ')'}"></div>
            <div class="text">{{ badge.badge_name }}</div>
          </li>
        </ul>

        <ul class="gift-list" v-show="tab == 1">
          <li v-for="prize in prize_items">
            <div class="thumbnail" :style="{backgroundImage: 'url(' + prize.prize.icon_item.image + ')'}"></div>
            <!--todo-->
            <div class="user-avatar"></div>
            <div class="text">{{ prize.prize.name }}</div>
            <div class="num">{{ prize.amount }}</div>
          </li>
        </ul>

        <transition name="popup" appear>
          <div class="pop-up-block" v-show="popup_display">
            <header class="pop-up-header">
              魔法師
              <div class="warpper" @click="togglePopup">
                <a class="btn-close"></a>
              </div>
            </header>
            <div class="content">
              <div class="con">
                <div class="row">獲取資格條件：</div>
                <div class="row">累計鑽石數達 500 個</div>
              </div>
              <div class="con">
                <div class="row">徽章有限期：</div>
                <div class="row">30 天</div>
              </div>
            </div>
          </div>
        </transition>

        <div class="masked" @click="togglePopup" v-show="popup_display"></div>

      </div>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        tab: 1,
        popup_display: false,
        prize_items: [],
        next_badge: [],
        author_badge: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        console.log(vm.item);
        vm.api('Member').get({
          action: 'get_live_prize',
          id: vm.item.user,
        }, {}).then((resp) => {
          vm.prize_items = resp.data;
        });
        vm.api('Badge').get({
          next_diamond_badge: 'True',
          live_author: vm.item.user,
        }).then((resp) => {
          if (resp.data.count > 0) {
            vm.next_badge = resp.data.results[0];
          }
        });
        vm.api('BadgeRecord').get({
          live_author: vm.item.user,
        }).then((resp) => {
          if (resp.data.count > 0) {
            vm.author_badge = resp.data.results;
          }
        });
      },
      togglePopup() {
        this.popup_display = !this.popup_display;
      },
      tabTo(tab) {
        this.tab = tab;
      },
    },
    props: {
      display: Boolean,
      id: Number,
      item: Object,
      live: Object,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #popup-blink-star {
    .blink-star-warpper {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.5);
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      padding: 36*@px 0 0;
      .top-block {
        padding: 0 30*@px;
        .top-area {
          padding: 34*@px 0 30*@px 0;
          border-bottom: 1px solid #FFFFFF;
          .top-1 {
            overflow: hidden;
            .avatar {
              float: left;
              width: 120*@px;
              height: 120*@px;
              background: #000 50% 50% no-repeat;
              -webkit-background-size: cover;
              background-size: cover;
              margin-right: 15*@px;
              .rounded-corners(50%);
            }
            .left-area {
              float: left;
              margin-top: 15*@px;
              .nickname {
                .name {
                  font-size: 26*@px;
                  color: #FFFFFF;
                }
                .gender {
                  display: inline-block;
                  width: 36*@px;
                  height: 36*@px;
                  vertical-align: text-bottom;
                  &.gender-female {
                    background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                  }
                  &.gender-male {
                    background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                  }
                }
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
              .time {
                font-size: 26*@px;
                color: #8C8C8C;
              }
            }

          }
          .top-2 {
            overflow: hidden;
            margin-top: 30*@px;
            font-size: 26*@px;
            color: #FFFFFF;
            .next-target {
              float: left;
              text-align: center;
              background: #9D20F6;
              width: 162*@px;
              height: 56*@px;
              line-height: 56*@px;
              .rounded-corners(56*@px);
              margin-right: 30*@px;
            }
            .blink-star {
              float: left;
              height: 56*@px;
              line-height: 56*@px;
              width: 195*@px;
              background: @bg-header;
              .rounded-corners(56*@px);
              text-indent: 10*@px;
              .icon {
                float: left;
                margin-top: 2*@px;
                margin-left: 2*@px;
                height: 52*@px;
                width: 52*@px;
                background: url("../../assets/image/D/d6_1_icon_star@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: cover;
                border-radius: 50%;
              }
            }
          }
          .diamond-percent {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 46*@px;
            padding: 0 3*@px 0 35*@px;
            .rounded-corners(46*@px);
            background: rgba(0, 0, 0, 0.3);
            .border-box();
            margin-top: 28*@px;
            .icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 46*@px;
              height: 46*@px;
              .rounded-corners(50%);
              background: url("../../assets/image/D/d6_1_icon_diamonds@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              background-color: #312D29;
            }
            .num {
              position: absolute;
              top: 0;
              left: 0;
              height: 46*@px;
              width: 100%;
              color: #FFFFFF;
              line-height: 46*@px;
              text-align: center;
              font-size: 26*@px;
            }
            .percent-block {
              float: left;
              height: 40*@px;
              border-top-right-radius: 40*@px;
              border-bottom-right-radius: 40*@px;
              overflow: hidden;
              width: 100%;
              margin-top: 3*@px;
              .percent {
                height: 40*@px;
                max-width: 100%;
                background: #00A7D0;
              }
            }
          }
        }
      }

      .tab-list {
        overflow: hidden;
        padding: 53*@px 30*@px 50*@px;
        li {
          width: 300*@px;
          height: 56*@px;
          line-height: 56*@px;
          text-align: center;
          background: rgba(133, 123, 125, 0.9);
          color: #FFFFFF;
          font-size: 25*@px;
          .rounded-corners(56*@px);
          &.tab-left {
            float: left;
          }
          &.tab-right {
            float: right;
          }
          &.active {
            color: #000;
            background: #00EDE7;
          }
        }
      }
      .badge-list {
        position: absolute;
        top: 540*@px;
        left: 0;
        right: 0;
        bottom: 0;
        .app-scroll();
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          float: left;
          width: 127.5*@px;
          margin: 0 30*@px 48*@px;
          .thumbnail {
            margin: 0 auto 12*@px;
            width: 120*@px;
            height: 120*@px;
            background: url("../../assets/image/D/d6_1_icon_honor1@3x.png") 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
            .rounded-corners(50%);
          }
          .text {
            font-size: 25*@px;
            color: #FFFFFF;
            text-align: center;
            .nowrap();
          }
        }
      }
      .gift-list {
        position: absolute;
        top: 540*@px;
        left: 0;
        right: 0;
        bottom: 0;
        .app-scroll();
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          float: left;
          width: 150*@px;
          margin: 0 50*@px 75*@px;
          .thumbnail {
            position: relative;
            margin: 0 auto 10*@px;
            width: 100*@px;
            height: 100*@px;
            background: url("../../assets/image/D/d2_4_gift1@3x.png") 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
          }
          .user-avatar {
            position: absolute;
            left: 0;
            top: 50*@px;
            width: 50*@px;
            height: 50*@px;
            .rounded-corners(50%);
            background: #000 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
          }
          .text {
            font-size: 25*@px;
            color: #FFFFFF;
            text-align: center;
            .nowrap();
          }
          .num {
            position: absolute;
            right: 0;
            top: 0;
            width: 20*@px;
            height: 20*@px;
            line-height: 20*@px;
            text-align: center;
            color: #FFFFFF;
            font-size: 14*@px;
            .rounded-corners(50%);
            border: 1px solid #FFFFFF;
          }
        }
      }
      .pop-up-block {
        .block-center();
        width: 530*@px;
        .rounded-corners(10*@px);
        overflow: hidden;
        background: #FFFFFF;
        z-index: 100;
        .pop-up-header {
          position: relative;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;
          color: #FFFFFF;
          font-size: 35*@px;
          background: @bg-header;
          .warpper {
            position: absolute;
            right: 0;
            top: 0;
            height: 90*@px;
            width: 90*@px;
            line-height: 90*@px;
            text-align: center;
            a {
              display: inline-block;
              width: 44*@px;
              height: 44*@px;
              margin-top: 23*@px;
              background: url("../../assets/image/D/d1_1_icon_closed@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
        }
        .content {
          padding: 66*@px 46*@px 50*@px;
          color: #000;
          font-size: 30*@px;
          .con {
            margin-bottom: 50*@px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .masked {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
      }
    }
    .slide-left-enter,
    .slide-left-leave-active {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }

  }
</style>
