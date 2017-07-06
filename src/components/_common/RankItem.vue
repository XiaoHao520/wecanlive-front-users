<template>
  <div class="component-rank-item">
    <div class="rank-warpper-1" v-if="rank == 1">
      <div class="ranking"></div>
      <div class="avatar-warpper">
        <div class="avatar" @click="member()"></div>
      </div>
      <div class="mid-block" :class="{'no-track-btn': !showTrackBtn}">
        <div class="nickname">
          <span class="name">Chris Lin</span>
          <template v-if="!showTrackBtn">
            <span class="gender-female"></span>
            <span class="level">LV.20</span>
            <span class="vip">2</span>
          </template>
        </div>
        <div class="bot">
          <template v-if="action == 'diamond' || action == 'gift'">
            <div class="action" v-if="action == 'diamond'">貢獻</div>
            <div class="action" v-if="action == 'gift'">收到</div>
            <div class="icon-diamond"></div>
            <div class="num">231.6k</div>
          </template>
          <template v-if="action == 'star'">
            <div class="num">星光指数：3879</div>
          </template>
        </div>
      </div>
      <!--<a class="btn-track" v-if="showTrackBtn">-->
      <!--<span class="icon"></span>-->
      <!--追蹤-->
      <!--</a>-->
      <a class="btn-tracked" v-if="showTrackBtn">
        <span class="icon"></span>
        已追蹤
      </a>
    </div>

    <div class="rank-warpper" v-if="rank != 1">
      <div class="ranking-2" v-if="rank == 2"></div>
      <div class="ranking-3" v-if="rank == 3"></div>
      <div class="ranking" v-if="rank > 3">
        <template v-if="rank < 10">
          <span :class="rankingClass"></span>
        </template>
        <template v-if="rank > 9 && rank < 100">
          <span :class="rankingClassTens"></span>
          <span :class="rankingClassSingle"></span>
        </template>
      </div>
      <div class="avatar" @click="member()"></div>
      <div class="mid-block" :class="{'no-track-btn': !showTrackBtn}">
        <div class="nickname">
          <span class="name">Wecan Live</span>
          <template v-if="!showTrackBtn">
            <span class="gender-male"></span>
            <span class="level">LV.20</span>
            <span class="vip">2</span>
          </template>
        </div>
        <div class="bot">
          <template v-if="action == 'diamond' || action == 'gift'">
            <div class="action" v-if="action == 'diamond'">貢獻</div>
            <div class="action" v-if="action == 'gift'">收到</div>
            <div class="icon-diamond"></div>
            <div class="num">53.6k</div>
          </template>
          <template v-if="action == 'star'">
            <div class="num">星光指数：3879</div>
          </template>
        </div>
      </div>
      <a class="btn-track" v-if="showTrackBtn">
        <span class="icon"></span>
        追蹤
      </a>
      <!--<a class="btn-tracked" v-if="showTrackBtn">-->
      <!--<span class="icon"></span>-->
      <!--已追蹤-->
      <!--</a>-->
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    mounted() {
      const vm = this;
      if (vm.rank < 10) {
        vm.rankingClass = `num-${vm.rank}`;
      } else if (vm.rank > 9 && vm.rank < 100) {
        vm.rankingClassTens = `num-${Math.floor(vm.rank / 10)}`;
        vm.rankingClassSingle = `num-${vm.rank % 10}`;
      }
    },
    data() {
      return {
        rankingClass: '',
        rankingClassTens: '',
        rankingClassSingle: '',
      };
    },
    methods: {
      reload() {
      },
      member() {
        const vm = this;
        vm.$router.push({
          name: 'main_member_detail',
          params: { id: 0 },
        });
      },
    },
    props: {
      rank: {
        type: Number,
        default: 0,
      },
      action: {
        type: String,
      },
      showTrackBtn: {
        type: Boolean,
        default: true,
      },
      showTag: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .component-rank-item {
    background: #FFFFFF;
    &:last-child {
      .rank-warpper {
        border: none;
      }
    }
    .rank-warpper-1 {
      height: 257*@px;
      width: 100%;
      .border-box();
      background: #0B1171;
      color: #FFFFFF;
      overflow: hidden;
      padding: 0 29*@px 0 24*@px;
      .ranking {
        float: left;
        width: 88*@px;
        height: 130*@px;
        margin-top: 63.5*@px;
        background: url("../../assets/image/B6/icon_cup_1@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
      .avatar-warpper {
        float: left;
        margin-left: 23*@px;
        width: 180*@px;
        height: 180*@px;
        position: relative;
        margin-top: 38.5*@px;
        background: url("../../assets/image/B6/bg_decorate@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        .avatar {
          .block-center();
          width: 120*@px;
          height: 120*@px;
          background: #000 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          .rounded-corners(50%);
        }
      }
      .mid-block {
        float: left;
        margin-left: 12*@px;
        margin-top: 86*@px;
        width: 245*@px;
        &.no-track-btn {
          width: 350*@px;
        }
        .nickname {
          color: #FFFFFF;
          font-size: 35*@px;
          height: 36*@px;
          line-height: 36*@px;
          width: 100%;
          .nowrap();
          .gender-male {
            display: inline-block;
            width: 36*@px;
            height: 36*@px;
            background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: text-top;
          }
          .gender-female {
            display: inline-block;
            width: 36*@px;
            height: 36*@px;
            background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: text-top;
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
            vertical-align: text-top;
          }
          .vip {
            vertical-align: middle;
          }
        }
        .bot {
          overflow: hidden;
          height: 50*@px;
          line-height: 50*@px;
          .action {
            float: left;
            height: 50*@px;
            line-height: 50*@px;
            color: #FFFFFF;
            font-size: 30*@px;
          }
          .icon-diamond {
            float: left;
            height: 50*@px;
            width: 50*@px;
            margin: 0 10*@px 0 5*@px;
            background: url("../../assets/image/B6/icon_diamond_big@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .num {
            float: left;
            color: #FDF646;
            font-size: 30*@px;
            height: 50*@px;
            line-height: 50*@px;
            .nowrap();
          }
        }
      }
      .btn-track {
        float: right;
        margin-top: 103.5*@px;
        height: 50*@px;
        line-height: 50*@px;
        width: 145*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 24*@px;
        background: #9B20F3;
        .rounded-corners(50*@px);
        .icon {
          display: inline-block;
          width: 20*@px;
          height: 20*@px;
          background: url("../../assets/image/B1/icon_add@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .btn-tracked {
        float: right;
        margin-top: 103.5*@px;
        height: 50*@px;
        line-height: 50*@px;
        width: 145*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 24*@px;
        background: #00BBEC;
        .rounded-corners(50*@px);
        .icon {
          display: inline-block;
          width: 20*@px;
          height: 20*@px;
          background: url("../../assets/image/B1/icon_added@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
    }
    .rank-warpper {
      height: 150*@px;
      width: 690*@px;
      margin: 0 auto;
      border-bottom: 1px solid #E4E4EB;
      background: #FFFFFF;
      .ranking {
        float: left;
        width: 88*@px;
        text-align: center;
        line-height: 150*@px;
        height: 150*@px;
        //定义
        .ranking-loop(@n, @i:0) when (@i <= @n) {
          .num-@{i} {
            display: inline-block;
            width: 34*@px;
            height: 46*@px;
            background: url("../../assets/image/B6/number_@{i}@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: middle;
            margin: 0;
          }
          .ranking-loop(@n, (@i + 1));
        }
        //调用
        .ranking-loop(9);
      }
      .ranking-2 {
        float: left;
        width: 88*@px;
        height: 130*@px;
        margin-top: 10*@px;
        background: url("../../assets/image/B6/icon_cup_2@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
      .ranking-3 {
        float: left;
        width: 88*@px;
        height: 130*@px;
        margin-top: 10*@px;
        background: url("../../assets/image/B6/icon_cup_3@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
      .avatar {
        float: left;
        margin-left: 50*@px;
        margin-top: 15*@px;
        width: 120*@px;
        height: 120*@px;
        .rounded-corners(50%);
        background: #000 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
      .mid-block {
        float: left;
        margin-left: 13*@px;
        margin-top: 34.5*@px;
        width: 270*@px;
        &.no-track-btn {
          width: 400*@px;
        }
        .nickname {
          width: 100%;
          font-size: 30*@px;
          margin-bottom: 5*@px;
          .nowrap();
          .gender-male {
            display: inline-block;
            width: 36*@px;
            height: 36*@px;
            background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: text-top;
          }
          .gender-female {
            display: inline-block;
            width: 36*@px;
            height: 36*@px;
            background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: text-top;
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
            vertical-align: text-top;
          }
          .vip {
            display: inline-block;
            vertical-align: text-top;
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
        .bot {
          height: 36*@px;
          overflow: hidden;
          .action {
            float: left;
            height: 36*@px;
            line-height: 36*@px;
            color: #8B8B8B;
            font-size: 24*@px;
          }
          .icon-diamond {
            float: left;
            height: 36*@px;
            width: 36*@px;
            background: url("../../assets/image/B6/icon_diamond_s@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            margin-right: 5*@px;
          }
          .num {
            float: left;
            height: 36*@px;
            line-height: 36*@px;
            color: #8B8B8B;
            font-size: 24*@px;
            .nowrap();
          }
        }
      }
      .btn-track {
        float: right;
        margin-top: 50*@px;
        height: 50*@px;
        line-height: 50*@px;
        width: 145*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 24*@px;
        background: #9B20F3;
        .rounded-corners(50*@px);
        .icon {
          display: inline-block;
          width: 20*@px;
          height: 20*@px;
          background: url("../../assets/image/B1/icon_add@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .btn-tracked {
        float: right;
        margin-top: 50*@px;
        height: 50*@px;
        line-height: 50*@px;
        width: 145*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 24*@px;
        background: #00BBEC;
        .rounded-corners(50*@px);
        .icon {
          display: inline-block;
          width: 20*@px;
          height: 20*@px;
          background: url("../../assets/image/B1/icon_added@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
    }
  }
</style>
