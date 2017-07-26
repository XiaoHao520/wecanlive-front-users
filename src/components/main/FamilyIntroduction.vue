<template>
  <div class="page-family-introduction">
    <header-common title="家族简介">
      <template slot="left">
        <div class="btn-back-warpper" @click.stop="submit()">
          <a class="btn btn-back"></a>
        </div>
      </template>
    </header-common>

    <div class="family-introduction">
      <div class="family-header">
        <div class="family-icon" :style="{backgroundImage: 'url(' + family.logo_item.image  +')'}"></div>
        <div class="family-name">{{ family.name }}</div>
        <div class="open-date">成立时间:{{ family.date_created | date('yyyy-mm-dd') }}</div>
      </div>

      <div class="family-introduction-input">
        <textarea class="introduction-content"
                  v-model="family.family_introduce"></textarea>
      </div>
    </div>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        family: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Family').get({
          id: vm.$route.params.id,
        }).then((resp) => {
          vm.family = resp.data;
        });
      },
      submit() {
        const vm = this;
        vm.confirm('確定要修改家族簡介?').then(() => {
          vm.api('Family').patch({ id: vm.$route.params.id }, vm.family).then(() => {
            vm.goBack();
          });
        }).catch(() => {
          vm.goBack();
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-introduction {
    .family-introduction {
      .family-header {
        background: @bg-header;
        height: 340*@px;
        padding-top: 46*@px;
        box-sizing: border-box;
        .family-icon {
          width: 168*@px;
          height: 168*@px;
          border-radius: 50%;
          background: 50% 50% no-repeat #fff;
          background-size: cover;
          margin: 0 auto;
        }
        .family-name {
          font-size: 32*@px;
          text-align: center;
          color: #fff;
          height: 32*@px;
          line-height: 32*@px;
          margin-top: 20*@px;
        }
        .open-date {
          margin-top: 10*@px;
          font-size: 28*@px;
          height: 28*@px;
          line-height: 28*@px;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .family-introduction-input {
        .introduction-content {
          resize: none;
          width: 100%;
          padding: 30*@px;
          box-sizing: border-box;
          font-size: 28*@px;
          color: #8D8D8D;
          line-height: 40*@px;
          min-height: 15rem;
        }
      }
    }
  }
</style>
