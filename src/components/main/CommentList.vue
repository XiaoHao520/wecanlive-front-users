<template>
  <div class="page-comment-list">
    <header-common title="評論列表"></header-common>
    <div class="comment-list">
      <ul>
        <li class="comment-item">
          <div class="avatar"></div>
          <div class="comment-header">
            <div class="name">名字</div>
            <div class="date">04/20 16:40</div>
          </div>
          <div class="comment-content">
            我觉得你的眼光很好。这个元的色调很协调
          </div>
        </li>

        <li class="comment-item">
          <div class="avatar"></div>
          <div class="comment-header">
            <div class="name">名字</div>
            <div class="date">04/20 16:40</div>
          </div>
          <div class="comment-content">
            我觉得你的眼光很好。这个元的色调很协调
          </div>
        </li>

        <li class="comment-item">
          <div class="avatar"></div>
          <div class="comment-header">
            <div class="name">名字</div>
            <div class="date">04/20 16:40</div>
          </div>
          <div class="comment-content">
            我觉得你的眼光很好。这个元的色调很协调
          </div>
        </li>

        <li class="comment-item">
          <div class="avatar"></div>
          <div class="comment-header">
            <div class="name">名字</div>
            <div class="date">04/20 16:40</div>
          </div>
          <div class="comment-content">
            我觉得你的眼光很好。这个元的色调很协调
          </div>
        </li>
      </ul>
    </div>


    <div class=""></div>

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

  .page-comment-list {
    .comment-list {
      padding: 30*@px 30*@px 0 30*@px;
      box-sizing: border-box;
      .comment-item {
        padding: 10*@px 0 15*@px 132*@px;
        border-bottom: 1px solid @color-border;
        position: relative;
        margin-bottom: 15*@px;
        .avatar {
          width: 120*@px;
          height: 120*@px;
          position: absolute;
          top: 0;
          left: 0;
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          border-radius: 50%;
        }
        .comment-header {
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
        .comment-content {
          margin-top: 10*@px;
          font-size: 25*@px;
          color: #989898;
          width: 345*@px;
          line-height: 33*@px;
        }
      }
    }
  }
</style>
