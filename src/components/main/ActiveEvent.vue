<template>
  <div class="page-active-event">
    <header-common title="全部相簿" :backLink="{name: 'main_index'}">
      <div slot="right" class="submit-btn">
        <a href="javascript:;" @click="submit()">下一步</a>
      </div>
    </header-common>


    <div class="photo-list">
      <ul>
        <li v-for="(item,i) in items" @click="choiceImage(item)" class="photo-item"
            :class="{'photo-item-last': (i+1)%3==0}">
          <div class="photo" :style="{backgroundImage: 'url(' + item.image +')'}"></div>
          <div class="choice-icon" :class="{'select' : choice.indexOf(item) !== -1 }"></div>
        </li>
      </ul>
    </div>


    <div class="all-file">
      <a class="all-file-btn" @click="uploadImage()" href="javascript:;">
        所有文件
        <div class="down-icon"></div>
      </a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        items: [],
        choice: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Image').get({
          author: vm.me.id,
        }).then((resp) => {
          vm.items = resp.data.results;
        });
      },
      uploadImage() {
        const vm = this;
        vm.pickImage().then(() => {
          vm.reload();
        });
      },
      choiceImage(item) {
        const vm = this;
        const index = vm.choice.indexOf(item);
        if (index === -1) {
          vm.choice.push(item);
        } else {
          vm.choice.splice(index, 1);
        }
      },
      submit() {
        const vm = this;
        vm.setContext('images', vm.choice);
        vm.$router.push({ name: 'main_active_event_write' });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-active-event {
    background: #E6E6E8;

    .photo-list {
      position: absolute;
      top: 126*@px;
      bottom: 85*@px;
      left: 0;
      right: 0;
      overflow-y: scroll;
      .app-scroll();
      ul {
        .clearfix();
      }
      .photo-item {
        float: left;
        width: 247*@px;
        height: 247*@px;
        margin: 4.5*@px 4.5*@px 0 0;
        position: relative;
        .photo {
          height: 100%;
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
        }
        .choice-icon {
          position: absolute;
          right: 10*@px;
          top: 10*@px;
          background: url("../../assets/image/D/radio_nor@3x.png") 50% 50% no-repeat;
          width: 50*@px;
          height: 50*@px;
          background-size: 100%;
          &.select {
            background-image: url("../../assets/image/D/radio_selected@3x.png");
          }
        }
        &.photo-item-last {
          margin-right: 0;
        }
      }

    }
    .all-file {
      position: fixed;
      height: 85*@px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      .all-file-btn {
        width: 220*@px;
        color: #fff;
        line-height: 85*@px;
        display: block;
        font-size: 32*@px;
        background: svg-gradient(to right, #0EA8F9, #0FEDE9);
        position: relative;
        text-align: center;
        .down-icon {
          position: absolute;
          right: 7*@px;
          bottom: 7*@px;
          background: url("../../assets/image/D/icon_triangle@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          width: 22*@px;
          height: 22*@px;
        }
      }
    }
  }
</style>
