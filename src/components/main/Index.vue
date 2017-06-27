<template>
  <div id="main-index">
    <header-index></header-index>
    <section class="section-recommend-body">
      <div class="title">你可能會喜歡</div>
      <div class="image-library">
        <swiper :options="swiperImageOption">
          <swiper-slide>
            <div class="slide-item">
              <div class="member-block">
                <div class="member-nickname">55開</div>
              </div>
              <a class="btn-like">
                <span class="icon"></span>
                追蹤
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item">
              <div class="member-block">
                <div class="member-nickname">MIKE</div>
              </div>
              <a class="btn-like btn-like-active">
                <span class="icon"></span>
                已追蹤
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <ul class="tab-index">
      <li class="tab-item">我關注的直播</li>
      <li class="tab-item">我關注的動態</li>
      <div class="underline"></div>
    </ul>
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
      };
    },
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';
  #main-index {
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
  }
</style>
