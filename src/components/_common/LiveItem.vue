<template>
  <footer class="component-footer-common">
    <div class="footer-warpper">
      <a class="footer-btn-home"
         @click="goto('main_index', 'home')"
         :class="{'footer-avtive': act == 'home'}"></a>
      <a class="footer-btn-member"
         @click="goto('main_index', 'person')"
         :class="{'footer-avtive': act == 'person'}"></a>
      <div class="footer-btn-popup"></div>
      <a class="footer-btn-search"
         @click="goto('main_index', 'search')"
         :class="{'footer-avtive': act == 'search'}"></a>
      <a class="footer-btn-message"
         @click="goto('main_index', 'message')"
         :class="{'footer-avtive': act == 'message'}"></a>
    </div>
  </footer>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        act: '',
      };
    },
    methods: {
      reload() {
        this.act = this.active;
      },
      goto(routeName, active) {
        const vm = this;
        vm.act = active;
        vm.$router.push({ name: routeName });
      },
    },
    props: {
      active: String,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .component-footer-common {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: @height-footer;
    background: #FFFFFF;
    .footer-warpper {
      width: 100%;
      height: 100%;
      position: relative;
      .border-box();
      padding-top: 19*@px;
      .footer-btn-home {
        float: left;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_home_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        margin-left: 45*@px;
        &.footer-avtive {
          background-image: url("../../assets/image/B1/icon_home_pred@3x.png");
        }
      }
      .footer-btn-member {
        float: left;
        margin-left: 90*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_person_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive {
          background-image: url("../../assets/image/B1/icon_person-_pred@3x.png");
        }
      }
      .footer-btn-message {
        float: right;
        margin-right: 90*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_message_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive {
          background-image: url("../../assets/image/B1/icon_message_pred@3x.png");
        }
      }
      .footer-btn-search {
        float: right;
        margin-right: 45*@px;
        display: block;
        width: 60*@px;
        height: 60*@px;
        background: url("../../assets/image/B1/icon_search_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        &.footer-avtive {
          background-image: url("../../assets/image/B1/icon_search_pred@3x.png");
        }
      }
      .footer-btn-popup {
        position: absolute;
        bottom: 22*@px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 120*@px;
        height: 120*@px;
        background: url("../../assets/image/B1/icon_live_nor@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
  }
</style>
