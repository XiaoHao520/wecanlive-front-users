<template>
  <div id="app-passport-signup-complete">
    <header-common title="完善個人資料"></header-common>
    <section class="section-top">
      <div class="row-avatar">
        <div class="title">頭像</div>
        <div class="avatar" @click="updateAvatar"></div>
      </div>
      <div class="row-nickname">
        <div class="title">暱稱</div>
        <input type="text" placeholder="請輸入暱稱">
      </div>
    </section>
    <section class="section-bottom">
      <div class="row-gender">
        <div class="title">性別</div>
        <div class="select-gender">
          <div class="gender-male"></div>
          <div class="gender-female"></div>
          <div class="gender-unkown"></div>
        </div>
      </div>

      <div class="row-select">
        <div class="title">年齡</div>
        <div class="select-block">
          <select>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
          </select>
        </div>
      </div>

      <div class="row-select">
        <div class="title">星座</div>
        <div class="select-block">
          <select>
            <option>獅子座</option>
            <option>天秤座</option>
            <option>白羊座</option>
          </select>
        </div>
      </div>
    </section>

    <a class="btn-submit" @click="submit">保存</a>

    <a class="btn-skip" @click="skip">跳過這一步</a>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
        const vm = this;
        vm.setContext('qqq', 1);
        console.log(vm.getContext('qqq'));
      },
      updateAvatar() {},
      submit() {},
      skip() {},
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
      .row-avatar {
        height: 125*@px;
        width: 100%;
        border-bottom: 1px solid #EBEBF0;
        overflow: hidden;
      }
    }
  }

</style>
