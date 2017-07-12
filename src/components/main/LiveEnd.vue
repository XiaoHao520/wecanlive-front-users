<template>
  <div id="app-main-live-start">
    <div class="background-avatar mask"
         :style="{backgroundImage: !!me && 'url('+ me.avatar_url +')'}"></div>
    <div class="wrapper">
      <div class="top-bar">
        <div class="location">
          <div class="icon"></div>
          <div class="text">地區</div>
        </div>
        <a class="btn-cancel" @click="close"></a>
      </div>
      <div class="avatar"
           :style="{backgroundImage: !!me && 'url('+ me.avatar_url +')'}"></div>
      <div class="live-title">直播結束</div>

      <ul class="info-block">
        <li>
          <div class="num">10000</div>
          <div class="text">鑽石</div>
        </li>
        <li>
          <div class="num">10000</div>
          <div class="text">觀看人數</div>
        </li>
        <li>
          <div class="num">10000</div>
          <div class="text">星光指數</div>
        </li>
      </ul>

      <div class="slide-library">
        <swiper :options="swiperShareOption">
          <swiper-slide>
            <div class="slide-item"
                 @click="shareTo('facabook')">
              <div class="icon icon-facebook"></div>
              Facebook
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item"
                 @click="shareTo('instagram')">
              <div class="icon icon-instagram"></div>
              Instagram
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item"
                 @click="shareTo('whatsapp')">
              <div class="icon icon-whatsapp"></div>
              Whatsapp
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item"
                 @click="shareTo('copy')">
              <div class="icon icon-copy"></div>
              複製鏈接
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="toggle-block">
        <div class="label">保存直播影片</div>
        <div class="toggle"
             @click="toggle"
             :class="{'toggle-on': is_save_live}"></div>
      </div>

    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        swiperShareOption: {
          slidesPerView: 'auto',
          freeMode: true,
        },
        is_save_live: false,
      };
    },
    computed: {},
    mounted() {
      this.getLocate().then((location) => {
        console.log(location);
      });
    },
    methods: {
      reload() {
      },
      close() {
        const vm = this;
        vm.$router.push({ name: 'main_index' });
      },
      toggle() {
        this.is_save_live = !this.is_save_live;
      },
      getLocate() {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const locationBD09 = this.wgs_bd(position.coords.latitude, position.coords.longitude);
              console.log('gps fetched', position);
              resolve({
                lat: locationBD09.lat,
                lng: locationBD09.lon,
                update: true,
              });
            }, (msg) => {
              console.log('gps fail', msg.message);
              reject(false);
            }, {
              maximumAge: 3000,
              timeout: 5000,
              enableHighAccuracy: true,
            });
          } else {
            reject(false);
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  #app-main-live-start {
    .background-avatar {
      background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
    }
    .wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.2);
      padding: 53*@px 30*@px 0;
      .border-box();
      &.not-status-bar {
        padding-top: 13*@px;
      }
      .top-bar {
        overflow: hidden;
        height: 66*@px;
        .location {
          overflow: hidden;
          float: left;
          height: 66*@px;
          .icon {
            float: left;
            width: 60*@px;
            height: 60*@px;
            background: url("../../assets/image/B2/icon_location@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .text {
            height: 66*@px;
            line-height: 66*@px;
            float: left;
            font-size: 38*@px;
            color: #FFFFFF;
          }
        }
        .btn-cancel {
          float: right;
          width: 66*@px;
          height: 66*@px;
          background: url("../../assets/image/A/pop_icon_close@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .avatar {
        margin: 28*@px auto 0;
        .rounded-corners(50%);
        width: 205*@px;
        height: 205*@px;
        background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
      .live-title {
        margin-top: 20*@px;
        text-align: center;
        color: #FFFFFF;
        font-size: 46*@px;
      }
      .info-block {
        margin: 28*@px auto 0;
        border: 1px solid #FFFFFF;
        .rounded-corners(10*@px);
        width: 690*@px;
        height: 210*@px;
        li {
          float: left;
          width: 33.3333%;
          color: #FFFFFF;
          margin-top: 52.5*@px;
          .num {
            font-size: 55*@px;
            text-align: center;
          }
          .text {
            margin-top: 0;
            font-size: 30*@px;
            text-align: center;
          }
        }
      }
      .slide-library {
        position: relative;
        overflow: hidden;
        height: 160*@px;
        margin-top: 59*@px;
        .swiper-wrapper {
          padding-left: 25*@px;
        }
        .swiper-slide {
          height: 160*@px;
          width: 135*@px;
          margin-right: 35*@px;
          .slide-item {
            width: 100%;
            height: 100%;
            font-size: 25*@px;
            color: #FFFFFF;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: center;
            .icon {
              width: 120*@px;
              height: 120*@px;
              margin: 0 auto 10*@px;
              &.icon-facebook {
                background: url("../../assets/image/B1/icon_facebook@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &.icon-instagram {
                background: url("../../assets/image/B1/icon_instagram@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &.icon-whatsapp {
                background: url("../../assets/image/B1/icon_whatsapp@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &.icon-copy {
                background: url("../../assets/image/B1/icon_copy@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
            }
          }
        }
      }
      .toggle-block {
        overflow: hidden;
        margin-top: 55*@px;
        .label {
          float: right;
          height: 58*@px;
          color: #FFFFFF;
          line-height: 58*@px;
        }
        .toggle {
          float: right;
          margin-right: 28*@px;
          height: 58*@px;
          width: 110*@px;
          background: url("../../assets/image/D/d3_switch_down@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          &.toggle-on {
            .transform(rotate(180deg));
            background: url("../../assets/image/D/d3_switch_on@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
