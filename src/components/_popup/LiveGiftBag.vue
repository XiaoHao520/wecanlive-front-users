<template>
  <div id="live-giftbag">
    <transition name="slide-down-up">
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
          <a href="javascript:;"
             @click="tabTo(2)"
             :class="{'tab-active' : tab==2}"
             class="gift-type">VIP回饋禮物</a>
          <div class="underline "
               :class="{
             'position-1': tab==0,
             'position-2': tab==1,
             'position-3': tab==2,
              }"></div>
        </div>

        <!-- 揹包 -->
        <transition :name="transitionName">
          <div v-if="tab==0" class="active-gift gift-list">

            <div v-if="active_prize.active_prize.length==0" class="null-block">
              <div class="null-icon"></div>
              <div class="null-warn">背包是空的～</div>
            </div>

            <ul v-else>
              <li v-for="prize in active_prize.active_prize"
                  @click="chooseActivePrize(prize,'ACTIVITY')"
                  class="gift-item">
                <div class="gift-icon" :style="{backgroundImage: 'url(' + prize.icon + ')'}">
                  <div class="num" v-if="prize.count >0">{{prize.count}}</div>
                </div>
                <div class="gift-name">{{ prize.name }}</div>
                <div class="gift-num">{{ prize.price }}</div>
              </li>
            </ul>
          </div>
        </transition>

        <!-- 揹包 -->
        <transition :name="transitionName">
          <div v-if="tab==1" class="box-gift gift-list starbox-gift">

            <div class="distance">
              <div class="distance-intro">
                <div class="text">
                  距離一個星光寶盒還需送出 {{ star_index > 500 ? 0 : 500 - star_index }} 元氣的禮物
                </div>
                <div class="num">{{ star_index }} / 500</div>
              </div>
              <div class="plan">
                <div class="ready" :style="{width:(star_index/5)+'%'}"></div>
              </div>

              <div class="gift-choose">
                <a href="javascript:;"
                   v-for="i in 3"
                   @click="openBoxGift(i)"
                   :class="{'open-box-icon': star_box_num === i}"
                   class="gift-item box-icon"></a>
              </div>
            </div>
            <ul>
              <li v-for="prize in active_prize.box_prize"
                  @click="chooseActivePrize(prize,'STAR_BOX')"
                  class="gift-item">
                <div class="gift-icon" :style="{backgroundImage:'url('+prize.icon + ')'}">
                  <div class="num" v-if="prize.count >0">{{prize.count}}</div>
                </div>
                <div class="gift-name">{{ prize.name }}</div>
              </li>
            </ul>
          </div>
        </transition>

        <!-- 揹包 -->
        <transition :name="transitionName">
          <div v-if="tab==2" class="box-gift gift-list">
            <div v-if="active_prize.vip_prize.length==0" class="null-block">
              <div class="null-icon"></div>
              <div class="null-warn">背包是空的～</div>
            </div>

            <ul v-else>
              <li v-for="prize in active_prize.vip_prize"
                  @click="chooseActivePrize(prize, 'VIP')"
                  class="gift-item">
                <div class="gift-icon" :style="{backgroundImage: 'url('+ prize.icon +')'}">
                  <div class="num" v-if="prize.count >0">{{prize.count}}</div>
                </div>
                <div class="gift-name">{{ prize.name }}</div>
              </li>
            </ul>
          </div>
        </transition>

        <div class="gift-footer">
          <a href="javascript:;" class="gift-bag-type" @click="BagShop()">
            <div class="type-icon shop-icon-nor"></div>
            <div class="type">商店</div>
          </a>
          <a href="javascript:;" class="gift-bag-type">
            <div class="type-icon bag-icon"></div>
            <div class="type active-type">背包</div>
          </a>

          <div class="gift-num">
            <a href="javascript:;">
              <div class="select-icon"></div>
              {{ active_prize_count }}</a>

            <select class="count-select" v-model="active_prize_count">
              <option v-for="i in active_prize_count_total" :value="i">{{ i }}</option>
            </select>
          </div>

          <div @click="sendActivePrize()" class="send-btn">贈送</div>
        </div>
      </div>
    </transition>

    <!-- 商店 -->
    <transition name="slide-down-up">
      <div class="bag-block" v-if="display && shop">
        <div class="vip-header">
          享要與衆不同？馬上升級VIP
          <a href="javascript:;" class="vip-btn">
            <div class="vip-icon"></div>
            升級 VIP
          </a>
        </div>

        <div class="gift-menu ">
          <a v-for="(category, i) in prize_categories" href="javascript:;"
             :class="{'tab-active' : shoptab==i}"
             @click="shoptabTo(i)"
             :style="{width: (1 / prize_categories.count) * 100 + '%'}"
             class="gift-type shop-type">{{ category.name }}</a>

          <!--<a href="javascript:;"-->
          <!--@click="shoptabTo(1)"-->
          <!--:class="{'tab-active' : shoptab==1}"-->
          <!--class="gift-type shop-type">xx禮物</a>-->
          <!---->
          <!--<a href="javascript:;"-->
          <!--@click="shoptabTo(2)"-->
          <!--:class="{'tab-active' : shoptab==2}"-->
          <!--class="gift-type shop-type">xx禮物</a>-->
          <!---->
          <!--<a href="javascript:;"-->
          <!--@click="shoptabTo(3)"-->
          <!--:class="{'tab-active' : shoptab==3}"-->
          <!--class="gift-type shop-type">xx禮物</a>-->

          <div class="show-underline"
               :style="{width: (1 / prize_categories.count) * 100 + '%'}"
               :class="{
             'position-1': shoptab==0,
             'position-2': shoptab==1,
             'position-3': shoptab==2,
             'position-4': shoptab==3,
             'position-5': shoptab==4,
             'position-6': shoptab==5,
             'position-7': shoptab==6,
              }"></div>
        </div>

        <template v-for="(category, i) in prize_categories">
          <transition :name="shpptransition">
            <div v-if="shoptab==i" class="active-gift gift-list">
              <ul>
                <li v-for="p in category.prizes_item"
                    @click="choosePrize(p)"
                    class="gift-item"
                    :class="{active: p.id==prize.id}">
                  <div class="gift-icon" :style="{backgroundImage: 'url('+ p.icon_item.image +')'}"></div>
                  <div class="gift-name">{{ p.name }}</div>
                  <div class="gift-num"
                       :class="{star: p.price_type==='STAR'}">{{ p.price }}
                  </div>
                  <div class="gift-exp">+300 經驗</div>
                </li>
              </ul>
            </div>
          </transition>
        </template>

        <div class="gift-footer">
          <a href="javascript:;" class="gift-bag-type">
            <div class="type-icon shop-icon"></div>
            <div class="type active-type">商店</div>
          </a>
          <a href="javascript:;" class="gift-bag-type" @click="BagShop()">
            <div class="type-icon bag-icon-nor"></div>
            <div class="type">背包</div>
          </a>

          <div class="gift-num">
            <a href="javascript:;">
              <div class="select-icon"></div>
              {{ prize_count }}
            </a>

            <select class="count-select" v-model="prize_count">
              <option v-for="i in 10" :value="i">{{ i }}</option>
            </select>
          </div>

          <div class="send-btn" @click="buyPrize">贈送</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="maske" @click="reset(); $emit('hide');" v-if="display"></div>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        model: 'Live',
        tab: 0,
        shoptab: 0,
        bag: true,
        shop: false,
        transitionName: 'slide-left',
        shpptransition: 'slide-left',
        prize_categories: [],
        prize: 0,
        prize_count: 1,
        active_prize: [],
        active: 0,
        active_prize_count: 1,
        active_prize_count_total: 1,
        star_box_num: null,
        view_starbox_distance: 0,
        source_tag: '',
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('PrizeCategory').get({
          normal: 'True',
        }).then((resp) => {
          Promise.all(resp.data.results.map(item =>
            vm.api('Prize').get({
              category: item.id,
              page_size: 100,
            }).then(resp2 => {
              item.prizes_item = resp2.data.results;
            })
          )).then(() => {
            vm.prize_categories = resp.data.results;
          });
        });

        vm.api('Prize').get({
          action: 'get_user_active_prize',
        }).then((resp) => {
          vm.active_prize = resp.data;
        });

        if (vm.me.star_prize_expend > 500) {
          vm.view_starbox_distance = 0;
        } else {
          vm.view_starbox_distance = 500 - vm.me.star_prize_expend;
        }
      },
      reset() {
        const vm = this;
        vm.tab = 0;
        vm.shoptab = 0;
        vm.bag = true;
        vm.shop = false;
        vm.prize = 0;
        vm.transitionName = 'slide-left';
        vm.shpptransition = 'slide-left';
        vm.active = 0;
        vm.active_prize_count = 1;
        vm.active_prize_count_total = 1;
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
        // 切换背包商城，数据初始化
        vm.prize = 0;
        vm.active = 0;
        vm.prize_count = 1;
        vm.active_prize_count_total = 1;
        vm.active_prize_count = 1;
        vm.bag = !vm.bag;
        vm.shop = !vm.shop;
      },
      buyPrize() {
        //
        const vm = this;
        if (vm.prize === 0) {
          vm.notify('請選擇禮物');
          return;
        }
        vm.api().save({
          id: vm.$route.params.id,
          action: 'buy_prize',
        }, {
          prize: vm.prize.id,
          count: vm.prize_count,
        }).then((resp) => {
          vm.reset();
          // 这将返回一个 PrizeOrder 对象
          this.$emit('apply', resp.data);
        });
      },
      sendActivePrize() {
        //
        const vm = this;
        if (vm.active === 0) {
          vm.notify('請選擇禮物');
          return;
        }
        vm.api().save({
          id: vm.$route.params.id,
          action: 'send_active_prize',
        }, {
          prize: vm.active,
          count: vm.active_prize_count,
          source_tag: vm.source_tag,
        }).then((resp) => {
          // 更新剩餘禮物數量
          vm.reload();
          // 重新設置動作
          vm.reset();
          // 这将返回一个 PrizeOrder 对象
          this.$emit('apply', resp.data);
        });
      },
      choosePrize(prize) {
        // 选择商店礼物
        const vm = this;
        if (vm.prize === prize) {
          return;
        }
        vm.prize = prize;
        vm.prize_count = 1;
      },
      chooseActivePrize(prize, sourceTag) {
        // 选择活动礼物
        const vm = this;
        if (vm.active === prize.id) {
          return;
        }
        vm.active_prize_count = 1;
        vm.active_prize_count_total = prize.count;
        vm.active = prize.id;
        vm.source_tag = sourceTag;
      },
      openBoxGift(i) {
        const vm = this;
        if (vm.star_box_num) return;
        vm.star_box_num = i;
        vm.api('StarBoxRecord').save({
          action: 'open_star_box',
        }, {
          live: vm.$route.params.id,
          identity: 'sender',
        }).then((resp) => {
          setTimeout(() => {
            vm.star_box_num = null;
          }, 4000);
          vm.authenticate(true).then(() => {
            vm.reload();
          });
        });
      },
    },
    computed: {
      is_author() {
        const vm = this;
        return vm.live.author === vm.me.id;
      },
      star_index() {
        const vm = this;
        return vm.is_author ? vm.me.star_index_receiver_balance
          : vm.me.star_index_sender_balance;
      },
      star_index_remain() {
        const vm = this;
        return 500 - vm.star_index % 500;
      },
    },
    props: {
      display: Boolean,
      live: Object,
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #live-giftbag {
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
            background: url("../../assets/image/D/d2_4_icon_upvip@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
      }
      .gift-menu {
        height: 74*@px;
        border-bottom: 1px solid #BCBEC0;
        .clearfix();
        position: relative;
        .gift-type {
          text-align: center;
          line-height: 74*@px;
          float: left;
          width: 100%/3;
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
          width: 100%/3;
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
          &.position-5 {
            -webkit-transform: translate3d(400%, 0, 0);
            -moz-transform: translate3d(400%, 0, 0);
            -ms-transform: translate3d(400%, 0, 0);
            -o-transform: translate3d(400%, 0, 0);
            transform: translate3d(400%, 0, 0);
          }
          &.position-6 {
            -webkit-transform: translate3d(500%, 0, 0);
            -moz-transform: translate3d(500%, 0, 0);
            -ms-transform: translate3d(500%, 0, 0);
            -o-transform: translate3d(500%, 0, 0);
            transform: translate3d(500%, 0, 0);
          }
          &.position-7 {
            -webkit-transform: translate3d(600%, 0, 0);
            -moz-transform: translate3d(600%, 0, 0);
            -ms-transform: translate3d(600%, 0, 0);
            -o-transform: translate3d(600%, 0, 0);
            transform: translate3d(600%, 0, 0);
          }
        }
      }

      .gift-list {
        position: absolute;
        top: 165*@px;
        left: 0;
        right: 0;
        height: 482*@px;
        overflow-y: scroll;
        .app-scroll();
        box-sizing: border-box;
        background: #fff;
        padding: 46*@px 0 0 0;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);

        &.starbox-gift {
          padding-top: 25*@px;
        }
        .distance {
          padding: 0 50*@px;
          margin-bottom: 30*@px;
          .distance-intro {
            .clearfix();
            color: #B0B0B0;
            font-size: 24*@px;
            .text {
              float: left;
              line-height: 34*@px;
            }
            .num {
              float: right;
              line-height: 34*@px;
            }
          }
          .plan {
            margin-bottom: 40*@px;
            height: 16*@px;
            width: 100%;
            border-radius: 10*@px;
            background: #DDDDDD;
            position: relative;
            .ready {
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 10*@px;
              background: #A201FD;
              height: 100%;
              max-width: 100%;
            }
          }
          .gift-choose {
            .clearfix();
            .gift-item {
              float: left;
              display: block;
              width: 132*@px;
              height: 132*@px;
              background: url("../../assets/image/D/d2_4_gift2@3x.png") 50% 50% no-repeat;
              background-size: 100%;
              margin: 0 95*@px 0 0;
              &.box-icon {
                background-image: url('../../assets/image/D/d1_1_icon_box_nor@3x.png');
              }
              &.open-box-icon {
                background-image: url('../../assets/image/D/d1_1_icon_box_opened@3x.png');
              }
              &:last-child {
                margin: 0;
              }
            }
          }

        }

        ul {
          .clearfix();
        }
        .gift-item {
          float: left;
          margin: -14*@px 0 14*@px 0;
          padding: 14*@px 0;
          width: 25%;
          /*<!--width: 100*@px;-->*/
          color: #4D4D4F;
          font-size: 24*@px;
          text-align: center;
          &.active {
            background: fade(@color-main, 30%);
          }
          .gift-icon {
            width: 100*@px;
            height: 106*@px;
            background: url("../../assets/image/D/d2_4_gift2@3x.png") 50% 50% no-repeat;
            background-size: cover;
            margin: 0 auto;
            position: relative;
            .num {
              width: 20*@px;
              height: 20*@px;
              border: 1px solid #4E2AEF;
              color: #4E2AEF;
              position: absolute;
              font-size: 18*@px;
              text-align: center;
              line-height: 22*@px;
              top: -22*@px;
              right: -22*@px;
              border-radius: 50%;
            }
          }
          .gift-name {
            margin-top: 13*@px;
            height: 24*@px;
            line-height: 24*@px;
          }
          .gift-num {
            display: inline-block;
            margin-top: 13*@px;
            height: 24*@px;
            line-height: 24*@px;
            padding-left: 28*@px;
            text-align: left;
            background: url("../../assets/image/F/f_icon_coin@3x.png") 0 50% no-repeat;
            background-size: 20*@px;
            &.star {
              background-image: url("../../assets/image/F/f9_icon_yuanqi@3x.png");
            }
          }
          .gift-exp {
            font-size: 20*@px;
            height: 20*@px;
            line-height: 20*@px;
            color: #A201FD;
            margin-top: 10*@px;

          }
        }
        .null-block {
          .null-icon {
            background: url("../../assets/image/D/d2_4_icon_none@3x.png");
            width: 400*@px;
            height: 320*@px;
            background-size: 100%;
            margin: 0 auto;
          }
          .null-warn {
            font-size: 30*@px;
            text-align: center;
            color: #C6C7C9;
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
            background: 50% 50% no-repeat;
            background-size: 100%;
            margin: 0 auto;
            &.shop-icon {
              background-image: url('../../assets/image/D/d2_4_icon_selected@3x.png');
            }
            &.shop-icon-nor {
              background-image: url('../../assets/image/D/d2_4_icon_nor@3x.png');
            }
            &.bag-icon {
              background-image: url('../../assets/image/D/d2_4_icon_bag_selected@3x.png');
            }
            &.bag-icon-nor {
              background-image: url('../../assets/image/D/d2_4_icon_bag_nor@3x.png');
            }
          }
          .type {
            font-size: 16*@px;
            height: 16*@px;
            line-height: 16*@px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            margin-top: 7*@px;
            &.active-type {
              color: #fff;
            }
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
          .count-select {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            border: none;
            background: none;
            outline: none;
            width: 125*@px;
            height: 67*@px;
          }
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
            background: url("../../assets/image/D/d2_4_icon_retan@3x.png") 50% 50% no-repeat;
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

    // 由下往上移动
    .slide-down-up-enter-active {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-down-up-leave-active {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-down-up-enter, .slide-down-up-leave-active {
      -webkit-transform: translate3d(-50%, 100%, 0);
      -moz-transform: translate3d(-50%, 100%, 0);
      -ms-transform: translate3d(-50%, 100%, 0);
      -o-transform: translate3d(-50%, 100%, 0);
      transform: translate3d(-50%, 100%, 0);
    }
  }
</style>
