<template>
  <div id="live-mission">
    <transition name="slide-down-up">
      <div class="mission-block" v-if="display">
        <div class="mission-header">
          <div class="title">
            元氣任務
          </div>
          <a href="javascript:;" class="star-btn">元氣幸運星</a>
        </div>

        <div class="watch-mission">
          <div class="icon"></div>

          <div class="mission-detail">
            <div class="content">每觀看30分鐘，可獲得5元氣</div>

            <div class="date">{{ watch_mission_date_distance | date('MM:ss') }}<span>({{ live_watch_record.watch_mission_count }}/8)</span>
            </div>
          </div>

          <a href="javascript:;"
             v-if="watch_mission_achievement && live_watch_record.watch_mission_count < 8"
             @click="getWatchMission()"
             class="get-btn get-btn-active">領取</a>

          <a href="javascript:;"
             v-else
             class="get-btn">領取</a>
        </div>

        <div class="mission-list">
          <ul>
            <li class="mission-item">
              <div class="mission-content">
                <div class="title">分享直播間<span>(0/3)</span></div>
                <p class="mission-intro mission-intro-1">分享直播，每次可獲得獎勵5元氣</p>
              </div>
              <a href="javascript:;"
                 class="get-btn"
                 @click=share()>分享</a>
            </li>

            <li class="mission-item">
              <div class="mission-content">
                <div class="title">邀請朋友<span>(0/2)</span></div>
                <p class="mission-intro">在《個人中心》&rarr;《設定》&rarr;《邀請好友》，</p>
                <p class="mission-intro">每邀請成功1個好友註冊，你和好友都可獲得獎勵40元氣</p>
              </div>
              <router-link :to="{name: 'main_personal_referrer'}"
                           class="get-btn">邀請
              </router-link>
            </li>

            <li class="mission-item">
              <div class="mission-content">
                <div class="title">完善資料<span>(0/1)</span></div>
                <p class="mission-intro">捕全頭像，性別，簽名，生日，</p>
                <p class="mission-intro">所在地區資訊,可獲得10元氣</p>
              </div>
              <router-link :to="{name: 'main_personal_profile'}"
                           class="get-btn">完善
              </router-link>
            </li>
          </ul>
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
    data() {
      return {
        live_watch_record: [],
        watch_mission_date_distance: 0,
        watch_mission_achievement: false,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('LiveWatchLog').get({
          author: vm.me.id,
          live: vm.$route.params.id,
          fields: 'watch_mission_count',
        }).then((resp) => {
          vm.live_watch_record = resp.data.results[0];
          vm.live_watch_record.watch_mission_count = 8;
          vm.dateCountDown();
          console.log(vm.watch_mission_date_distance);
        });
      },
      handleClick(evt) {
        this.$emit('click', !this.display);
      },
      share(evt) {
        this.$emit('click', 'share');
      },
      dateCountDown() {
        const vm = this;
        if (vm.live_watch_record.watch_mission_count < 8) {
          vm.watch_mission_date_distance = 1800000;
          const timer = setInterval(() => {
            vm.watch_mission_date_distance -= 1000;
            if (vm.watch_mission_date_distance <= 0) {
              vm.watch_mission_achievement = true;
              clearInterval(timer);
            }
          }, 1000);
        } else {
          vm.watch_mission_date_distance = '0';
        }
      },
    },
    props: {
      display: Boolean,
      record: {},
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #live-mission {
    .maske {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
    .mission-block {
      position: fixed;
      width: 680*@px;
      bottom: 30*@px;
      z-index: 999;
      left: 50%;
      .border-radius(15*@px);
      overflow: hidden;
      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      .mission-header {
        height: 90*@px;
        background: @bg-header;
        padding: 0 20*@px;
        position: relative;
        .title {
          height: 90*@px;
          line-height: 90*@px;
          color: #fff;
          padding-left: 50*@px;
          font-size: 32*@px;
          background: url("../../assets/image/D/d2_8_icon_yuanqi_s@3x.png") 0 46% no-repeat;
          background-size: 40*@px;
        }
        .star-btn {
          height: 50*@px;
          position: absolute;
          display: block;
          right: 20*@px;
          top: 20*@px;
          .border-radius(30*@px);
          width: 160*@px;
          text-align: center;
          line-height: 50*@px;
          font-size: 25*@px;
          color: #2F02ED;
          background: #fff;
        }
      }
      .watch-mission {
        height: 150*@px;
        padding: 0 140*@px 0 158*@px;
        position: relative;
        background: #170175;
        .icon {
          width: 120*@px;
          height: 120*@px;
          background: url("../../assets/image/D/d2_8_icon_yuanqi_b@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          position: absolute;
          top: 15*@px;
          left: 20*@px;
        }
        .mission-detail {
          padding-top: 42*@px;
          .content {
            font-size: 26*@px;
            color: #fff;
            line-height: 26*@px;
          }
          .date {
            height: 24*@px;
            line-height: 24*@px;
            font-size: 26*@px;
            margin-top: 15*@px;
            color: #FFDB3B;
            padding-left: 40*@px;
            background: url("../../assets/image/D/d2_8_icon_time@3x.png") 0 50% no-repeat;
            background-size: 24*@px;
            span {
              margin-left: 20*@px;
            }
          }
        }
        .get-btn {
          display: block;
          position: absolute;
          right: 20*@px;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          width: 120*@px;
          color: #2F02ED;
          height: 50*@px;
          line-height: 50*@px;
          font-size: 28*@px;
          background: #fff;
          .border-radius(30*@px);
          text-align: center;
          &.get-btn-active {
            background: #A201FD;
            color: #fff;
          }
        }
      }

      .mission-list {
        background: #fff;
        padding: 43*@px 0 0 20*@px;

        .mission-item {
          margin-bottom: 20*@px;
          border-bottom: 1px solid @color-border;
          position: relative;
          &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
          }

          .mission-content {
            padding-bottom: 10*@px;
            /*<!--min-height: 110*@px;-->*/
            box-sizing: border-box;
            .title {
              font-size: 30*@px;
              line-height: 30*@px;
              height: 30*@px;
              color: #2D02ED;
              margin-bottom: 20*@px;
              span {
                margin-left: 10*@px;
              }
            }
            .mission-intro {
              margin: 0 0  15*@px 0;
              font-size: 18*@px;
              color: #969696;
              height: 18*@px;
              line-height: 18*@px;
              &.mission-intro-1 {
                margin-bottom: 30*@px;
              }
            }
          }
          .get-btn {
            position: absolute;
            right: 20*@px;
            .border-radius(30*@px);
            background: #A201FD;
            color: #fff;
            height: 50*@px;
            line-height: 50*@px;
            font-size: 28*@px;
            top: 10*@px;
            width: 120*@px;
            text-align: center;
          }
        }
      }

    }

    // 由下往上移动
    .slide-down-up-enter-active {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-down-up-leave-active {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-down-up-enter, .slide-down-up-leave-active {
      -webkit-transform: translate3d(-50%, 100%, 0);
      -moz-transform: translate3d(-50%, 100%, 0);
      -ms-transform: translate3d(-50%, 100%, 0);
      -o-transform: translate3d(-50%, 100%, 0);
      transform: translate3d(-50%, 100%, 0);
    }
  }
</style>
