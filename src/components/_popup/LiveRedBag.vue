<template>
  <div id="live-red-bag">
    <transition name="popin">
      <div class="red-block" v-if="display && red_choice">
        <div class="red-header" :class="{'diamond-header' : diamond}">
          點擊選擇紅包大小
          <!--todo-->
          <a v-if="!diamond" href="javascript:;" class="balance-recharge">
            <div class="coin-icon"></div>
            400<i></i>充值
            <div class="icon-caret"></div>
          </a>
        </div>

        <div class="red-list">
          <ul>
            <li class="red-item" @click="redChoice()">
              <div class="red-icon"></div>
              <div class="red-recharge">
                <div class="icon"></div>
                500
              </div>
            </li>

            <li class="red-item" @click="redChoice()">
              <div class="red-icon"></div>
              <div class="red-recharge diamond-icon">
                500
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="popin">
      <div v-if="display && red_confirm" class="red-confirm-block">
        <div class="red-confirm-header">
          <div class="title">提示</div>
        </div>

        <div class="red-confirm-content">
          是否發送價值爲
          <div class="price"><span>500</span>金幣</div>
          的紅包
        </div>


        <div class="red-action">
          <a href="javascript:;" @click="handleClick" class="btn btn-cancel">取消</a>
          <a href="javascript:;" @click="submitRed()" class="btn btn-submit">送出</a>
        </div>
      </div>
    </transition>

    <transition name="popin">
      <div class="send-success" @click="handleClick" v-if="display && success">
        <div class="icon"></div>
        <div class="success">發送成功</div>
      </div>
    </transition>

    <transition name="popin">
      <div class="send-success" @click="handleClick" v-if="display && fail">
        <div class="icon fail-icon"></div>
        <div class="success">金幣不足，請多多修煉</div>
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
        diamond: false,
        red_choice: true,
        red_confirm: false,
        success: false,
        fail: false,
      };
    },
    methods: {
      reload() {
      },
      handleClick(evt) {
        const vm = this;
        vm.diamond = true;
        vm.red_choice = true;
        vm.red_confirm = false;
        vm.success = false;
        vm.fail = false;
        this.$emit('click', !this.display);
      },
      redChoice() {
        const vm = this;
        vm.red_choice = false;
        vm.red_confirm = true;
      },
      submitRed() {
        const vm = this;
        vm.red_confirm = false;
        vm.fail = true;
        setTimeout(() => {
          vm.handleClick();
        }, 1500);
      },
    },
    props: {
      display: Boolean,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
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
          padding: 0 0 0 41*@px;
          .coin-icon {
            width: 32*@px;
            height: 32*@px;
            background: url("../../assets/image/F/f_icon_coin@3x.png") 50% 50% no-repeat;
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
          .icon-caret {
            float: right;
            margin-top: 34*@px;
            width: 32*@px;
            height: 32*@px;
            background: url("../../assets/image/D/d1_1_icon_back@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            .transform(rotate(180deg));
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
            background: url("../../assets/image/F/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 60*@px;
            &.diamond-icon {
              background-image: url("../../assets/image/F/f_icon_diamond@3x.png");
            }
          }
        }
      }
    }

    .red-confirm-block {
      position: fixed;
      .border-radius(15*@px);
      overflow: hidden;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 590*@px;
      z-index: 999;
      .red-confirm-header {
        height: 100*@px;
        background: @bg-header;
        text-align: center;
        .title {
          line-height: 100*@px;
          height: 100*@px;
          color: #fff;
          font-size: 36*@px;
          display: inline-block;
          padding-left: 56*@px;
          background: url("../../assets/image/D/d_icon_warning@3x.png") 0 50% no-repeat;
          background-size: 42*@px;
        }
      }
      .red-confirm-content {
        height: 200*@px;
        line-height: 200*@px;
        font-size: 28*@px;
        background: #fff;
        text-align: center;
        .price {
          font-size: 36*@px;
          color: #A927FD;
          display: inline-block;
          span {
            margin: 0 13*@px;
          }
        }
      }
      .red-action {
        border-top: 1px solid @color-border;
        background: #fff;
        position: relative;
        .btn {
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;
          font-size: 38*@px;
          color: #8D8D8D;
          &.btn-cancel {
            border-right: 1px solid @color-border;
          }
          &.btn-submit {
            color: #2D02ED;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }

    .send-success {
      position: fixed;
      .border-radius(15*@px);
      overflow: hidden;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 999;
      width: 570*@px;
      background: #fff;
      padding: 36*@px 0;
      .icon {
        width: 150*@px;
        height: 150*@px;
        background: url("../../assets/image/D/d1_icon_success@3x.png") 50% 50% no-repeat;
        background-size: 100%;
        margin: 0 auto;
        &.fail-icon {
          background-image: url('../../assets/image/D/d1_icon_failed@3x.png');
        }
      }
      .success {
        margin-top: 30*@px;
        font-size: 28*@px;
        text-align: center;
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
