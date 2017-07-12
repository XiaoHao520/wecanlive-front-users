<template>
  <div class="component-movie-item">
    <div class="movie-thumbnail">
      <div class="tag"
           :class="{
           'tag-exclusive': category == 'exclusive',
           'tag-new': category == 'new',
           'tag-recommend': category == 'recommend',
           }"></div>
    </div>
    <div class="movie-title">夢夢 cos 化妝師</div>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {};
    },
    methods: {
      reload() {
      },
    },
    props: {
      category: {
        type: String,
        default: 'exclusive',
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .component-movie-item {
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
</style>
