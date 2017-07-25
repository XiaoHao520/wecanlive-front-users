<template>
  <div class="page-family-manage">
    <header-common title="设置"></header-common>
    <div class="family-manage">
      <ul>
        <li class="manage-item">
          <router-link :to="{ name: 'main_family_introduction' ,params: {id: $route.params.id}}">
            <div class="item-name">家族介绍</div>
            <div class="introduce">
              {{ family.family_introduce }}
            </div>
          </router-link>
        </li>


        <li class="manage-item">
          <!--todo-->
          <a href="javascript:;" class="code-item">
            <div class="item-name">家族 QR code</div>
          </a>
        </li>

        <li class="manage-item">
          <router-link :to="{name: 'main_family_manage_members', params: {id: $route.params.id} }"
                       class="skip-item">
            <div class="item-name">成員管理</div>
          </router-link>
        </li>
        <li class="manage-item">
          <router-link :to="{name: 'main_family_manage_articles',params: {id: $route.params.id}}"
                       class="skip-item">
            <div class="item-name">家族公告</div>
          </router-link>
        </li>
        <li class="manage-item">
          <router-link :to="{name: 'main_family_manage_missions',params: {id: $route.params.id} }"
                       class="skip-item">
            <div class="item-name">家族任務</div>
          </router-link>
        </li>

        <!--todo-->
        <li class="manage-item">
          <a href="javascript:;"
             @click="verification = !verification">
            <div class="btn"
                 :class="{'open': verification,
                          'close': !verification}"></div>
            <div class="item-name">家族介绍</div>
            <div class="introduce warn">
              開啓後，家族成員都需要管理員確認才可以加入，QRcode停用。
            </div>
          </a>
        </li>


      </ul>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        verification: true,
        family: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Family').get({
          id: vm.$route.params.id,
        }).then((resp => {
          vm.family = resp.data;
        }));
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-manage {
    background: #E5E5EC;
    .family-manage {
      background: #fff;
      .manage-item {
        border-bottom: 1px solid @color-border;
        padding: 0 30*@px;
        a {
          padding: 35*@px 0;
          display: block;
          position: relative;
          .btn {
            width: 88*@px;
            height: 44*@px;
            position: absolute;
            right: 0;
            top: 35*@px;
            &.open {
              background: url("../../assets/image/F/f3_3_switch_on@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
            &.close {
              background: url("../../assets/image/F/f3_3_switch_off@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
          .item-name {
            font-size: 32*@px;
            line-height: 35*@px;
            height: 32*@px;
            color: #000000;
          }
          .introduce {
            color: #8D8D8D;
            font-size: 24*@px;
            margin-top: 15*@px;
            line-height: 35*@px;
            &.warn {
              width: 556*@px;
            }
          }
          &.code-item {
            background: url("../../assets/image/F/f3_3_icon_code@3x.png") 100% 50% no-repeat;
            background-size: 40*@px;
          }
          &.skip-item {
            background: url("../../assets/image/F/f3_3_icon_forward@3x.png") 100% 50% no-repeat;
            background-size: 14*@px;
          }
        }
      }
    }
  }
</style>
