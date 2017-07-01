<template>
  <div id="app-main-member-official">
    <header-member></header-member>
    <ul class="tab-index">
      <li class="tab-item"
          :class="{'tab-active': tab == 0}"
          @click="tabTo(0)">影片
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 1}"
          @click="tabTo(1)">直播
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 2}"
          @click="tabTo(2)">動態
      </li>
      <div class="underline"
           :class="{
           'position-1': tab == 0,
           'position-2': tab == 1,
           'position-3': tab == 2
           }"></div>
    </ul>
    <section class="section-body">
      <transition :name="transitionName">
        <section class="section-list section-list-1" v-if="tab == 0">
          <div class="time">2017-05-04 03:00</div>
          <div class="lists">
            <movie-item category="recommend"></movie-item>
            <movie-item category="new"></movie-item>
            <movie-item category="exclusive"></movie-item>
            <movie-item category="recommend"></movie-item>
            <movie-item category="new"></movie-item>
            <movie-item category="exclusive"></movie-item>
            <movie-item category="recommend"></movie-item>
            <movie-item category="new"></movie-item>
            <movie-item category="exclusive"></movie-item>
          </div>
        </section>
      </transition>

      <transition :name="transitionName">
        <section class="section-list section-list-2" v-if="tab == 1">
          <live-item :showInfo="showInfo"></live-item>
          <live-item :showInfo="showInfo" :review="review"></live-item>
          <live-item :showInfo="showInfo" :review="review"></live-item>
          <live-item :showInfo="showInfo"></live-item>
        </section>
      </transition>

      <transition :name="transitionName">
        <section class="section-list section-list-3" v-if="tab == 2">
          <div class="dynamic-item"></div>
          <div class="dynamic-item"></div>
          <div class="dynamic-item"></div>
          <div class="dynamic-item"></div>
        </section>
      </transition>
    </section>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        tab: 0,
        transitionName: 'slide-left',
        showInfo: false,
        review: true,
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

  #app-main-member-official {
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
    .section-body {
      .section-list {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 36*@px+317*@px+126*@px+75*@px;
        background: #E3E3EA;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        .app-scroll();
        &.section-list-1 {
          padding: 15*@px;
          .time {
            padding: 0 15*@px;
            height: 43*@px;
            line-height: 43*@px;
            text-align: right;
            font-size: 20*@px;
            color: #949494;
          }
          .component-movie-item {
            float: left;
            margin: 0 15*@px 25*@px;
          }
        }
        &.section-list-3 {
          padding: 3.5*@px;
          .dynamic-item {
            float: left;
            margin: 3.5*@px;
            width: 240.5*@px;
            height: 240.5*@px;
            background: #000;
          }
        }
      }
    }
  }
</style>
