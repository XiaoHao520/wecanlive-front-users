<template>
  <div class="page-like-list">
    <header-common title="點贊列表"></header-common>


    <div class="like-list">
      <ul>
        <li v-for="item in items" class="like-item">
          <div class="avatar"></div>
          <div class="item-info">
            <div class="like-header">
              <div class="name">123</div>
              <div class="date">07/24 12:00</div>
              <!--{{ item.date_created | date('mm/dd HH:MM') }}-->
            </div>
            <div class="content">給你點了一個贊</div>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        items: [],
        model: this.$route.params.model,
        id: this.$route.params.id,
      };
    },
    methods: {
      reload() {
//        const vm = this;
//        if (vm.model === 'activeevent') {
//        }
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .like-list {
    padding: 30*@px 30*@px 0 30*@px;
    position: absolute;
    top: @height-header;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    .app-scroll();
    .like-item {
      position: relative;
      border-bottom: 1px solid @color-border;
      padding: 0 0 15*@px 132*@px;
      margin-bottom: 15*@px;
      box-sizing: border-box;
      &:last-child {
        border-bottom: 0;
      }
      .avatar {
        position: absolute;
        left: 0;
        top: 0;
        width: 120*@px;
        height: 120*@px;
        border-radius: 50%;
        background: 50% 50% no-repeat #ccc;
        background-size: cover;
      }
      .item-info {
        padding-top: 27*@px;
        min-height: 120*@px;
        box-sizing: border-box;
        .like-header {
          height: 32*@px;
          line-height: 32*@px;
          .name {
            display: inline-block;
            font-size: 32*@px;
          }
          .date {
            float: right;
            color: #989898;
            font-size: 22*@px;
          }
        }
        .content {
          margin-top: 13*@px;
          font-size: 25*@px;
          color: #989898;
          line-height: 25*@px;
        }
      }
    }
  }
</style>
