<template>
  <div class="page-find-friend">
    <header-common title="找朋友"></header-common>

    <div class="find-type">
      <ul>
        <li class="type-item">
          <router-link :to="{name: 'main_find_friend_detail'}">
            <div class="icon mobile"></div>
            <div class="type">通訊錄</div>
          </router-link>
        </li>
        <!--todo: 右icon顏色不對，要換切圖-->
        <li class="type-item">
          <router-link :to="{name: 'main_find_friend_detail'}">
            <div class="icon facebook"></div>
            <div class="type">Facebook 上的朋友</div>
          </router-link>
        </li>

        <li class="type-item">
          <router-link :to="{name: 'main_find_friend_detail'}">
            <div class="icon scan"></div>
            <div class="type">掃一掃</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-find-friend {
    .find-type {
      padding: 30*@px 30*@px 0 30*@px;
      .type-item {
        border-bottom: 1px solid @color-border;
        padding-bottom: 15*@px;
        margin-bottom: 15*@px;
        a {
          display: block;
          padding-left: 117*@px;
          position: relative;
          background: url("../../assets/image/A/icon_next@3x.png") 100% 50% no-repeat;
          background-size: 15*@px;
          .icon {
            width: 100*@px;
            height: 100*@px;
            border-radius: 50%;
            background: 50% 50% no-repeat;
            background-size: 100%;
            position: absolute;
            top: 0;
            left: 0;
            &.mobile {
              background-image: url("../../assets/image/B2/icon_icon_contact@3x.png");
            }
            &.facebook {
              background-image: url("../../assets/image/B2/list_icon_facebook@3x.png");
            }
            &.scan {
              background-image: url("../../assets/image/B2/list_icon_scan@3x.png");
            }
          }
          .type {
            height: 100*@px;
            line-height: 100*@px;
            font-size: 30*@px;
            color: #000;
          }
        }
      }
    }
  }
</style>
