<template>
  <div id="app-passport-signup-complete">
    <header-common title="完善個人資料"></header-common>
    <section class="section-top">
      <div class="row-avatar">
        <div class="title">頭像</div>
        <div class="avatar"
             :style="{backgroundImage: !!avatar && 'url('+avatar.image+')'}"
             @click="updateAvatar"></div>
      </div>
      <div class="row-nickname">
        <div class="title">暱稱</div>
        <input type="text"
               placeholder="請輸入暱稱"
               v-model="nickname">
      </div>

      <transition name="fade" appear>
        <div class="row-warn" v-if="warnTips">{{warnTips}}</div>
      </transition>

    </section>
    <section class="section-bottom">
      <div class="row-gender">
        <div class="title">性別</div>
        <div class="select-gender">
          <div class="gender-male" @click="selectGender('M')"></div>
          <div class="gender-female" @click="selectGender('F')"></div>
          <div class="gender-unkown" @click="selectGender()"></div>
        </div>
      </div>

      <div class="row-select">
        <div class="title">年齡</div>
        <div class="select-block">
          <select class="select-block-select" v-model="age">
            <template v-for="i in 80">
              <option :value="i">{{i}}</option>
            </template>
          </select>
          <div class="select-text">{{age}}</div>
          <div class="icon"></div>
        </div>
      </div>

      <div class="row-select">
        <div class="title">星座</div>
        <div class="select-block">
          <select class="select-block-select" v-model="constellation">
            <option value="ARIES">白羊座</option>
            <option value="TAURUS">金牛座</option>
            <option value="GEMINI">双子座</option>
            <option value="CANCER">巨蟹座</option>
            <option value="LEO">狮子座</option>
            <option value="VIRGO">处女座</option>
            <option value="LIBRA">天秤座</option>
            <option value="SCORPIO">天蝎座</option>
            <option value="SAGITTARIUS">射手座</option>
            <option value="CAPRICORN">摩羯座</option>
            <option value="AQUARIUS">水瓶座</option>
            <option value="PISCES">双鱼座</option>
          </select>
          <div class="select-text">{{constellationChoices[constellation]}}</div>
          <div class="icon"></div>
        </div>
      </div>
    </section>
    <a class="btn-submit" @click="submit">保存</a>

    <a class="btn-skip" @click="skip">跳過這一步</a>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        nickname: '',
        avatar: null,
        age: 20,
        gender: '',
        constellation: 'ARIES',
        warnTips: '',
        constellationChoices: {
          ARIES: '白羊座',
          TAURUS: '金牛座',
          GEMINI: '雙子座',
          CANCER: '巨蟹座',
          LEO: '獅子座',
          VIRGO: '處女座',
          LIBRA: '天秤座',
          SCORPIO: '天蝎座',
          SAGITTARIUS: '射手座',
          CAPRICORN: '摩羯座',
          AQUARIUS: '水瓶座',
          PISCES: '雙魚座',
        },
      };
    },
    methods: {
      reload() {
      },
      updateAvatar() {
        const vm = this;
        vm.pickImage().then((resp) => {
          vm.avatar = resp;
        });
      },
      selectGender(type = '') {
        const vm = this;
        vm.gender = type;
      },
      submit() {
        const vm = this;
        vm.api('Member').save({
          action: 'update_member_info',
        }, {
          avatar: vm.avatar ? vm.avatar.id : 0,
          nickname: vm.nickname,
          gender: vm.gender,
          age: vm.age,
          constellation: vm.constellation,
        }).then((resp) => {
          if (resp.data) {
            vm.$router.push({ name: 'passport_follow' });
          }
        });
      },
      skip() {
        const vm = this;
        vm.$router.push({ name: 'passport_follow' });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  #app-passport-signup-complete {
    background: #E4E4EB;
    .section-top {
      margin-bottom: 30*@px;
      background: #FFFFFF;
      padding: 0 29*@px;
      .border-box();
      .row-avatar {
        height: 125*@px;
        width: 100%;
        border-bottom: 1px solid #EBEBF0;
        overflow: hidden;
        .border-box();
        .title {
          float: left;
          font-size: 32*@px;
          color: #000;
          height: 125*@px;
          line-height: 125*@px;
        }
        .avatar {
          float: right;
          margin-top: 29.5*@px;
          width: 66*@px;
          height: 66*@px;
          background: url("../../assets/image/A/icon_userpic@3x.png") 50% 50% no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
          .border-radius(50%);
        }
      }
      .row-nickname {
        height: 125*@px;
        width: 100%;
        overflow: hidden;
        .border-box();
        .title {
          float: left;
          font-size: 32*@px;
          color: #000;
          height: 125*@px;
          line-height: 125*@px;
        }
        input {
          float: right;
          border: none;
          outline: none;
          background: none;
          width: 590*@px;
          margin-top: 42.5*@px;
          font-size: 32*@px;
          color: #303040;
          height: 40*@px;
          .placeholder-color(#A0A0A0);
          line-height: 40*@px;
        }
      }
      .row-warn {
        font-size: 26*@px;
        color: #fe0202;
        padding-left: 105*@px;
        padding-bottom: 10*@px;
        margin-top: 10*@px;
        .border-box();
      }
    }
    .section-bottom {
      background: #FFFFFF;
      padding: 0 29*@px;
      .border-box();
      .row-gender {
        height: 125*@px;
        width: 100%;
        border-bottom: 1px solid #EBEBF0;
        overflow: hidden;
        .border-box();
        .title {
          float: left;
          font-size: 32*@px;
          color: #000;
          height: 125*@px;
          line-height: 125*@px;
        }
        .select-gender {
          float: left;
          margin-left: 36*@px;
          overflow: hidden;
          height: 125*@px;
          padding-top: 29.5*@px;
          .border-box();
          .gender-male {
            float: left;
            width: 66*@px;
            height: 66*@px;
            margin-right: 54*@px;
            background: url("../../assets/image/A/icon_male_selected@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .gender-female {
            float: left;
            width: 66*@px;
            height: 66*@px;
            margin-right: 54*@px;
            background: url("../../assets/image/A/icon_female_selected@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .gender-unkown {
            float: left;
            width: 66*@px;
            height: 66*@px;
            background: url("../../assets/image/A/icon_secret-_selected@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
        }
      }
      .row-select {
        position: relative;
        height: 125*@px;
        width: 100%;
        border-bottom: 1px solid #EBEBF0;
        overflow: hidden;
        .border-box();
        .title {
          float: left;
          font-size: 32*@px;
          color: #000;
          height: 125*@px;
          line-height: 125*@px;
        }
        &:last-child {
          border: none;
        }
        .select-block {
          position: relative;
          width: 590*@px;
          float: right;
          height: 125*@px;
          font-size: 32*@px;
          color: #959595;
          .select-block-select {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            border: none;
            background: none;
            outline: none;
            width: 590*@px;
            height: 125*@px;
          }
          .select-text {
            float: left;
            height: 125*@px;
            line-height: 125*@px;
            font-size: 32*@px;
            color: #959595;
          }
          .icon {
            float: right;
            width: 44*@px;
            height: 44*@px;
            margin-top: 40.5*@px;
            background: url("../../assets/image/A/icon_more@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
        .icon-absolute {
          position: absolute;
          right: 0;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 44*@px;
          height: 44*@px;
          background: url("../../assets/image/A/icon_more@3x.png") 50% 50% no-repeat;
          background-size: 100%;
        }
      }
    }
    .btn-submit {
      display: block;
      margin: 203*@px auto 198*@px;
      height: 90*@px;
      line-height: 90*@px;
      width: 690*@px;
      text-align: center;
      color: #FFFFFF;
      font-size: 40*@px;
      background: #3abbf0;
      .border-radius(90*@px);
    }
    .btn-skip {
      display: block;
      text-align: center;
      color: #9B9B9C;
      font-size: 32*@px;
    }
  }

</style>
