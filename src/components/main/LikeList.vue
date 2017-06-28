<template>
  <div class="page-like-list">
    <header-common title="點贊列表"></header-common>


    <div class="like-list">
      <ul>
        <li class="like-item">
          <div class="avatar"></div>
          <div class="item-info">
            <div class="like-header">
              <div class="name">姓名</div>
              <div class="date">04/20 16:40</div>
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
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .like-list {
    padding: 30*@px 30*@px 0 30*@px;
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
