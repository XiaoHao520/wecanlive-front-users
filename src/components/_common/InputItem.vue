<template>
  <div class="component-input-item">
    <section class="section-input-text" v-if="display">
      <!--<div class="warn-text">-->
        <!--<span class="text">輸入了不符合wecanlive規範的文字</span>-->
      <!--</div>-->
      <!--输入框-->
      <div class="input-box-warpper">

        <div class="toggle-btn"
             :class="{checked: inputBarrage}"
             @click="toggleBarrage()">
          <transition name="fade">
            <div class="bg-color-gray" v-if="!inputBarrage"></div>
          </transition>
          <transition name="fade">
            <div class="bg-color-checked" v-if="inputBarrage"></div>
          </transition>
          <div class="btn">彈幕</div>
        </div>
        <a class="btn-more" @click="toggleMoreBox()"></a>
        <input type="text" :placeholder="placeholder" ref="input" v-model="content">
        <a class="btn-submit" @click="handleSubmit()">發送</a>
      </div>
      <!--输入框 END-->

      <div class="more-box-warpper" v-if="moreBox_display">
        <div class="top">
          <template v-if="bottomTab == 0">
            <swiper :options="swiperOption">
              <template v-for="page in Math.ceil(emoji_item.length / 25)">
                <swiper-slide>
                  <div class="slide-item">
                    <ul class="emoji-box">
                      <template v-for="(e, index) in emoji_item">
                        <li v-if="(index + 1) > (page-1) * 25 && (index + 1) <= page * 25"
                            class="emoji-item"
                            v-html="emoji(e)"
                            @click="emojiInput(e)">
                        </li>
                      </template>
                      <div class="btn-delete"></div>
                    </ul>
                  </div>
                </swiper-slide>
              </template>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </template>
          <template v-if="bottomTab == 1">
            <swiper :options="swiperOption">
              <swiper-slide>
                <div class="slide-item">
                  <ul class="gift-box">
                    <li class="gift-item" v-for="i in 9">
                      <div class="gift-image"></div>
                      <div class="deadline">15天</div>
                    </li>
                    <div class="btn-delete"></div>
                  </ul>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </template>
          <template v-if="bottomTab == 2">
            <swiper :options="swiperOption">
              <swiper-slide>
                <div class="slide-item">
                  <ul class="gift-box">
                    <li class="gift-item" v-for="i in 9">
                      <div class="gift-image"></div>
                      <div class="deadline">15天</div>
                    </li>
                    <div class="btn-delete"></div>
                  </ul>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </template>
        </div>
        <ul class="bottom-tab">
          <li class="tab-item tab-item-emoji"
              :class="{active: bottomTab == 0}"
              v-html="emoji(emoji_item[0])" @click="moreTabTo(0)"></li>
          <li class="tab-item"
              :class="{active: bottomTab == 1}"
              @click="moreTabTo(1)">禮物包
          </li>
          <li class="tab-item"
              :class="{active: bottomTab == 2}"
              @click="moreTabTo(2)">禮物包
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>

<script lang="babel">
  import twemoji from 'twemoji';

  export default {
    data() {
      return {
        inputBarrage: false,
        placeholder: '說點什麼...',
        moreBox_display: false,
        caret_pos: 0,
        content: '',
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: false,
          preventClicks: false,
        },
        emoji_page: 0,
        emoji_item: [
          '1f601',
          '1f602',
          '1f603',
          '1f604',
          '1f47f',
          '1f609',
          '1f60a',
          '263a',
          '1f60c',
          '1f60d',
          '1f60f',
          '1f612',
          '1f613',
          '1f614',
          '1f616',
          '1f618',
          '1f61a',
          '1f61c',
          '1f61d',
          '1f61e',
          '1f620',
          '1f621',
          '1f622',
          '1f623',
          '1f625',
          '1f628',
          '1f62a',
          '1f62d',
          '1f630',
          '1f631',
          '1f632',
          '1f633',
          '1f637',
          '1f648',
          '1f31a',
        ],
        bottomTab: 1,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Prize').get({
          action: 'get_user_prize_emoji',
        }).then((resp) => {
        });
      },
      handleSubmit() {
        const vm = this;
        const valObj = {
          content: vm.content,
          isBarrage: vm.inputBarrage,
        };
        vm.$emit('input', valObj);
        vm.content = '';
      },
      toggleMoreBox() {
        this.moreBox_display = !this.moreBox_display;
      },
      toggleBarrage() {
        const vm = this;
        vm.inputBarrage = !vm.inputBarrage;
        if (vm.inputBarrage) {
          vm.placeholder = '發送彈幕需要扣除xx金幣';
        } else {
          vm.placeholder = '說點什麼...';
        }
      },
      emojiInput(tw) {
        const vm = this;
        const ctrl = vm.$refs.input;
        if (document.selection) {
          ctrl.focus();
          const Sel = document.selection.createRange();
          Sel.moveStart('character', -ctrl.value.length);
          vm.caret_pos = Sel.text.length;
        } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
          vm.caret_pos = ctrl.selectionStart;
        }
        // CarePos 光标位置
        vm.content = vm.content.slice(0, vm.caret_pos) + twemoji.convert.fromCodePoint(tw) +
          vm.content.slice(vm.caret_pos, vm.content.length);
        if (ctrl.setSelectionRange) {
          vm.caret_pos += 2;
          ctrl.setSelectionRange(vm.caret_pos, vm.caret_pos);
        } else if (ctrl.createTextRange) {
          const range = ctrl.createTextRange();
          range.collapse(true);
          range.moveEnd('character', vm.caret_pos + 1);
          range.moveStart('character', vm.caret_pos + 1);
          range.select();
        }
      },
      emoji(val) {
        const e = twemoji.convert.fromCodePoint(val);
        return twemoji.parse(e);
      },
      moreTabTo(tab) {
        this.bottomTab = tab;
      },
    },
    props: {
      display: Boolean,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less">
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  img.emoji {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 35*@px;
    width: 35*@px;
  }

  .top {
    .swiper-container {
      .swiper-pagination,
      .swiper-pagination-bullets {
        bottom: 0;
      }
      .swiper-pagination-bullet {
        width: 12*@px;
        height: 12*@px;
        margin: 0 3*@px;
        background: #E4E4EB;
        &.swiper-pagination-bullet-active {
          background: #BABDBE;
        }
      }
    }
  }
</style>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-input-item {
    padding-top: 20*@px;
    .section-input-text {
      background: #FFFFFF;
      position: relative;
      .warn-text {
        position: absolute;
        height: 60*@px;
        line-height: 60*@px;
        width: 100%;
        text-align: center;
        color: #FFFFFF;
        font-size: 24*@px;
        top: -68*@px;
        .text {
          display: inline-block;
          height: 60*@px;
          line-height: 60*@px;
          padding: 0 40*@px;
          background: rgba(226, 58, 56, 0.8);
          .rounded-corners(60*@px);
        }
      }
      .input-box-warpper {
        height: 100*@px;
        width: 100%;
        .toggle-btn {
          float: left;
          margin-left: 20*@px;
          position: relative;
          width: 100*@px;
          height: 54*@px;
          margin-top: 23*@px;
          .bg-color-gray {
            background: #BABDBE;
            position: absolute;
            left: 0;
            top: 0;
            width: 100*@px;
            height: 54*@px;
            .rounded-corners(54*@px);
          }
          .bg-color-checked {
            background: @bg-header;
            position: absolute;
            left: 0;
            top: 0;
            width: 100*@px;
            height: 54*@px;
            .rounded-corners(54*@px);
          }
          .btn {
            position: absolute;
            z-index: 1;
            color: #8C8C8C;
            text-align: center;
            height: 50*@px;
            width: 50*@px;
            line-height: 50*@px;
            .rounded-corners(50%);
            background: #FFFFFF;
            font-size: 20*@px;
            left: 2*@px;
            top: 2.5*@px;
            transition: all .5s cubic-bezier(.55, 0, .1, 1);
          }
          &.checked {
            .btn {
              .transform(translate3d(92%, 0, 0));
              color: #0021E6;
            }
          }
        }
        .btn-more {
          float: left;
          width: 54*@px;
          height: 54*@px;
          margin-top: 23*@px;
          margin-left: 15*@px;
          background: url("../../assets/image/D/d2_3_icon_add@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        input {
          float: left;
          width: 405*@px;
          margin-left: 17*@px;
          margin-top: 35*@px;
          .placeholder-color(#BABDBE);
          color: #000;
          font-size: 24*@px;
          height: 30*@px;
          line-height: 30*@px;
        }
        .btn-submit {
          float: right;
          height: 100%;
          width: 120*@px;
          color: #FFFFFF;
          text-align: center;
          line-height: 100*@px;
          background: @bg-header;
          font-size: 29*@px;
        }
      }
      .more-box-warpper {
        border-top: 1px solid #E4E4EB;
        .top {
          height: 315*@px;
          .slide-item {
            display: block;
            height: 315*@px;
            width: 100%;
          }
          .emoji-box {
            position: relative;
            overflow: hidden;
            padding: 40*@px 30*@px 0;
            height: 100%;
            .border-box();
            .emoji-item {
              float: left;
              width: 76.5*@px;
              height: 76.5*@px;
              position: relative;
            }
            .btn-delete {
              position: absolute;
              right: 30*@px;
              bottom: 30*@px;
              width: 100*@px;
              height: 100*@px;
              background: url("../../assets/image/D/d2_3_icon_delete@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
          .gift-box {
            position: relative;
            overflow: hidden;
            padding: 44*@px 15*@px 0;
            li {
              float: left;
              position: relative;
              width: 110*@px;
              height: 110*@px;
              margin: 0 15*@px 15*@px;
              .gift-image {
                width: 100*@px;
                height: 100*@px;
                margin: 0 auto;
                background: url("../../assets/image/D/d2_4_gift3@3x.png") 50% 50% no-repeat;
                -webkit-background-size: cover;
                background-size: cover;
              }
              .deadline {
                position: absolute;
                top: 0;
                left: 0;
                height: 28*@px;
                width: 48*@px;
                line-height: 28*@px;
                text-align: center;
                color: #FFFFFF;
                font-size: 14*@px;
                background: url("../../assets/image/D/d2_3_tab_time@3x.png") 50% 50% no-repeat;
                -webkit-background-size: cover;
                background-size: cover;
              }
            }
            .btn-delete {
              position: absolute;
              right: 40*@px;
              bottom: 30*@px;
              width: 100*@px;
              height: 100*@px;
              background: url("../../assets/image/D/d2_3_icon_delete@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
        }
        .bottom-tab {
          height: 80*@px;
          width: 100%;
          background: #E4E4EB;
          padding: 0 80*@px;
          .border-box();
          .tab-item {
            position: relative;
            float: left;
            height: 80*@px;
            line-height: 80*@px;
            text-align: center;
            color: #8C8C8C;
            font-size: 21*@px;
            width: 100*@px;
            &.active {
              background: #FFFFFF;
              color: #0021E6;
            }
            &.tab-item-emoji {
              width: 80*@px;
            }
          }
        }
      }
    }
  }
</style>
