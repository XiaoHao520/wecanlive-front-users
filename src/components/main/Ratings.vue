<template>
  <div id="app-main-ratings">
    <header-common :backLink="backLink">
      <ul class="tab-list" slot="middle">
        <li class="tab-item">
          <router-link to="/ratings/diamond">鑽石榜</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/ratings/givegift">送禮榜</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/ratings/starlight">星光榜</router-link>
        </li>
      </ul>
    </header-common>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

    <footer-common active="home"></footer-common>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        transitionName: 'slide-left',
        backLink: { name: 'main_index' },
      };
    },
    beforeRouteUpdate(to, from, next) {
      const toDepth = to.path.split('/')[2].length;
      const fromDepth = from.path.split('/')[2].length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    },
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #app-main-ratings {
    .component-header-common {
      .tab-list {
        overflow: hidden;
        width: 450*@px;
        margin: 0 auto;
        height: @height-header;
        padding-top: 22*@px;
        .border-box();
        .tab-item {
          float: left;
          width: 150*@px;
          text-align: center;
          a {
            display: inline-block;
            color: #FFFFFF;
            font-size: 30*@px;
            padding-bottom: 5*@px;
            &.router-link-exact-active {
              border-bottom: 6*@px solid #00EDE7;
              color: #00EDE7;
            }
          }
        }
      }
    }

    .child-view {
      position: absolute;
      top: 36*@px+@height-header;
      bottom: @height-footer;
      left: 0;
      right: 0;
      z-index: 1;
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      &.not-status-bar {
        top: @height-header;
      }
    }

  }
</style>
