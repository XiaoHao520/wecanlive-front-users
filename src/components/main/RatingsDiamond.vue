<template>
  <div id="app-main-ratings-diamond">
    <ul class="tab-index">
      <li class="tab-item"
          :class="{'tab-active': tab == 0}"
          @click="tabTo(0)">每日
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 1}"
          @click="tabTo(1)">每週
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 2}"
          @click="tabTo(2)">統計
      </li>
      <div class="underline"
           :class="{
           'position-1': tab == 0,
           'position-2': tab == 1,
           'position-3': tab == 2
           }"></div>
    </ul>

    <transition :name="transitionName">
      <section class="section-list section-list-1" v-if="tab == 0">
        <template v-for="i in 5">
          <rank-item :rank="i" action="diamond"></rank-item>
        </template>
      </section>
    </transition>

    <transition :name="transitionName">
      <section class="section-list section-list-2" v-if="tab == 1">
        <template v-for="i in 5">
          <rank-item :rank="i" action="diamond"></rank-item>
        </template>
      </section>
    </transition>

    <transition :name="transitionName">
      <section class="section-list section-list-3" v-if="tab == 2">
        <template v-for="i in 5">
          <rank-item :rank="i" action="diamond"></rank-item>
        </template>
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
        const vm = this;
        vm.api('CreditDiamondTransaction').get({
          action: 'get_ranking_list',
        }, {}).then((resp) => {
          console.log(resp.data);
        });
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';
  #app-main-ratings-diamond {
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
        width: 50*@px;
        background: svg-gradient(to right, #00A1F5, #00EEE8);
        -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -moz-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -ms-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -o-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        &.position-1 {
          -webkit-transform: translate3d(200%, 0, 0);
          -moz-transform: translate3d(200%, 0, 0);
          -ms-transform: translate3d(200%, 0, 0);
          -o-transform: translate3d(200%, 0, 0);
          transform: translate3d(200%, 0, 0);
        }
        &.position-2 {
          -webkit-transform: translate3d(700%, 0, 0);
          -moz-transform: translate3d(700%, 0, 0);
          -ms-transform: translate3d(700%, 0, 0);
          -o-transform: translate3d(700%, 0, 0);
          transform: translate3d(700%, 0, 0);
        }
        &.position-3 {
          -webkit-transform: translate3d(1200%, 0, 0);
          -moz-transform: translate3d(1200%, 0, 0);
          -ms-transform: translate3d(1200%, 0, 0);
          -o-transform: translate3d(1200%, 0, 0);
          transform: translate3d(1200%, 0, 0);
        }
      }
    }
    .section-list {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 75*@px;
      background: #E4E4EB;
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      .app-scroll();
    }
  }
</style>
