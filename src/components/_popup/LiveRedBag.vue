<template>
  <div id="live-redbag">
    <transition name="popin">
      <div class="bag-block" v-if="display && bag">
        <div class="vip-header">
          享要與衆不同？馬上升級VIP
          <a href="javascript:;" class="vip-btn">
            <div class="vip-icon"></div>
            升級 VIP
          </a>
        </div>

        <div class="gift-menu">
          <a href="javascript:;"
             :class="{'tab-active' : tab==0}"
             @click="tabTo(0)"
             class="gift-type">活動禮物</a>
          <a href="javascript:;"
             @click="tabTo(1)"
             :class="{'tab-active' : tab==1}"
             class="gift-type">寶盒禮物</a>

          <div class="underline "
               :class="{
             'position-1': tab==0,
             'position-2': tab==1,
              }"></div>
        </div>

        <transition :name="transitionName">
          <div v-if="tab==0" class="active-gift gift-list">

            <!--todo 沒有禮物-->
            <!--<div></div>-->

            <ul>
              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>


              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>
            </ul>
          </div>
        </transition>

        <transition :name="transitionName">
          <div v-if="tab==1" class="box-gift gift-list">
            <ul>
              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>


              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>
            </ul>
          </div>
        </transition>

        <div class="gift-footer">
          <a href="javascript:;" class="gift-bag-type" @click="BagShop()">
            <div class="type-icon"></div>
            <div class="type">商店</div>
          </a>
          <a href="javascript:;" class="gift-bag-type">
            <div class="type-icon"></div>
            <div class="type">背包</div>
          </a>

          <div class="gift-num">
            <a href="javascript:;">
              <div class="select-icon"></div>
              1</a>
          </div>

          <div class="send-btn">贈送</div>
        </div>
      </div>
    </transition>

    <transition name="popin">
      <div class="bag-block" v-if="display && shop">
        <div class="vip-header">
          享要與衆不同？馬上升級VIP
          <a href="javascript:;" class="vip-btn">
            <div class="vip-icon"></div>
            升級 VIP
          </a>
        </div>

        <div class="gift-menu ">
          <a href="javascript:;"
             :class="{'tab-active' : shoptab==0}"
             @click="shoptabTo(0)"
             class="gift-type shop-type">xx禮物</a>

          <a href="javascript:;"
             @click="shoptabTo(1)"
             :class="{'tab-active' : shoptab==1}"
             class="gift-type shop-type">xx禮物</a>

          <a href="javascript:;"
             @click="shoptabTo(2)"
             :class="{'tab-active' : shoptab==2}"
             class="gift-type shop-type">xx禮物</a>

          <a href="javascript:;"
             @click="shoptabTo(3)"
             :class="{'tab-active' : shoptab==3}"
             class="gift-type shop-type">xx禮物</a>

          <div class="show-underline"
               :class="{
             'position-1': shoptab==0,
             'position-2': shoptab==1,
             'position-3': shoptab==2,
             'position-4': shoptab==3,
              }"></div>
        </div>

        <transition :name="shpptransition">
          <div v-if="shoptab==0" class="active-gift gift-list">
            <ul>
              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>


              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>
            </ul>
          </div>
        </transition>

        <transition :name="shpptransition">
          <div v-if="shoptab==1" class="box-gift gift-list">
            <ul></ul>
          </div>
        </transition>

        <transition :name="shpptransition">
          <div v-if="shoptab==2" class="active-gift gift-list">
            <ul>
              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>


              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>
            </ul>
          </div>
        </transition>

        <transition :name="shpptransition">
          <div v-if="shoptab==3" class="active-gift gift-list">
            <ul>
              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>

              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>


              <li class="gift-item">
                <div class="gift-icon"></div>
                <div class="gift-name">超值禮物</div>
                <div class="gift-num">7000 x3</div>
              </li>
            </ul>
          </div>
        </transition>

        <div class="gift-footer">
          <a href="javascript:;" class="gift-bag-type">
            <div class="type-icon"></div>
            <div class="type">商店</div>
          </a>
          <a href="javascript:;" class="gift-bag-type" @click="BagShop()">
            <div class="type-icon"></div>
            <div class="type">背包</div>
          </a>

          <div class="gift-num">
            <a href="javascript:;">
              <div class="select-icon"></div>
              1</a>
          </div>

          <div class="send-btn">贈送</div>
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
        tab: 0,
        shoptab: 0,
        bag: true,
        shop: false,
        transitionName: 'slide-left',
        shpptransition: 'slide-left',
      };
    },
    methods: {
      reload() {
      },
      handleClick(evt) {
        const vm = this;
        vm.tab = 0;
        vm.shoptab = 0;
        vm.bag = true;
        vm.shop = false;
        vm.transitionName = 'slide-left';
        vm.shpptransition = 'slide-left';
        this.$emit('click', !this.display);
      },
      tabTo(pos) {
        const vm = this;
        const index = vm.tab;
        vm.transitionName = Number(pos) > Number(index) ? 'slide-left' : 'slide-right';
        setTimeout(() => {
          vm.tab = pos;
        }, 0);
      },
      shoptabTo(pos) {
        const vm = this;
        const index = vm.shoptab;
        vm.shpptransition = Number(pos) > Number(index) ? 'slide-left' : 'slide-right';
        setTimeout(() => {
          vm.shoptab = pos;
        }, 0);
      },
      BagShop() {
        const vm = this;
        vm.bag = !vm.bag;
        vm.shop = !vm.shop;
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

  #live-redbag {
    .maske {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.5);
    }
    .bag-block {
      .border-radius(15*@px);
      overflow: hidden;
      position: fixed;
      width: 690*@px;
      left: 50%;
      bottom: 30*@px;
      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      background: #fff;
      z-index: 999;
      height: 736*@px;
      .vip-header {
        height: 90*@px;
        line-height: 90*@px;
        background: @bg-header;
        color: #fff;
        font-size: 32*@px;
        position: relative;
        padding: 0 30*@px;
        box-sizing: border-box;
        .vip-btn {
          display: block;
          position: absolute;
          right: 20*@px;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          background: #fff;
          color: #2E02ED;
          line-height: 64*@px;
          height: 64*@px;
          width: 172*@px;
          padding-left: 68*@px;
          box-sizing: border-box;
          font-size: 20*@px;
          border-radius: 30*@px;
          .vip-icon {
            height: 30*@px;
            width: 35*@px;
            position: absolute;
            left: 23*@px;
            top: 17*@px;
            background: 50% 50% no-repeat #ccc;
            background-size: 100%;
          }
        }
      }
      .gift-menu {
        height: 74*@px;
        border-bottom: 1px solid @color-border;
        .clearfix();
        position: relative;
        .gift-type {
          text-align: center;
          line-height: 74*@px;
          float: left;
          width: 50%;
          height: 100%;
          color: #8D8D8D;
          font-size: 24*@px;
          &.shop-type {
            width: 100%/4;
          }
          &.tab-active {
            color: #2D02ED;
          }
        }
        .underline {
          width: 50%;
          position: absolute;
          bottom: 0;
          height: 4*@px;
          background: svg-gradient(to right, #00A1F5, #00EEE8);
          -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -moz-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -ms-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -o-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          transition: all .5s cubic-bezier(.55, 0, .1, 1);
          &.position-1 {
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          &.position-2 {
            -webkit-transform: translate3d(100%, 0, 0);
            -moz-transform: translate3d(100%, 0, 0);
            -ms-transform: translate3d(100%, 0, 0);
            -o-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
          }
        }
        .show-underline {
          width: 25%;
          position: absolute;
          bottom: 0;
          height: 4*@px;
          background: svg-gradient(to right, #00A1F5, #00EEE8);
          -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -moz-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -ms-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          -o-transition: all .5s cubic-bezier(.55, 0, .1, 1);
          transition: all .5s cubic-bezier(.55, 0, .1, 1);
          &.position-1 {
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          &.position-2 {
            -webkit-transform: translate3d(100%, 0, 0);
            -moz-transform: translate3d(100%, 0, 0);
            -ms-transform: translate3d(100%, 0, 0);
            -o-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
          }
          &.position-3 {
            -webkit-transform: translate3d(200%, 0, 0);
            -moz-transform: translate3d(200%, 0, 0);
            -ms-transform: translate3d(200%, 0, 0);
            -o-transform: translate3d(200%, 0, 0);
            transform: translate3d(200%, 0, 0);
          }
          &.position-4 {
            -webkit-transform: translate3d(300%, 0, 0);
            -moz-transform: translate3d(300%, 0, 0);
            -ms-transform: translate3d(300%, 0, 0);
            -o-transform: translate3d(300%, 0, 0);
            transform: translate3d(300%, 0, 0);
          }
        }
      }

      .gift-list {
        position: absolute;
        top: 164*@px;
        left: 0;
        right: 0;
        height: 482*@px;
        box-sizing: border-box;
        background: #fff;
        padding: 46*@px 0 0 0;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);

        ul {
          .clearfix();
        }
        .gift-item {
          float: left;
          margin: 0 35*@px;
          width: 100*@px;
          color: #4D4D4F;
          font-size: 24*@px;
          text-align: center;
          .gift-icon {
            width: 100*@px;
            height: 106*@px;
            background: 50% 50% no-repeat #ccc;
            background-size: 100%;
            margin: 0 auto;
          }
          .gift-name {
            margin-top: 15*@px;
            height: 24*@px;
            line-height: 24*@px;
          }
          .gift-num {
            margin-top: 13*@px;
            height: 24*@px;
            line-height: 24*@px;
          }
        }
      }

      .gift-footer {
        height: 90*@px;
        padding: 12*@px 30*@px 0 37*@px;
        background: @bg-header;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        box-sizing: border-box;
        .clearfix();
        .gift-bag-type {
          float: left;
          margin-right: 163*@px;
          &:first-child {
            margin-right: 40*@px;
          }
          .type-icon {
            height: 44*@px;
            width: 47*@px;
            background: 50% 50% no-repeat #ccc;
            background-size: 100%;
            margin: 0 auto;
          }
          .type {
            font-size: 16*@px;
            height: 16*@px;
            line-height: 16*@px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            margin-top: 7*@px;
          }
        }
        .gift-num {
          background: #fff;
          height: 67*@px;
          border-radius: 35*@px;
          width: 125*@px;
          padding-left: 73*@px;
          box-sizing: border-box;
          position: relative;
          line-height: 67*@px;
          font-size: 32*@px;
          float: left;
          color: #2E02ED;
          .select-icon {
            position: absolute;
            top: 50%;
            left: 30*@px;
            width: 25*@px;
            height: 15*@px;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
            background: 50% 50% no-repeat #ccc;
            background-size: 25*@px;
          }
        }
        .send-btn {
          width: 172*@px;
          float: right;
          background: #fff;
          border-radius: 35*@px;
          text-align: center;
          color: #2E02ED;
          font-size: 28*@px;
          height: 67*@px;
          line-height: 67*@px;
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
