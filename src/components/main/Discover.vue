<template>
  <div id="app-main-discover">
    <ul class="tab-index">
      <li class="tab-item"
          :class="{'tab-active': tab == 0}"
          @click="tabTo(0)">新加入
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 1}"
          @click="tabTo(1)">誰看過我
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 2}"
          @click="tabTo(2)">人氣動態
      </li>
      <div class="underline"
           :class="{
           'position-1': tab == 0,
           'position-2': tab == 1,
           'position-3': tab == 2
           }"></div>
    </ul>

    <transition :name="transitionName">
      <section class="section-live-list new-in-list" v-if="tab == 0">
        <ul>
          <li class="item">
            <div class="active"></div>
          </li>
          <li class="item"></li>
        </ul>
      </section>
    </transition>

    <transition :name="transitionName">
      <section class="section-live-list section-lookme" v-if="tab == 1">
        <div class="tips">最近 24 小時</div>
        <ul class="lists">
          <li class="list-item">
            <div class="avatar"></div>
            <div class="left-bar">
              <div class="info">
                <span class="icon icon-male"></span>
                <span class="text">男</span>
                <span class="text">29 歲</span>
                <span class="text">金牛座</span>
              </div>
              <div class="content">
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
              </div>
            </div>
            <div class="right-bar">
              <div class="distance">
                <span class="icon"></span>
                3km
              </div>
              <div class="time">39 分鐘前</div>
            </div>
          </li>

          <li class="list-item list-item-kown">
            <div class="avatar"></div>
            <div class="left-bar">
              <div class="nickname">LAKE</div>
              <div class="info">
                <span class="icon icon-female"></span>
                <span class="text">女</span>
                <span class="text">29 歲</span>
                <span class="text">金牛座</span>
              </div>
              <div class="content">
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
                我覺得你的眼光很好～這個色調很協調
              </div>
            </div>
            <div class="right-bar">
              <div class="distance">
                <span class="icon"></span>
                3km
              </div>
              <div class="time">39 分鐘前</div>
            </div>
          </li>


        </ul>
      </section>
    </transition>

    <transition :name="transitionName">
      <section class="section-live-list" v-if="tab == 2">
        <dynamic-item></dynamic-item>
        <dynamic-item></dynamic-item>
        <dynamic-item></dynamic-item>
      </section>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        tab: 0,
        transitionName: 'slide-left',
      };
    },
    methods: {
      reload() {
      },
      tabTo(pos) {
        const vm = this;
        const index = vm.tab;
        vm.transitionName = Number(pos) > Number(index) ? 'slide-left' : 'slide-right';
        setTimeout(() => {
          vm.tab = pos;
        }, 0);
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #app-main-discover {
    .tab-index {
      position: relative;
      background: #FFFFFF;
      height: 75*@px;
      width: 100%;
      overflow: hidden;
      .border-box();
      .tab-item {
        float: left;
        width: 100/3%;
        height: 100%;
        line-height: 75*@px;
        text-align: center;
        color: #8C8C8C;
        font-size: 26*@px;
        &.tab-active {
          color: #0021E6;
        }
      }
      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4*@px;
        background: svg-gradient(to right, #00A1F5, #00EEE8);
        -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -moz-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -ms-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -o-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        &.position-1 {
          -webkit-transform: translate3d(111%, 0, 0);
          -moz-transform: translate3d(111%, 0, 0);
          -ms-transform: translate3d(111%, 0, 0);
          -o-transform: translate3d(111%, 0, 0);
          transform: translate3d(111%, 0, 0);
          width: 77*@px;
        }
        &.position-2 {
          -webkit-transform: translate3d(325%, 0, 0);
          -moz-transform: translate3d(325%, 0, 0);
          -ms-transform: translate3d(325%, 0, 0);
          -o-transform: translate3d(325%, 0, 0);
          transform: translate3d(325%, 0, 0);
          width: 100*@px;
        }
        &.position-3 {
          -webkit-transform: translate3d(575%, 0, 0);
          -moz-transform: translate3d(575%, 0, 0);
          -ms-transform: translate3d(575%, 0, 0);
          -o-transform: translate3d(575%, 0, 0);
          transform: translate3d(575%, 0, 0);
          width: 100*@px;
        }
      }
    }
    .section-live-list {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 75*@px;
      background: #E3E3EA;
      padding-top: 7*@px;
      .app-scroll();
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      &.new-in-list {
        padding: 5*@px;
        ul {
          overflow: hidden;
          .item {
            position: relative;
            margin: 5*@px;
            float: left;
            width: 236*@px;
            height: 236*@px;
            background: url("../../assets/image/B3/list_icon_user_unknow@3x.png") 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
            .active {
              position: absolute;
              width: 44*@px;
              height: 44*@px;
              top: 10*@px;
              left: 10*@px;
              background: url("../../assets/image/B3/icon_live_2@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
        }
      }
      &.section-lookme {
        .tips {
          text-align: center;
          font-size: 23*@px;
          height: 52*@px;
          line-height: 52*@px;
          color: #949494;
        }
        .lists {
          background: #FFFFFF;
          .border-box();
          padding: 0 30*@px;
          .list-item {
            border-bottom: 1px solid #E4E4EB;
            height: 150*@px;
            overflow: hidden;
            .border-box();
            padding: 15*@px 0;
            .avatar {
              float: left;
              width: 120*@px;
              height: 120*@px;
              .border-radius(50%);
              margin-right: 15*@px;
              background: url("../../assets/image/B3/list_icon_user_unknow@3x.png") 50% 50% no-repeat;
              -webkit-background-size: cover;
              background-size: cover;
            }
            .left-bar {
              float: left;
              width: 350*@px;
              padding-top: 8*@px;
              .info {
                font-size: 30*@px;
                height: 36*@px;
                line-height: 36*@px;
                color: #000;
                margin-bottom: 5*@px;
                .icon {
                  float: left;
                  width: 36*@px;
                  height:36*@px;
                  &.icon-male {
                    background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                  }
                  &.icon-female {
                    background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                  }
                }
                .text {
                  margin-right: 25*@px;
                }
              }
              .content {
                font-size: 24*@px;
                line-height: 32*@px;
                color: #9C9C9C;
                .text-overflow(2, 64*@px);
              }
            }
            .right-bar {
              float: right;
              color: #9C9C9C;
              padding-top: 10*@px;
              .distance {
                text-align: right;
                color: #9C9C9C;
                font-size: 24*@px;
                .icon {
                  display: inline-block;
                  width: 36*@px;
                  height: 36*@px;
                  background: url("../../assets/image/B3/icon_location_gray@3x.png") 50% 50% no-repeat;
                  -webkit-background-size: 100%;
                  background-size: 100%;
                  vertical-align: bottom;
                }
              }
              .time {
                text-align: right;
                margin-top: 30*@px;
                color: #9C9C9C;
                font-size: 24*@px;
              }
            }
            &:last-child {
              border: none;
            }
            &.list-item-kown {
              .left-bar {
                .nickname {
                  font-size: 30*@px;
                }
                .content {
                  font-size: 24*@px;
                  line-height: 32*@px;
                  color: #9C9C9C;
                  height: 32*@px;
                  .single-text-overflow();
                }
              }

            }
          }
        }
      }
      .component-dynamic-item {
        margin-bottom: 7*@px;
      }
    }
  }

</style>
