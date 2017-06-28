<template>
  <div id="app-main-movies">
    <section class="banner">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="slide-item"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-item"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>

    <section class="section-hot-movie">
      <div class="title">
        <div class="text">發燒特輯</div>
        <div class="tag"></div>
        <div class="num-block">
          <div class="icon"></div>
          <div class="num">10086</div>
        </div>
      </div>
      <div class="thumbnail"></div>
    </section>

    <section class="section-hot-rank">
      <div class="title">熱門排行</div>
      <div class="image-library">
        <swiper :options="swiperRankOption">
          <swiper-slide>
            <div class="slide-item">
              <div class="movie-thumbnail">
                <div class="tag tag-exclusive"></div>
              </div>
              <div class="movie-title">夢夢 cos 化妝師</div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item">
              <div class="movie-thumbnail">
                <div class="tag tag-new"></div>
              </div>
              <div class="movie-title">夢夢 cos 化妝師</div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item">
              <div class="movie-thumbnail">
                <div class="tag tag-recommend"></div>
              </div>
              <div class="movie-title">夢夢 cos 化妝師</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <a class="btn-more-movies">更多影片</a>
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
        swiperRankOption: {
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

  #app-main-movies {
    .app-scroll();
    .banner {
      height: 360*@px;
      background: #4a4a4a;
      .slide-item {
        display: block;
        height: 360*@px;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
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
    }
    .section-hot-movie {
      .title {
        height: 75*@px;
        width: 100%;
        background: #E5E5E7;
        overflow: hidden;
        .text {
          float: left;
          height: 75*@px;
          line-height: 75*@px;
          color: #000;
          font-size: 30*@px;
          margin-left: 28*@px;
        }
        .tag {
          float: left;
          margin-top: 22*@px;
          margin-left: 14*@px;
          width: 83*@px;
          height: 31*@px;
          background: url("../../assets/image/B5/label_dujia@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .num-block {
          float: right;
          overflow: hidden;
          margin-top: 14*@px;
          margin-right: 34*@px;
          .icon {
            float: left;
            width: 32*@px;
            height: 47*@px;
            background: url("../../assets/image/B5/icon_view@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .num {
            float: left;
            margin-left: 5*@px;
            height: 47*@px;
            line-height: 47*@px;
            font-size: 26*@px;
            color: #939393;
          }
        }
      }
      .thumbnail {
        display: block;
        height: 750*@px;
        background: url("../../assets/image/B5/pic_hotbanner@3x.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
    }
    .section-hot-rank {
      background: #E5E5E7;
      padding-bottom: 100*@px;
      .title {
        height: 75*@px;
        width: 100%;
        background: #E5E5E7;
        line-height: 75*@px;
        color: #000;
        font-size: 30*@px;
        text-indent: 28*@px;
      }
      .image-library {
        position: relative;
        overflow: hidden;
        height: 234*@px;
        margin-bottom: 50*@px;
        .swiper-container {
          padding-left: 30*@px;
        }
        .swiper-slide {
          width: 330*@px;
          height: 234*@px;
          margin-right: 14*@px;
        }
        .slide-item {
          width: 100%;
          height: 100%;
          .border-box();
          .movie-thumbnail {
            position: relative;
            width: 330*@px;
            height: 200*@px;
            background: url("../../assets/image/B5/pic_hotbanner@2x.png") 50% 50% no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
            .tag {
              position: absolute;
              left: 0;
              top: 0;
              width: 82*@px;
              height: 31*@px;
              &.tag-exclusive {
                background: url("../../assets/image/B5/label_sole@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &.tag-new {
                background: url("../../assets/image/B5/label_new@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &.tag-recommend {
                background: url("../../assets/image/B5/label_recommend@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
            }
          }
          .movie-title {
            font-size: 25*@px;
            color: #000;
            width: 330*@px;
            .single-text-overflow();
          }
        }
      }
      .btn-more-movies {
        display: block;
        margin: 0 auto;
        font-size: 36*@px;
        color: #FFFFFF;
        background: #00BBEC;
        text-align: center;
        height: 90*@px;
        line-height: 90*@px;
        width: 690*@px;
        .border-radius(90*@px);
      }
    }
  }
</style>
