<template>
  <div class="page-family-create">
    <header-common title="創立家族"></header-common>

    <div class="family-image">
      <div class="family-icon" v-if="!image_item" @click="uploadImage()"></div>
      <div class="family-icon" v-else
           :style="{backgroundImage: 'url('+ image_item.image +')'}" @click="uploadImage()"></div>
      <div class="title">家族圖片</div>
    </div>

    <div class="family-form">
      <div class="family-name">
        <div class="label">家族稱號</div>
        <input v-model="name" type="text" placeholder="請輸入家族稱號" class="name-input">
      </div>

      <div class="family-intro">
        <div class="label">家族簡介</div>
        <textarea v-model="intro" placeholder="請輸入家族簡介"></textarea>
        <div class="limit">30字以上</div>
      </div>
    </div>

    <a href="javascript:;" @click="submit()" class="submit-btn">確定</a>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        image_item: null,
        name: '',
        intro: '',
      };
    },
    methods: {
      reload() {
      },
      uploadImage() {
        const vm = this;
        vm.pickImage().then((resp) => {
          vm.image_item = resp;
          console.log(vm.image_item);
        });
      },
      submit() {
        const vm = this;
        if (!vm.image_item) {
          vm.notify('請上傳家族圖片');
          return;
        }
        if (vm.name.length === 0) {
          vm.notify('請填寫家族名稱');
          return;
        }
        if (vm.intro.length === 0) {
          vm.notify('請填寫家族簡介');
          return;
        }
        if (vm.intro.length > 30) {
          vm.notify('家族公告不能超過30字');
          return;
        }
        vm.api('Family').save({
          name: vm.name,
          family_introduce: vm.intro,
          author: vm.me.id,
          logo: vm.image_item.id,
        }).then((resp) => {
          vm.$router.push({ name: 'main_family_chat', params: { id: resp.data.id } });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-create {
    background: #E5E5EC;
    .family-image {
      height: 360*@px;
      padding-top: 124*@px;
      .border-box();
      .family-icon {
        background: url("../../assets/image/F/f3_3_icon_photo@3x.png") 50% 50% no-repeat;
        background-size: cover;
        height: 112*@px;
        width: 145*@px;
        margin: 0 auto;
      }
      .title {
        margin-top: 20*@px;
        font-size: 30*@px;
        text-align: center;
      }
    }
    .family-form {
      background: #fff;
      padding: 0 30*@px;
      .family-name {
        height: 123*@px;
        font-size: 30*@px;
        position: relative;
        padding-left: 150*@px;
        border-bottom: 1px solid @color-border;
        .label {
          position: absolute;
          left: 0;
          top: 0;
          line-height: 134*@px;
          height: 123*@px;
          width: 150*@px;
        }
        .name-input {
          font-size: 30*@px;
          width: 100%;
          height: 123*@px;
        }
      }
      .family-intro {
        padding-top: 46*@px;
        font-size: 30*@px;
        textarea {
          margin-top: 25*@px;
          font-size: 30*@px;
          width: 100%;
          resize: none;
          height: 256*@px;
          padding: 0;
          border-bottom: 1px solid @color-border;
        }
        .limit {
          height: 75*@px;
          padding-top: 18*@px;
          .border-box();
          font-size: 25*@px;
          color: #BCBEC0;
          text-align: right;
        }
      }
    }
    .submit-btn {
      background: #BCBEC0;
      height: 90*@px;
      width: 690*@px;
      display: block;
      margin: 165*@px auto 0 auto;
      color: #fff;
      text-align: center;
      line-height: 90*@px;
      border-radius: 45*@px;
    }
  }
</style>
