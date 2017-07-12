<template>
  <!--<router-view></router-view>-->
  <div>
    <header class="component-header-index"
            :class="{'not-status-bar': !overlapStatusBar}">
      <ul class="tab-list">
        <li class="tab-item active">
          <router-link to="/">追蹤</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/hot">熱門</router-link>
        </li>
        <!--<li class="tab-item">-->
          <!--<router-link to="/movie">節目</router-link>-->
        <!--</li>-->
        <!--<li class="tab-item">-->
          <!--<router-link to="/discover">發現</router-link>-->
        <!--</li>-->
        <!--<li class="tab-item">-->
          <!--<router-link to="/thenearby">附近</router-link>-->
        <!--</li>-->
      </ul>
      <!--<router-link to="/ratings/diamond" class="nav-other"></router-link>-->
    </header>

    <transition :name="transitionName">
      <router-view class="child-view-container"
                   :class="{'not-status-bar': !overlapStatusBar}"></router-view>
    </transition>

    <footer-common></footer-common>

    <member-card :display="memberCard" @click="toggleMemberCard"></member-card>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left',
        memberCard: false,
      };
    },
    beforeRouteUpdate(to, from, next) {
      const toDepth = to.path.split('/')[1].length;
      const fromDepth = from.path.split('/')[1].length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    },
    methods: {
      reload() {
      },
      toggleMemberCard(value) {
        this.memberCard = value;
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .child-view-container {
    position: absolute;
    top: 128*@px;
    bottom: @height-footer;
    left: 0;
    right: 0;
    z-index: 1;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    &.not-status-bar {
      top: 92*@px;
    }
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(50%, 0, 0);
    transform: translate3d(50%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }

  .component-header-index {
    background: @bg-header;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 36*@px;
    height: 92*@px;
    overflow: hidden;
    &.not-status-bar {
      padding-top: 0;
    }
    .tab-list {
      float: left;
      overflow: hidden;
      padding: 0 0 0 30*@px;
      margin: 22*@px 0 0 0;
      .tab-item {
        float: left;
        list-style: none;
        margin: 0 28*@px;
        a {
          display: block;
          font-size: 32*@px;
          padding-bottom: 5*@px;
          color: #FFFFFF;
          text-decoration: none;
          &.router-link-exact-active {
            color: #00D9D3;
            border-bottom: 5*@px solid #00D9D3;
          }
        }
      }
    }
    .nav-other {
      float: left;
      margin-top: 21*@px;
      margin-left: 31*@px;
      width: 50*@px;
      height: 50*@px;
      background: url("../../assets/image/B1/nav_icon_cup@3x.png") 50% 50% no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
</style>
