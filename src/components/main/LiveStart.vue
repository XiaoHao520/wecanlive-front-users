<template>
  <div id="app-main-live-start">
    <div class="background-avatar mask"
         :style="{backgroundImage: !!me && 'url('+ me.avatar_url +')'}"></div>
    <div class="wrapper"
         :class="{'not-status-bar': !overlapStatusBar}">
      <div class="top-bar">
        <div class="location" @click="chooseLocation()">
          <div class="icon"></div>
          <div class="text">地區</div>
        </div>
        <a class="btn-cancel" @click="cancelLive"></a>
      </div>
      <div class="avatar"
           :style="{backgroundImage: !!me && 'url('+ me.avatar_url +')'}"></div>
      <div class="live-title">
        <input type="text" placeholder="新增有 # 標籤的標題" v-model="liveTitle">

        <transition name="fade">
          <div class="warn-tips"
               v-if="title_warn">你輸入了不符合 wecanlive 規範的文字
          </div>
        </transition>

      </div>
      <div class="form">
        <div class="row-input" @click="setLive(0)">
          <div class="icon icon-password"></div>
          <div class="text"
               :class="{'no-text': !password}">{{password ? password : '設置密碼'}}
          </div>
        </div>
        <div class="row-input" @click="setLive(1)">
          <div class="icon icon-coin"></div>
          <div class="text"
               :class="{'no-text': !paid}">{{paid ? paid_diaplay : '設置收費'}}
          </div>
        </div>
        <div class="row-input" @click="setLive(2)">
          <div class="icon icon-member"></div>
          <div class="text"
               :class="{'no-text': !quota}">{{quota ? quota_diaplay : '設置上限人數'}}
          </div>
        </div>
      </div>
      <div class="tag-block">
        <div class="title">選擇一個類別來描述您的視頻直播</div>
        <ul>
          <li v-for="item in live_categories"
              @click="category=item.id"
              :class="{selected: category == item.id}">{{item.name}}
          </li>
        </ul>

        <transition name="fade">
          <div class="warn-tips"
               v-if="category_warn">{{category_warn}}
          </div>
        </transition>

      </div>
      <a class="btn-start-live" @click="startLive">
        <div class="icon"></div>
        <div class="text">開始直播</div>
      </a>
      <a class="btn-share">
        <div class="icon"></div>
        <div class="text">分 享</div>
      </a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        liveTitle: '',
        password: '',
        paid: 0,
        quota: 0,
        category: 0,
        live_categories: [],
        category_warn: '',
        title_warn: '',
      };
    },
    computed: {
      paid_diaplay() {
        return `${this.paid} 金幣`;
      },
      quota_diaplay() {
        return `${this.quota} 人`;
      },
    },
    mounted() {
      this.getLocate().then((location) => {
        console.log(location);
      });
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('LiveCategory').get().then((resp) => {
          vm.live_categories = resp.body.results;
        });
      },
      setLive(type) {
        const vm = this;
        if (type === 0) {
          vm.prompt('', '設置密碼', '', '輸入6-8位字母數字組合的密碼', '是否隱藏直播間').then((item) => {
            const reg = /^[a-zA-Z0-9]{6,10}$/;
            if (!reg.test(item.value)) {
              vm.notify('密碼格式不正確！');
              return;
            }
            vm.password = item.value;
          });
        } else if (type === 1) {
          vm.prompt('', '設置收費', '', '輸入需要的金幣數量').then((item) => {
            const reg = /^([1-9]\d*|[0]{1,1})$/;
            if (!reg.test(item.value)) {
              vm.notify('金幣數量要大於或等於零！');
              return;
            }
            vm.paid = item.value;
          });
        } else if (type === 2) {
          vm.prompt('', '設置上限人數', '', '進入直播間的上限人數').then((item) => {
            const reg = /^([1-9]\d*|[0]{1,1})$/;
            if (!reg.test(item.value)) {
              vm.notify('人數要大於或等於零！');
              return;
            }
            vm.quota = item.value;
          });
        }
      },
      cancelLive() {
        const vm = this;
        vm.confirm('是否取消直播？').then(() => {
          vm.goBack();
        });
      },
      startLive() {
        const vm = this;
        if (!vm.category) {
          vm.category_warn = '至少要選擇一種類別';
          return;
        }
        vm.api('Live').save({
          action: 'start_live',
        }, {
          name: vm.liveTitle,
          password: vm.password,
          paid: vm.paid,
          quota: vm.quota,
          category: vm.category,
        }).then((resp) => {
          vm.$router.push({ name: 'main_live', params: { id: resp.data.id } });
        }, () => {
        });
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
      chooseLocation() {
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
        position: relative;
        margin: 30*@px 0 70*@px;
        input {
          font-size: 38*@px;
          color: #FFFFFF;
          text-align: center;
          height: 40*@px;
          line-height: 40*@px;
          .placeholder-color(#fff);
          width: 100%;
        }
        .warn-tips {
          position: absolute;
          text-align: center;
          width: 100%;
          bottom: -39*@px;
          font-size: 23*@px;
          color: #E9363B;
        }
      }
      .form {
        width: 388*@px;
        margin: 0 auto 79*@px;
        .row-input {
          height: 63*@px;
          width: 100%;
          line-height: 63*@px;
          overflow: hidden;
          .border-box();
          background: rgba(0, 0, 0, 0.3);
          .rounded-corners(63*@px);
          margin-bottom: 20*@px;
          .icon {
            float: left;
            width: 44*@px;
            height: 44*@px;
            margin-top: 9.5*@px;
            margin-left: 27*@px;
            &.icon-password {
              background: url("../../assets/image/D/d_icon_password@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
            &.icon-coin {
              background: url("../../assets/image/D/d_icon_$@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
            &.icon-member {
              background: url("../../assets/image/D/d_icon_numberlim@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
          .text {
            float: right;
            width: 278*@px;
            height: 100%;
            line-height: 63*@px;
            color: #FFFFFF;
            font-size: 38*@px;
            &.no-text {
              color: #B5B7B7;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .tag-block {
        position: relative;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        .rounded-corners(10*@px);
        .warn-tips {
          position: absolute;
          text-align: center;
          width: 100%;
          bottom: -39*@px;
          font-size: 23*@px;
          color: #E9363B;
        }
        .title {
          font-size: 30*@px;
          color: #FFFFFF;
          text-align: center;
          height: 100*@px;
          line-height: 100*@px;
        }
        ul {
          padding: 0 50*@px;
          overflow: hidden;
          li {
            float: left;
            color: #FFFFFF;
            text-align: center;
            background: #8C8C8C;
            margin: 0 7.5*@px 28*@px;
            font-size: 24*@px;
            height: 40*@px;
            line-height: 40*@px;
            width: 130*@px;
            .rounded-corners(40*@px);
            &.selected {
              background: #9B1FF2;
            }
          }
        }
      }
      .btn-start-live {
        display: block;
        color: #FFFFFF;
        height: 90*@px;
        .rounded-corners(90*@px);
        width: 388*@px;
        margin: 68*@px auto 19*@px;
        background: #00C6BF;
        .icon {
          float: left;
          width: 65*@px;
          height: 65*@px;
          margin: 12.5*@px 44*@px 0;
          background: url("../../assets/image/D/d_icon_live@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .text {
          float: left;
          font-size: 38*@px;
          width: 184*@px;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;

        }
      }
      .btn-share {
        display: block;
        color: #FFFFFF;
        height: 90*@px;
        .rounded-corners(90*@px);
        width: 388*@px;
        margin: 0 auto;
        background: #00429D;
        .icon {
          float: left;
          width: 65*@px;
          height: 65*@px;
          margin: 12.5*@px 44*@px 0;
          background: url("../../assets/image/D/d_icon_share-@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        .text {
          float: left;
          font-size: 38*@px;
          width: 184*@px;
          height: 90*@px;
          line-height: 90*@px;
          text-align: center;
        }
      }
    }
  }
</style>
