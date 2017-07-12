<template>
  <div id="app-main-hot">
    <!--banner-->
    <section class="section-banner" v-if="banner.length">
      <swiper :options="swiperOption">
        <template v-for="item in banner">
          <swiper-slide>
            <div class="slide-item"
                 :style="{backgroundImage: !!item && 'url('+ item.image_url +')'}"></div>
          </swiper-slide>
        </template>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
    <!--banner end-->

    <section class="section-btn-bar">
      <router-link to="/find/friend" class="btn-find-friend"></router-link>
      <a class="btn-scan"></a>
    </section>

    <section class="item-list">
      <template v-for="item in lives">
        <live-item :item="item"></live-item>
      </template>
    </section>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
        },
        lives: [],
        banner: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Banner').get({
          subject: 'HOT',
        }).then((resp) => {
          if (resp.body.results.length) vm.banner = resp.body.results;
        });
        // TODO 修改排序规则
        vm.api('Live').get({
          live_status: 'ACTION',
          ordering: '-hot_rating',
          fields: 'id,author_avatar,count_view,nickname',
        }).then((resp) => {
          if (resp.body.results.length) vm.lives = resp.body.results;
        });
      },
    },
  };
</script>


<style rel="stylesheet/less" type="text/less" lang="less">
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';
  .swiper-pagination,
  .swiper-pagination-bullets {
    bottom: 21*@px;
  }
  .swiper-pagination-bullet {
    width: 8*@px;
    height: 8*@px;
    margin: 0 6*@px;
    background: #FFFFFF;
    &.swiper-pagination-bullet-active {
      background: #9A20F6;
    }
  }
</style>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #app-main-hot {
    .app-scroll();
    .section-banner {
      width: 100%;
      height: 360*@px;
      background: #4a4a4a;
      .slide-item {
        display: block;
        height: 360*@px;
        width: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
    .section-btn-bar {
      background: #E4E4EB;
      height: 136*@px;
      .btn-find-friend {
        float: left;
        width: 330*@px;
        height: 76*@px;
        margin: 30*@px 0 0 30*@px;
        background: url("../../assets/image/B2/btn_friend@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
      .btn-scan {
        float: right;
        width: 330*@px;
        height: 76*@px;
        margin: 30*@px 30*@px 0 0;
        background: url("../../assets/image/B2/btn_scan@3x.png") 50% 50% no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
    .item-list {
      .hot-item {
        position: relative;
        height: 750*@px;
        background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        margin-bottom: 1px;
        .top-bar {
          width: 100%;
          overflow: hidden;
          .border-box();
          padding: 20*@px;
          .member-num {
            float: left;
            width: 216*@px;
            height: 36*@px;
            line-height: 36*@px;
            margin-left: 22*@px;
            background: url("../../assets/image/B1/table_live@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            color: #888888;
            font-size: 25*@px;
            text-indent: 135*@px;
          }
          .location {
            float: right;
            height: 40*@px;
            line-height: 40*@px;
            overflow: hidden;
            .icon {
              float: left;
              width: 40*@px;
              height: 40*@px;
              margin-right: 10*@px;
              background: url("../../assets/image/B2/icon_location@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
            .text {
              float: left;
              color: #FFFFFF;
              font-size: 26*@px;
              height: 40*@px;
              line-height: 40*@px;
            }
          }
        }
        .bottom-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 107*@px;
          padding-bottom: 5*@px;
          .title {
            text-indent: 20*@px;
            color: #FFFFFF;
            font-size: 38*@px;
          }
          .owner-nickname {
            width: 420*@px;
            text-indent: 20*@px;
            font-size: 30*@px;
            color: #FFFFFF;
            .single-text-overflow();
          }
        }
      }
    }
  }

</style>
