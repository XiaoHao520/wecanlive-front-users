<template>
  <div id="live-red-bag">
    <transition name="popin">
      <div class="red-block" v-if="display">
        <div class="red-header" :class="{'diamond-header' : diamond}">
          點擊選擇紅包大小
          <!--todo-->
          <a v-if="!diamond" href="javascript:;" class="balance-recharge">
            <div class="coin-icon"></div>
            400<i></i>充值
          </a>
        </div>

        <div class="red-list">
          <ul>
            <li class="red-item">
              <div class="red-icon"></div>
              <div class="red-recharge">
                <div class="icon"></div>
                500
              </div>
            </li>

            <li class="red-item">
              <div class="red-icon"></div>
              <div class="red-recharge diamond-icon">
                500
              </div>
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
        diamond: true,
      };
    },
    methods: {
      reload() {
      },
      handleClick(evt) {
        this.$emit('click', !this.display);
      },
    },
    props: {
      display: Boolean,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #live-red-bag {
    .maske {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.5);
    }
    .red-block {
      .border-radius(15*@px);
      position: fixed;
      top: 50%;
      left: 50%;
      width: 690*@px;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 999;
      overflow: hidden;
      .red-header {
        height: 100*@px;
        background: @bg-header;
        padding: 0 30*@px;
        font-size: 38*@px;
        line-height: 100*@px;
        color: #fff;
        position: relative;
        &.diamond-header {
          text-align: center;
        }
        .balance-recharge {
          display: block;
          position: absolute;
          right: 30*@px;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          color: #fff;
          padding: 0 25*@px 0 41*@px;
          .coin-icon {
            width: 32*@px;
            height: 32*@px;
            background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
          }
          i {
            display: inline-block;
            width: 30*@px;
          }
        }
      }
      .red-list {
        padding-top: 10*@px;
        background: #fff;
        .red-item {
          padding: 18*@px 0 33*@px 70*@px;
          border-bottom: 1px solid @color-border;
          position: relative;
          &:last-child {
            border-bottom: 0;
          }
          .red-icon {
            background: url("../../assets/image/D/d1_icon_redpocket_b@3x.png") 50% 50% no-repeat;
            width: 75*@px;
            height: 90*@px;
            background-size: 100%;
          }
          .red-recharge {
            position: absolute;
            right: 0;
            top: 50%;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
            width: 230*@px;
            padding-left: 80*@px;
            box-sizing: border-box;
            height: 60*@px;
            line-height: 68*@px;
            font-size: 35*@px;
            background: url("../../assets/image/f-f4/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 60*@px;
            &.diamond-icon {
              background-image: url("../../assets/image/f-f4/f_icon_diamond@3x.png");
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
  }
</style>
