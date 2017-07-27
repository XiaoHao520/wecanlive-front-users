<template>
  <div class="page-member-detail">
    <div class="member-detail-block"
         :class="{'not-status-bar': !overlapStatusBar,
                  'not-owned': me.id != $route.params.id}">

      <div class="header-action">
        <router-link v-if="me.id == $route.params.id"
                     :to="{name:'main_personal_settings'}" class="btn btn-set"></router-link>
        <a v-else href="javascript:;" class="btn btn-back" @click="goBack()"></a>
        <router-link :to="{name:'main_member_friends'}" class="btn btn-friend"></router-link>
      </div>

      <div class="member-detail">
        <div class="avatar" :style="{backgroundImage: 'url('+ avatar +')'}">
          <a href="javascript:;" v-if="me.id == $route.params.id"
             @click="modifyAvatar()" class="modify-avatar-btn"></a>
        </div>
        <div class="member-info">
          <div class="member-name">
            <div class="name">{{ user.nickname }}</div>
            <a href="javascript:;" class="vip-level">VIP</a>
            <a href="javascript:;" class="code-btn"></a>
          </div>

          <div class="id">ID:{{ user.id?user.id: user.user }}</div>

          <div class="member-sex">
            {{ choices.gender[user.gender] }} &bull; {{ user.age }}歲 &bull; {{ choices.constellation[user.constellation]
            }}
          </div>

          <div class="member-follow">
            <div class="follow-type">
              <router-link :to="{name: 'main_member_fans'}">
                <div class="type">粉絲</div>
                <div class="num">{{ user.count_followed }}</div>
              </router-link>
            </div>
            <div class="follow-type follow">
              <router-link :to="{name: 'main_member_follows'}">
                <div class="type">追蹤</div>
                <div class="num">{{ user.count_follow }}</div>
              </router-link>
            </div>
            <div class="follow-type">
              <div class="type">直播</div>
              <div class="num">{{ live.length }}</div>
            </div>
          </div>

        </div>
      </div>

      <div class="personal-sign">
        <p>{{ me.signature }}</p>
      </div>

      <div v-if="me.id == $route.params.id"
           class="member-balance">
        <div class="balance-type">
          <router-link :to="{name: 'main_personal_diamond'}">
            <div class="icon icon-zuan"></div>
            <div class="balance-num">{{ me.diamond_balance }}</div>
          </router-link>
        </div>
        <div class="balance-type">
          <router-link :to="{name: 'main_personal_coin'}">
            <div class="icon icon-gold"></div>
            <div class="balance-num">{{ me.coin_balance }}</div>
          </router-link>
        </div>
        <div class="balance-type">
          <div class="icon icon-level"></div>
          <div class="balance-num">Lv.{{ me.member_level }}</div>
        </div>
      </div>

    </div>

    <!--todo 如果當前用戶正在直播才會顯示-->
    <div v-if="me.id != $route.params.id && member_living" class="user-live">
      <live-item :item="member_living"
                 :showInfo="false"
                 :review="true"></live-item>
    </div>


    <div v-if="me.id == $route.params.id" class="contribution-list">
      <div class="contribution-title">貢獻榜</div>
      <template v-for="(item,i) in rank_items" v-if="i < 3">
        <div class="contribution-item">
          <div class="top-one-bg" v-if="i == 0"></div>
          <div class="top-one-icon" v-if="i == 0"></div>
          <div class="avatar " :class="{'top-one' : i ==0}"
               :style="{backgroundImage: 'url(' + item.member.avatar_url+')'}"></div>
        </div>
      </template>
      <!--<div class="contribution-item">-->
      <!--<div class="avatar"></div>-->
      <!--</div>-->
      <!--<div class="contribution-item">-->
      <!--<div class="avatar"></div>-->
      <!--</div>-->
    </div>

    <div class="tab-menu">
      <ul>
        <li class="menu-item"
            :class="{'tab-active': tab == 0}"
            @click="tabTo(0)">
          我的動態
        </li>
        <li class="menu-item"
            :class="{'tab-active': tab == 1}"
            @click="tabTo(1)">
          我的直播
        </li>
        <li class="menu-item"
            :class="{'tab-active': tab == 2}"
            @click="tabTo(2)">
          我的家族
        </li>
      </ul>
      <div class="underline "
           :class="{
           'position-1': tab == 0,
           'position-2': tab == 1,
           'position-3': tab == 2,

           }"></div>
    </div>


    <transition :name="transitionName">
      <section class="section-list dynamic-list"
               :class="{'not-owned-list': me.id != $route.params.id,
                        'not-live-list': me.id != $route.params.id && !user.is_living}"
               v-if="tab == 0">
        <div class="watch-style">
          <a href="javascript:;" @click="big_dynamic=false"
             :class="{'three-style-black': big_dynamic}"
             class="btn three-style"></a>
          <a href="javascript:;" @click="big_dynamic=true"
             :class="{'one-style-black': big_dynamic}"
             class="btn one-style"></a>
        </div>
        <div class="dynamic">
          <ul>
            <li v-for="event in active_event"
                class="dynamic-item"
                v-if="event.images_item[0]"
                :class="{'big-photo': big_dynamic}">
              <a href="javascript:;"
                 :style="{backgroundImage: 'url(' + event.images_item[0].image +')'}"></a>
              <img :src="event.images_item[0].image"/>
            </li>
          </ul>
        </div>
      </section>
    </transition>


    <transition :name="transitionName">
      <section class="section-list live-list"
               :class="{'not-owned-list': me.id != $route.params.id ,
                        'not-live-list': me.id != $route.params.id && !user.is_living}"
               v-if="tab == 1">
        <template v-for="item in live">
          <live-item :item="item"
                     :showInfo="false"
                     :review="true"></live-item>
        </template>
      </section>
    </transition>


    <transition :name="transitionName">
      <section class="section-list family-list"
               :class="{'not-owned-list': me.id != $route.params.id ,
                        'not-live-list': me.id != $route.params.id && !user.is_living}"
               v-if="tab == 2">
        <div class="family">
          <ul>
            <li v-for="family in families" class="family-item">
              <a href="javascript:;" @click="goFamily(family.id)" class="family-img"
                 :style="{backgroundImage: 'url(' + family.logo_item.image + ')'}">
                <div class="family-name">{{ family.name }}</div>
              </a>
            </li>

            <li v-if="$route.params.id == me.id" class="family-item">
              <router-link class="add-family-btn" :to="{name: 'main_family_create'}">
                <div class="add-icon"></div>
                創立家族
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </transition>


    <footer-common v-if="me.id==$route.params.id"></footer-common>
    <!--todo 陌生人不能發信息-->
    <div v-else class="footer-btn" v-if="me.id != $route.params.id">
      <div class="bg"></div>
      <a href="javascript:;" v-if="user.is_following" class="btn follow-btn">已追蹤</a>
      <a href="javascript:;" v-else class="btn follow-btn"><span>+</span>追蹤</a>


      <a href="javascript:;" @click="sendMessage()" class="btn message-btn">發訊息</a>
    </div>


  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        tab: 0,
        transitionName: 'slide-left',
        big_dynamic: false,
        dynamic_items: [],
        avatar: '',
        active_event: [],
        live: [],
        rank_items: [],
        user: [],
        member_living: null,
        families: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        if (Number(vm.$route.params.id) === Number(vm.me.id)) {
          // 當前用戶個人
          vm.authenticate(true).then(() => {
            vm.avatar = vm.me.avatar_url;
            //
            vm.user = vm.me;
            vm.api('ActiveEvent').get({
              author: vm.me.id,
            }).then((resp) => {
              vm.active_event = resp.data.results;
            });
            //
            vm.api('Live').get({
              author: vm.me.id,
            }).then((resp) => {
              vm.live = resp.data.results;
            });
            //
            vm.api('Member').get({
              action: 'get_prize_rank',
            }, {}).then((resp) => {
              vm.rank_items = resp.data;
            });
            vm.api('Family').get({
              author: vm.me.id,
            }).then((resp) => {
              vm.families = resp.data.results;
            });
          });
        } else {
          // 其他人個人
          vm.api('Member').get({
            id: vm.$route.params.id,
          }).then((resp) => {
            vm.user = resp.data;
            vm.avatar = vm.user.avatar_url;
            if (vm.user.is_living) {
              vm.api('Live').get({
                id: vm.user.is_living,
              }).then((living) => {
                vm.member_living = living.data;
              });
            }
          });
          //
          vm.api('ActiveEvent').get({
            author: vm.$route.params.id,
          }).then((resp) => {
            vm.active_event = resp.data.results;
          });
          //
          vm.api('Live').get({
            author: vm.$route.params.id,
          }).then((resp) => {
            vm.live = resp.data.results;
          });
          //
          vm.api('Family').get({
            author: vm.$route.params.id,
          }).then((resp) => {
            vm.families = resp.data.results;
          });
        }
      },
      tabTo(pos) {
        const vm = this;
        const index = vm.tab;
        vm.transitionName = Number(pos) > Number(index) ? 'slide-left' : 'slide-right';
        setTimeout(() => {
          vm.tab = pos;
        }, 0);
      },
      modifyAvatar() {
        const vm = this;
        vm.pickImage().then((resp) => {
          vm.api('Member').patch({
            id: vm.me.id,
          }, {
            avatar: resp.id,
          }).then(() => {
            vm.avatar = resp.image;
          });
        });
      },
      sendMessage() {
        const vm = this;
        if (!vm.user.contact_form_me && !vm.user.contact_to_me) {
          vm.notify('你們是陌生人，不能發信息');
          return;
        }
        vm.notify('開發中');
      },
      addFollow() {
        const vm = this;
        vm.api('Member').save({
          action: 'follow',
          id: vm.user.user,
        }, {}).then(() => {
          vm.reload();
        });
      },
      goFamily(id) {
        const vm = this;
        if (Number(vm.me.id) !== Number(vm.$route.params.id)) {
          return;
        }
        vm.$router.push({ name: 'main_family_chat', params: { id } });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-member-detail {
    position: absolute;
    .fill-absolute();
    background: #E3E3EA;
    .member-detail-block {
      background: @bg-header;
      padding: 62*@px 30*@px 45*@px 30*@px;
      &.not-status-bar {
        padding: 26*@px 30*@px 45*@px 30*@px;
      }
      &.not-owned {
        padding-bottom: 1px;
      }
      .header-action {
        height: 52*@px;
        margin-bottom: 48*@px;
        .btn {
          width: 52*@px;
          height: 52*@px;
          display: inline-block;
          &.btn-set {
            background: url("../../assets/image/B5/icon_setting@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
          &.btn-back {
            background: url("../../assets/image/A/nav_back@3x.png") 50% 50% no-repeat;
            background-size: 44*@px;
          }
          &.btn-friend {
            float: right;
            background: url("../../assets/image/B5/icon_friend@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
      }
      .member-detail {
        padding: 0 0 5*@px 196*@px;
        position: relative;
        border-bottom: 1px solid #2F017A;
        .avatar {
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          width: 167*@px;
          height: 167*@px;
          .modify-avatar-btn {
            background: url("../../assets/image/B5/icon_changepic@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            display: block;
            width: 60*@px;
            height: 60*@px;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .member-info {
          .member-name {
            .clearfix();
            color: #fff;
            position: relative;
            .name {
              font-size: 32*@px;
              height: 35*@px;
              line-height: 35*@px;
              float: left;
            }
            .vip-level {
              margin-left: 18*@px;
              color: #fff;
              float: left;
              display: block;
              font-size: 21*@px;
              height: 32*@px;
              line-height: 32*@px;
              background: url("../../assets/image/F/f_icon_vip_gray@3x.png") 50% 50% no-repeat;
              background-size: 100%;
              width: 88*@px;
              text-align: center;
            }
            .code-btn {
              position: absolute;
              right: 0;
              top: 0;
              width: 44*@px;
              height: 44*@px;
              background: url("../../assets/image/F/f_icon_scan@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
          .id {
            color: #C2A4FB;
            font-size: 26*@px;
            margin-bottom: 5*@px;
          }
          .member-sex {
            margin-bottom: 25*@px;
            height: 26*@px;
            line-height: 26*@px;
            font-size: 26*@px;
            padding-left: 35*@px;
            background: url("../../assets/image/B3/icon_male@3x.png") 0 50% no-repeat;
            background-size: 26*@px;
            color: #C2A4FB;
            word-spacing: 10*@px;
          }
          .member-follow {
            .clearfix();
            .follow-type {
              width: 155*@px;
              float: left;
              &.follow {
                width: 183*@px;
              }
              .type {
                color: #fff;
                font-size: 24*@px;
                height: 24*@px;
                line-height: 24*@px;
                margin-bottom: 7*@px;
              }
              .num {
                font-size: 28*@px;
                color: #1EE2FF;
              }
            }
          }
        }
      }
      .personal-sign {
        color: #fff;
        font-size: 25*@px;
        line-height: 34*@px;
        padding-top: 20*@px;
        text-align: center;
        margin-bottom: 35*@px;
        min-height: 68*@px;
        p {
          margin: 0;
        }
      }
      .member-balance {
        .clearfix();
        padding: 0 45*@px;
        .balance-type {
          float: left;
          width: 100%/3;
          .icon {
            width: 80*@px;
            height: 80*@px;
            background: 50% 50% no-repeat;
            background-size: 100%;
            margin: 0 auto;
            &.icon-zuan {
              background-image: url('../../assets/image/F/f_icon_diamond@3x.png');
            }
            &.icon-gold {
              background-image: url('../../assets/image/F/f_icon_coin@3x.png');
            }
            &.icon-level {
              background-image: url('../../assets/image/F/f_icon_grade@3x.png');
            }
          }
          .balance-num {
            text-align: center;
            color: #fff;
            font-size: 28*@px;
            margin-top: 10*@px;
          }
        }
      }

    }
    .user-live {
      height: 650*@px;
      overflow: hidden;
    }
    .contribution-list {
      height: 137*@px;
      background: #170174;
      padding: 40*@px 0 0 135*@px;
      box-sizing: border-box;
      .clearfix();
      .contribution-title {
        float: left;
        height: 65*@px;
        font-size: 24*@px;
        color: #fff;
        line-height: 65*@px;
        margin-right: 130*@px;
      }
      .contribution-item {
        float: left;
        margin-right: 35*@px;
        position: relative;
        .avatar {
          width: 65*@px;
          height: 65*@px;
          background: 50% 50% no-repeat;
          background-size: cover;
          border-radius: 50%;
          position: relative;
          &.top-one {
            width: 60*@px;
            height: 60*@px;
            position: absolute;
            top: 2.5*@px;
            left: 2.5*@px;
          }
        }
        .top-one-icon {
          background: url("../../assets/image/F/f_icon_crown@3x.png") 50% 50% no-repeat;
          width: 46*@px;
          height: 31*@px;
          background-size: 100%;
          position: absolute;
          left: -7*@px;
          top: -24*@px;
        }
        .top-one-bg {
          width: 65*@px;
          height: 65*@px;
          background: #F6C71A;
          border-radius: 50%;
          position: relative;
        }
      }
    }
    .tab-menu {
      height: 78*@px;
      box-sizing: border-box;
      font-size: 24*@px;
      padding: 30*@px 75*@px 0 75*@px;
      position: relative;
      background: white;
      .menu-item {
        float: left;
        margin-right: 150*@px;
        &:last-child {
          margin-right: 0;
        }
        &.tab-active {
          color: #0021E6;
        }
      }
      .underline {
        width: 98*@px;
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
          -webkit-transform: translate3d(250%, 0, 0);
          -moz-transform: translate3d(250%, 0, 0);
          -ms-transform: translate3d(250%, 0, 0);
          -o-transform: translate3d(250%, 0, 0);
          transform: translate3d(250%, 0, 0);
        }
        &.position-3 {
          -webkit-transform: translate3d(502%, 0, 0);
          -moz-transform: translate3d(502%, 0, 0);
          -ms-transform: translate3d(502%, 0, 0);
          -o-transform: translate3d(502%, 0, 0);
          transform: translate3d(502%, 0, 0);
        }
      }
    }

    .section-list {
      //position: absolute;
      //left: 0;
      //right: 0;
      //bottom: 0;
      padding-bottom: @height-footer;
      .app-scroll();
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      &.not-owned-list {
        top: 1170*@px;
      }
      &.not-live-list {
        top: 520*@px;
      }
      &.dynamic-list {
        background: #E5E5EC;
        .watch-style {
          height: 72*@px;
          box-sizing: border-box;
          padding: 19*@px 170*@px 0 170*@px;
          .btn {
            width: 34*@px;
            height: 34*@px;
            background: 50% 50% no-repeat;
            background-size: 100%;
            display: inline-block;
            &.one-style {
              float: right;
              background-image: url('../../assets/image/F/f_icon_bigpic_nor@3x.png');
            }
            &.three-style {
              background-image: url('../../assets/image/F/f_icon_spic_pred@3x.png');
            }
            &.three-style-black {
              background-image: url('../../assets/image/F/f_icon_spic_nor@3x.png');
            }
            &.one-style-black {
              background-image: url('../../assets/image/F/f_icon_bigpic_pred@3x.png');
            }
          }
        }
        .dynamic {
          box-sizing: border-box;
          padding: 0 5*@px;
          ul {
            .clearfix();
            .dynamic-item {
              width: 235*@px;
              height: 235*@px;
              float: left;
              margin: 0 5*@px 10*@px 5*@px;
              box-sizing: border-box;
              transition: all 0.5s cubic-bezier(.55, 0, .1, 1);
              a {
                display: block;
                height: 100%;
                background: 50% 50% no-repeat;
                background-size: cover;
              }
              img {
                display: none;
                width: 100%;
                height: auto;
              }
              &.big-photo {
                padding: 0 5*@px;
                display: block;
                width: 100%;
                height: auto;
                margin: 0 0 11*@px 0;
                a {
                  display: none;
                }
                img {
                  display: block;
                }
              }
            }
          }
        }
      }
      &.family-list {
        .family {
          box-sizing: border-box;
          padding: 0 5*@px;
          ul {
            .clearfix();
            .family-item {
              width: 235*@px;
              height: 235*@px;
              float: left;
              margin: 10*@px 5*@px 0 5*@px;
              box-sizing: border-box;
              .family-img {
                background: url("../../assets/image/B5/pic_hotbanner@3x.png") 50% 50% no-repeat;
                background-size: cover;
                display: block;
                height: 100%;
                position: relative;
                .family-name {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  text-align: right;
                  padding: 0 12*@px 7*@px;
                  color: #fff;
                  font-size: 28*@px;
                  background: rgba(0, 0, 0, 0.1);
                }
              }
              .add-family-btn {
                display: block;
                height: 100%;
                box-sizing: border-box;
                padding-top: 77*@px;
                background: #fff;
                text-align: center;
                font-size: 24*@px;
                color: #BCBEC0;
                .add-icon {
                  display: block;
                  width: 50*@px;
                  height: 50*@px;
                  background: url("../../assets/image/B1/icon_add_2@3x.png") 50% 50% no-repeat;
                  background-size: 100%;
                  margin: 0 auto 10*@px auto;
                }
              }
            }
          }
        }
      }
    }
    .footer-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 128*@px;
      background: rgba(255, 255, 255, 0.5);
      .bg {
        height: 100%;
        .blur();
        z-index: 9;
      }
      a {
        position: absolute;
        z-index: 99;
        top: 20*@px;
        display: block;
        height: 80*@px;
        width: 300*@px;
        text-align: center;
        line-height: 80*@px;
        color: #fff;
        border-radius: 40*@px;
        &.follow-btn {
          left: 30*@px;
          background: svg-gradient(to right, #0021E7, #9D20F6);
        }
        &.message-btn {
          background: @color-submit;
          right: 30*@px;
        }
      }
    }
  }
</style>
