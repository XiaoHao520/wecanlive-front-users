<template>
  <div id="main-index" @scroll="handleScroll($event)">
    <section class="section-recommend-body"
             ref="user_recommend"
             v-if="users_recommended.length">
      <div class="title">你可能會喜歡</div>
      <div class="image-library">
        <swiper :options="swiperImageOption">
          <template v-for="(item, index) in users_recommended">
            <swiper-slide>
              <div class="slide-item">
                <div class="member-block"
                     @click="showMemberCard(item)"
                     :style="{backgroundImage: !!item && 'url('+ item.avatar_url +')'}">
                  <div class="member-nickname">{{item.nickname}}</div>
                </div>
                <a class="btn-like"
                   @click="toggleFollow(item.user, index)"
                   v-if="!item.is_following">
                  <span class="icon"></span>
                  追蹤
                </a>
                <a class="btn-like btn-like-active"
                   @click="toggleFollow(item.user, index)"
                   v-if="item.is_following">
                  <span class="icon"></span>
                  已追蹤
                </a>
              </div>
            </swiper-slide>
          </template>
        </swiper>
      </div>
    </section>

    <ul class="tab-index"
        :class="{'tab-absolute': tab_absolute}">
      <li class="tab-item"
          :class="{'tab-active': tab == 0}"
          @click="tabTo(0)">我關注的直播
      </li>
      <li class="tab-item"
          :class="{'tab-active': tab == 1}"
          @click="tabTo(1)">我關注的動態
      </li>
      <div class="underline"
           :class="{
           'position-1': tab == 0,
           'position-2': tab == 1
           }"></div>
    </ul>

    <transition name="fade">
      <section class="section-live-list"
               :class="{'tab-absolute': tab_absolute}"
               v-if="tab == 0">
        <transition name="fade" appear>
          <div class="tips">5 個新直播～</div>
        </transition>
        <template v-for="item in live_list">
          <live-item :item="item"></live-item>
        </template>
      </section>
    </transition>

    <transition name="fade">
      <section class="section-live-list"
               :class="{'tab-absolute': tab_absolute}"
               v-if="tab == 1">
        <transition name="fade" appear>
          <div class="tips">5 個新動態～</div>
        </transition>
        <template v-for="item in active_event_list">
          <dynamic-item :item="item"></dynamic-item>
        </template>
      </section>
    </transition>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        swiperImageOption: {
          slidesPerView: 'auto',
          freeMode: true,
        },
        tab: 0,
        transitionName: 'slide-left',
        live_list: [],
        active_event_list: [],
        users_recommended: [],
        tab_absolute: false,
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Member').get({
          is_follow_recommended: 'True',
          fields: 'user,nickname,avatar_url,is_following',
        }).then((resp) => {
          if (resp.body.results.length) vm.users_recommended = resp.body.results;
        });
        vm.api('Live').get({
          followed_by: vm.me.id,
          live_status: 'ACTION',
          fields: 'id,nickname,author_avatar,count_view,paid',
        }).then((resp) => {
          if (resp.body.results.length) vm.live_list = resp.body.results;
        });
        vm.api('ActiveEvent').get({
          followed_by: vm.me.id,
          fields: 'id,age,author_is_following,avatar_url,constellation,content,count_comment,' +
          'count_like,date_created,nickname,gender,is_like,author,images_item',
        }).then((resp) => {
          if (resp.body.results.length) vm.active_event_list = resp.body.results;
        });
      },
      showMemberCard(item) {
      },
      toggleFollow(id, index) {
        const vm = this;
        vm.api('Member').save({
          action: 'follow',
          id,
        }, {}).then(() => {
          vm.users_recommended[index].is_following = !vm.users_recommended[index].is_following;
        }, () => {
        });
      },
      tabTo(pos) {
        const vm = this;
        vm.tab = pos;
      },
      handleScroll(evt) {
        const vm = this;
        vm.tab_absolute = vm.$refs.user_recommend ? evt.target.scrollTop >= vm.$refs.user_recommend.offsetHeight : true;
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #main-index {
    background: #E3E3EA;
    .app-scroll();
    .section-recommend-body {
      width: 100%;
      height: 337*@px;
      background: #E4E4EB;
      padding-top: 30*@px;
      .border-box();
      .title {
        font-size: 31*@px;
        color: #000;
        padding-left: 30*@px;
        margin: 0 0 20*@px 0;
      }
      .image-library {
        position: relative;
        overflow: hidden;
        height: 210*@px;
        .swiper-slide {
          width: 144*@px;
          height: 210*@px;
          margin: 0 0 0 30*@px;
        }
        .slide-item {
          width: 100%;
          height: 100%;
          .border-box();
          .member-block {
            display: block;
            position: relative;
            width: 144*@px;
            height: 144*@px;
            background: url("../../assets/image/A/icon_userpic@3x.png") 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
            overflow: hidden;
            .border-radius(30*@px);
            .member-nickname {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              height: 47*@px;
              line-height: 47*@px;
              background: rgba(0, 0, 0, 0.5);
              color: #FFFFFF;
              font-size: 26*@px;
              text-align: center;
              z-index: 1;
              .single-text-overflow();
            }
          }
          .btn-like {
            display: block;
            margin-top: 16*@px;
            height: 50*@px;
            line-height: 50*@px;
            font-size: 26*@px;
            width: 100%;
            background: #931EE6;
            color: #FFFFFF;
            .border-radius(50*@px);
            text-align: center;
            .icon {
              display: inline-block;
              width: 20*@px;
              height: 20*@px;
              background: url("../../assets/image/B1/icon_add@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
            &.btn-like-active {
              background: #00BBEC;
              .icon {
                display: inline-block;
                width: 20*@px;
                height: 20*@px;
                background: url("../../assets/image/B1/icon_added@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
            }
          }
        }
      }
    }
    .tab-index {
      position: relative;
      background: #FFFFFF;
      height: 75*@px;
      width: 100%;
      overflow: hidden;
      .border-box();
      &.tab-absolute {
        position: fixed;
        top: 128*@px;
        left: 0;
        right: 0;
        z-index: 1;
      }
      .tab-item {
        float: left;
        width: 50%;
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
        width: 155*@px;
        height: 4*@px;
        background: svg-gradient(to right, #00A1F5, #00EEE8);
        -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -moz-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -ms-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        -o-transition: all .5s cubic-bezier(.55, 0, .1, 1);
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        &.position-1 {
          -webkit-transform: translate3d(71%, 0, 0);
          -moz-transform: translate3d(71%, 0, 0);
          -ms-transform: translate3d(71%, 0, 0);
          -o-transform: translate3d(71%, 0, 0);
          transform: translate3d(71%, 0, 0);
        }
        &.position-2 {
          -webkit-transform: translate3d(313%, 0, 0);
          -moz-transform: translate3d(313%, 0, 0);
          -ms-transform: translate3d(313%, 0, 0);
          -o-transform: translate3d(313%, 0, 0);
          transform: translate3d(313%, 0, 0);
        }
      }
    }
    .section-live-list {
      background: #E3E3EA;
      &.tab-absolute {
        padding-top: 75*@px;
      }
      .tips {
        text-align: center;
        font-size: 23*@px;
        height: 52*@px;
        line-height: 52*@px;
        color: #949494;
      }
    }
  }
</style>
