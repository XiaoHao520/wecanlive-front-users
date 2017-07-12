<template>
  <div id="live-star-box">
    <transition name="popin">
      <div class="starbox" v-if="display && index">
        <div class="starbox-header">
          <a class="close-icon" href="javascript:;" @click="handleClick"></a>
          <div class="avatar"></div>
          <div class="star">
            <div class="star-total">總元氣數 : {{ item.count_author_starlight }}</div>
          </div>
        </div>
        <div class="starbox-content">
          <div class="starbox-null" v-if="item.count_author_starlight < 500">
            <div class="starbox-null-title">擁有的星光指數不足</div>
            <div class="starbox-null-icon"></div>
          </div>

          <div class="box-list" v-else>
            <a href="javascript:;" class="box-item"></a>
            <a href="javascript:;" class="box-item"></a>
            <a href="javascript:;" class="box-item"></a>
            <a href="javascript:;" class="box-item box-item-open"></a>
          </div>


          <div class="starbox-warn">
            <p>開啓星光寶盒將消耗 500 星光指數</p>
            <p>開播滿1小時可額外獲得一個星光寶盒哦</p>
          </div>
        </div>
        <div class="starbox-action">
          <a class="btn top-btn" @click="white_maske=true;index=false;ranking=true" href="javascript:;">
            <div class="top-avatar"></div>
            星光推薦爭奪榜</a>
          <a class="btn record-btn"
             @click="index=!index;record=!record" href="javascript:;">星光寶盒記錄</a>
        </div>
      </div>
    </transition>


    <transition name="popin">
      <div v-if="display && record" class="starbox-record">
        <div class="record-header">
          <a href="javascript:;" @click="index=!index;record=!record" class="back-icon"></a>
          <div class="title">兌換寶盒記錄</div>
          <a href="javascript:;" class="close-icon" @click="handleClick"></a>
        </div>


        <div class="record-list">
          <ul>
            <li class="record-item">
              <div class="record-content">
                <div class="record-num">-1星光寶盒</div>
                <div class="record-award">+50金幣</div>
              </div>
              <div class="record-date">2017-4-9 15:00</div>
            </li>
            <li class="record-item">
              <div class="record-content">
                <div class="record-num">-1星光寶盒</div>
                <div class="record-award">+50金幣</div>
              </div>
              <div class="record-date">2017-4-9 15:00</div>
            </li>
          </ul>
        </div>

      </div>
    </transition>

    <transition name="slide-down-up">
      <div v-if="display && ranking" class="starbox-ranking">
        <div class="ranking-header">
          <i class="fa fa-star" aria-hidden="true"></i>
          星光幸運星
          <span>(16:15-16:30)</span>
          <!--todo 圖標-->
          <div class="date">11:52</div>
        </div>
        <div class="ranking-top">
          <div class="top-icon"></div>
          <div class="avatar-bg">
            <div class="avatar"></div>
          </div>
          <div class="top-member">
            <div class="name">Chris Lin</div>
            <div class="top-coin">抽中 <span>465金幣</span></div>
          </div>
        </div>

        <div class="today-star">
          <div class="title">今日幸運星</div>

          <div class="today-star-member">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">娛樂</div>
              <div class="date">16:15-16:30</div>
            </div>
            <div class="coin">抽中<span>316</span>金幣</div>
          </div>

          <div class="today-star-member">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">娛樂</div>
              <div class="date">16:15-16:30</div>
            </div>
            <div class="coin">抽中<span>316</span>金幣</div>
          </div>
        </div>


      </div>
    </transition>


    <transition name="fade">
      <div class="maske" @click="handleClick" v-if="display && !white_maske"></div>
    </transition>

    <transition name="fade">
      <div class="maske white-maske" @click="handleClick" v-if="display && white_maske"></div>
    </transition>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        index: true,
        record: false,
        ranking: false,
        white_maske: false,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('StarBoxRecord').get({
          author: vm.me.id,
          live: vm.$route.params.id,
        }).then((resp) => {
        });
      },
      handleClick(evt) {
        this.index = true;
        this.record = false;
        this.ranking = false;
        this.white_maske = false;
        this.$emit('click', !this.display);
      },
    },
    props: {
      display: Boolean,
      item: Object,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #live-star-box {
    .maske {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.5);
    }
    .white-maske {
      background-color: inherit;
    }
    .starbox {
      .border-radius(15*@px);
      overflow: hidden;
      z-index: 999;
      width: 692*@px;
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .starbox-header {
        height: 286*@px;
        background: @bg-header;
        position: relative;
        box-sizing: border-box;
        padding: 90*@px 0 0 240*@px;
        .close-icon {
          position: absolute;
          display: block;
          width: 65*@px;
          height: 65*@px;
          background: url("../../assets/image/A/pop_icon_close@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          top: 20*@px;
          right: 20*@px;
        }
        .avatar {
          width: 160*@px;
          height: 160*@px;
          position: absolute;
          background: url("../../assets/image/D/d2_8_icon_yuanqi_b@3x.png") 50% 50% no-repeat;
          border-radius: 50%;
          background-size: 100%;
          left: 45*@px;
        }
        .star {
          height: 160*@px;
          .star-total {
            font-size: 45*@px;
            height: 45*@px;
            color: #fff;
            margin-bottom: 30*@px;
            line-height: 160*@px;
            font-weight: bold;
          }
          .unused-star {
            color: #fff;
            font-size: 32*@px;
            line-height: 32*@px;
            height: 32*@px;
          }
        }
      }
      .starbox-content {
        height: 492*@px;
        background: #fff;
        border: 1px solid #BCBEC0;
        .starbox-null {
          box-sizing: border-box;
          padding: 30*@px 44*@px 0 44*@px;
          .starbox-null-title {
            font-size: 30*@px;
            line-height: 30*@px;
            height: 30*@px;
            color: #BCBEC0;
            text-align: center;
            margin-bottom: 17*@px;
          }
          .starbox-null-icon {
            width: 285*@px;
            height: 285*@px;
            background: url("../../assets/image/D1-1/d1_1_icon_box_none@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            margin: 0 auto;
          }
        }
        .box-list {
          /*display: none;*/
          .clearfix();
          padding-top: 10*@px;
          .box-item {
            height: 125*@px;
            margin: 50*@px 50*@px 0 50*@px;
            display: block;
            float: left;
            width: 125*@px;
            background: url("../../assets/image/D1-1/d1_1_icon_box_nor@3x.png") 50% 100% no-repeat;
            background-size: 132*@px;
            &.box-item-open {
              background-image: url("../../assets/image/D1-1/d1_1_icon_box_opened@3x.png");
            }
          }
        }
        .starbox-warn {
          padding: 0 44*@px;
          margin-top: 25*@px;
          p {
            margin: 0;
            font-size: 24*@px;
            color: #8D8D8D;
            line-height: 30*@px;
          }
        }
      }
      .starbox-action {
        height: 117*@px;
        background: #fff;
        box-sizing: border-box;
        padding: 30*@px 50*@px 0 50*@px;
        .btn {
          display: inline-block;
          color: #fff;
          position: relative;
          font-size: 28*@px;
          height: 55*@px;
          box-sizing: border-box;
          line-height: 55*@px;
          width: 250*@px;
          text-align: center;
          .border-radius(25*@px);
          &.top-btn {
            width: 270*@px;
            background: #A201FD;
            .top-avatar {
              position: absolute;
              width: 60*@px;
              height: 60*@px;
              border-radius: 50%;
              background: 50% 50% no-repeat #ccc;
              background-size: 100%;
              top: -2.5*@px;
              left: -30*@px;
            }
          }
          &.record-btn {
            background: #2D02ED;
            float: right;
          }
        }
      }

    }

    .starbox-record {
      height: 895*@px;
      background: #fff;
      z-index: 999;
      width: 692*@px;
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .border-radius(15*@px);
      overflow: hidden;
      .record-header {
        height: 88*@px;
        background: @bg-header;
        position: relative;
        .title {
          height: 100%;
          line-height: 88*@px;
          font-size: 38*@px;
          text-align: center;
          color: #fff;
        }
        .back-icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 80*@px;
          background: url("../../assets/image/A/nav_back@3x.png") 50% 50% no-repeat;
          background-size: 44*@px;
        }
        .close-icon {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 80*@px;
          background: url("../../assets/image/A/nav_icon_close_line@3x.png") 50% 50% no-repeat;
          background-size: 44*@px;
        }
      }
      .record-list {
        padding: 30*@px 30*@px 0 30*@px;
        .record-item {
          padding-bottom: 25*@px;
          margin-bottom: 30*@px;
          border-bottom: 1px solid @color-border;
          position: relative;
          &:last-child {
            margin-bottom: 0;
          }
          .record-content {
            .record-num {
              font-size: 37*@px;
              color: #2D02ED;
              height: 37*@px;
              line-height: 37*@px;
              margin-bottom: 15*@px;
            }
            .record-award {
              font-size: 28*@px;
              color: #8D8D8D;
              height: 28*@px;
              line-height: 28*@px;
            }
          }
          .record-date {
            color: #8D8D8D;
            font-size: 24*@px;
            position: absolute;
            right: 0;
            top: 32*@px;
          }
        }
      }
    }

    .starbox-ranking {
      background: #fff;
      position: fixed;
      width: 690*@px;
      bottom: 30*@px;
      left: 50%;
      z-index: 999;
      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      .border-radius(15*@px);
      overflow: hidden;
      .ranking-header {
        height: 90*@px;
        padding: 0 17*@px;
        background: @bg-header;
        color: #fff;
        line-height: 90*@px;
        font-size: 30*@px;
        i {
          margin-right: 10*@px;
        }
        span {
          color: #CD91F9;
          margin-left: 18*@px;
        }
        .date {
          float: right;
          color: #F2B556;
        }
      }
      .ranking-top {
        height: 227*@px;
        background: #170175;
        padding-left: 30*@px;
        .top-icon {
          width: 75*@px;
          float: left;
          background: url("../../assets/image/B6/icon_cup_1@3x.png") 50% 50% no-repeat;
          background-size: 75*@px;
          margin-right: 20*@px;
          height: 100%;
        }
        .avatar-bg {
          height: 100%;
          width: 180*@px;
          background: url("../../assets/image/B6/bg_decorate@3x.png") 50% 50% no-repeat;
          background-size: 180*@px;
          float: left;
          position: relative;
          .avatar {
            position: absolute;
            width: 120*@px;
            height: 120*@px;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            background: 50% 50% no-repeat #ccc;
            background-size: cover;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
        }
        .top-member {
          height: 100%;
          padding-top: 70*@px;
          box-sizing: border-box;
          color: #fff;
          font-size: 32*@px;
          margin-left: 15*@px;
          float: left;
          .name {
            height: 32*@px;
            line-height: 32*@px;
          }
          .top-coin {
            margin-top: 17*@px;
            height: 32*@px;
            line-height: 32*@px;
            span {
              color: #F8F800;
            }
          }
        }
      }
      .today-star {
        padding: 30*@px 20*@px 0 20*@px;
        .title {
          font-size: 26*@px;
          color: #B0B0B0;
          margin-bottom: 30*@px;
        }
        .today-star-member {
          padding: 0 0 15*@px 136*@px;
          border-bottom: 1px solid @color-border;
          position: relative;
          margin-bottom: 15*@px;
          &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
          }
          .avatar {
            width: 120*@px;
            height: 120*@px;
            border-radius: 50%;
            background: 50% 50% no-repeat #ccc;
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
          .member-info {
            box-sizing: border-box;
            padding-top: 30*@px;
            height: 120*@px;
            font-size: 28*@px;
            div {
              height: 25*@px;
              line-height: 25*@px;
            }
            .date {
              margin-top: 18*@px;
              color: #8D8D8D;
            }
          }
          .coin {
            position: absolute;
            font-size: 28*@px;
            color: #8D8D8D;
            padding-top: 40*@px;
            top: 0;
            right: 0;
            span {
              color: #5338F1;
              margin: 0 10*@px;
            }
          }
        }
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
