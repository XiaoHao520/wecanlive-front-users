<template>
  <div class="page-personal-profile">
    <header-common title="編輯個人資料"></header-common>

    <div class="personal-profile">

      <div class="row">
        <input class="row-input" type="text"
               v-model="nickname" placeholder="請輸入暱稱">
      </div>

      <div class="row">
        <select class="row-select" v-model="gender">
          <option value="M">男</option>
          <option value="F">女</option>
          <option value="">保密</option>
        </select>
        <div class="row-select-text">{{genderChoices[gender]}}</div>
        <div class="open-icon"></div>
      </div>

      <div class="row">
        <select class="row-select" v-model="constellation">
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
        <div class="row-select-text">{{constellationChoices[constellation]}}</div>
        <div class="open-icon"></div>
      </div>

      <div class="row">
        <select class="row-select" v-model="age">
          <template v-for="i in 80">
            <option :value="i">{{i}}</option>
          </template>
        </select>
        <div class="row-select-text">{{age}}</div>
        <div class="open-icon"></div>
      </div>

      <div class="row last-row">
        <input class="row-input" v-model="signature"
               type="text" placeholder="我的動態">
      </div>

      <div class="submit-btn">
        <a @click="submit()" href="javascript:;">儲存</a>
      </div>

    </div>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        nickname: '',
        gender: '',
        age: '',
        constellation: '',
        signature: '',
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
        genderChoices: {
          '': '保密',
          M: '男',
          F: '女',
        },
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.authenticate(true).then(() => {
          vm.nickname = vm.me.nickname;
          vm.constellation = vm.me.constellation;
          vm.gender = vm.me.gender;
          vm.age = vm.me.age;
          vm.signature = vm.me.signature;
        });
      },
      submit() {
        const vm = this;
        console.log(vm.constellation);
        vm.api('Member').patch({
          id: vm.me.id,
        }, {
          nickname: vm.nickname,
          gender: vm.gender,
          age: vm.age,
//          todo: 生日在後臺自動生成前段怎麼改都無用。生日字段可否去掉？
          constellation: vm.constellation,
          signature: vm.signature,
        }).then(() => {
          vm.$router.push({ name: 'main_personal_settings' });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-personal-profile {
    background: #E5E5EC;
    @line-height: 90*@px;
    .personal-profile {
      padding: 30*@px 30*@px 0 30*@px;
      .row {
        margin-bottom: 30*@px;
        background: #fff;
        height: @line-height;
        border-radius: @line-height * 0.5;
        box-sizing: border-box;
        font-size: 30*@px;
        position: relative;
        padding: 0 50*@px;
        &.last-row {
          margin-bottom: 185*@px;
        }
        .row-input {
          height: 100%;
          width: 100%;
          font-size: inherit;
        }
        .row-select {
          height: 100%;
          width: 600*@px;
          border: 0;
          margin: 0;
          background: #fff;
          opacity: 0;
          display: block;
          position: absolute;
        }
        .row-select-text {
          height: 100%;
          line-height: @line-height;
        }
        .open-icon {
          position: absolute;
          right: 45*@px;
          width: 25*@px;
          top: 0;
          bottom: 0;
          background: url("../../assets/image/A/icon_more@3x.png") 50% 50% no-repeat;
          background-size: 25*@px;
        }

      }
      .submit-btn {
        a {
          display: block;
          background: #3ABBF0;
          color: #fff;
          height: @line-height;
          text-align: center;
          line-height: @line-height;
          font-size: 38*@px;
          border-radius: @line-height * 0.5;
        }
      }
    }
  }
</style>
