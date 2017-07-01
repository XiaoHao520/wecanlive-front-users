<template>
  <div class="page-personal-black-list">
    <header-common title="封鎖清單"></header-common>

    <div class="black-list">
      <ul>
        <li class="black-item">
          <div class="avatar"></div>
          <div class="name">LM-oof</div>
          <a class="del-btn" href="javascript:;">解除</a>
        </li>

        <li class="black-item">
          <div class="avatar"></div>
          <div class="name">LM-oof</div>
          <a class="del-btn" href="javascript:;">解除</a>
        </li>

        <li class="black-item">
          <div class="avatar"></div>
          <div class="name">LM-oof</div>
          <a class="del-btn" href="javascript:;">解除</a>
        </li>
        <li class="black-item">
          <div class="avatar"></div>
          <div class="name">LM-oof</div>
          <a class="del-btn" href="javascript:;">解除</a>
        </li>
        <li class="black-item">
          <div class="avatar"></div>
          <div class="name">LM-oof</div>
          <a class="del-btn" href="javascript:;">解除</a>
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

  .page-personal-black-list {
    background: #E5E5EC;
    .black-list {
      position: absolute;
      top: 126*@px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: scroll;
      .app-scroll();
      ul {
        background: #fff;
        padding: 30*@px 30*@px 0 30*@px;
      }
      .black-item {
        padding-left: 137*@px;
        position: relative;
        padding-bottom: 15*@px;
        margin-bottom: 15*@px;
        border-bottom: 1px solid @color-border;
        &:last-child {
          border-bottom: 0;
          margin-bottom: 0;
        }
        .avatar {
          position: absolute;
          top: 0;
          left: 0;
          width: 120*@px;
          height: 120*@px;
          border-radius: 50%;
          background: 50% 50% no-repeat #ccc;

        }
        .name {
          height: 120*@px;
          font-size: 24*@px;
          line-height: 120*@px;
        }
        .del-btn {
          width: 125*@px;
          height: 50*@px;
          line-height: 50*@px;
          text-align: center;
          background: #A201FD;
          color: #fff;
          font-size: 24*@px;
          display: block;
          border-radius: 25*@px;
          position: absolute;
          right: 0;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }
      }
    }
  }

</style>
