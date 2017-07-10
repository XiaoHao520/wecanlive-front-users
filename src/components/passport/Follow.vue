<template>
  <div class="page-follow">
    <header-common>
      <div slot="left"></div>
      <div slot="middle" class="follow-header">
        <h1 class="head">追蹤名單推薦</h1>
        <h2 class="subhead">新手上路 wecan 爲您精選推薦直播</h2>
      </div>
      <div slot="right" class="btn-close">
        <router-link to="/" class="btn close"></router-link>
      </div>
    </header-common>


    <div class="follow-list">
      <ul>
        <li class="follow-item active">
          <div class="avatar"></div>
          <div class="member-info">
            <div class="member-name">名字</div>
            <div class="member-follow">
              <div class="follow-icon"></div>
              100002378
            </div>
            <div class="member-title">我是 wecanlive 會員</div>
          </div>
          <div class="active-icon "></div>
        </li>
      </ul>
    </div>

    <div class="submit-btn">
      <a href="javascript:;" class="btn">完成</a>
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

  .page-follow {
    .follow-header {
      color: #fff;
      height: @height-header;
      box-sizing: border-box;
      padding-top: 20*@px;
      text-align: center;
      .head {
        font-size: 32*@px;
        height: 32*@px;
        line-height: 32*@px;
        margin: 0;
        font-weight: normal;
      }
      .subhead {
        margin: 10*@px 0 0 0;
        font-size: 18*@px;
        height: 18*@px;
        line-height: 18*@px;
        font-weight: normal;
      }
    }
    .btn-close {
      width: @height-header;
      height: @height-header;
      position: absolute;
      right: 0;
      bottom: 0;
      .btn {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 44*@px;
        height: 44*@px;
        background: url("../../assets/image/A/nav_icon_close_line@3x.png") 50% 50% no-repeat;
        background-size: 100%;
      }
    }

    .follow-list {
      padding: 30*@px 25*@px 120*@px 30*@px;
      position: absolute;
      top: @height-header;
      left: 0; right: 0;
      bottom: 0; overflow-y: scroll;
      .app-scroll;
      box-sizing: border-box;
      .follow-item {
        position: relative;
        border-bottom: 1px solid @color-border;
        padding: 0 0 15*@px 135*@px;
        margin-bottom: 15*@px;
        .avatar {
          position: absolute;
          left: 0;
          top: 0;
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          width: 120*@px;
          height: 120*@px;
          border-radius: 50%;
        }
        .member-info {
          height: 120*@px;
          box-sizing: border-box;
          padding-top: 10*@px;
          .member-name {
            font-size: 32*@px;
            line-height: 32*@px;
            height: 32*@px;
          }
          .member-follow {
            margin-top: 15*@px;
            height: 24*@px;
            font-size: 26*@px;
            color: #959595;
            .follow-icon {
              width: 24*@px;
              height: 24*@px;
              background: url("../../assets/image/A/icon_number@3x.png") 50% 50% no-repeat;
              background-size: 100%;
              float: left;
            }
          }
          .member-title {
            margin-top: 11*@px;
            color: #959595;
            font-size: 26*@px;
            height: 26*@px;
            line-height: 26*@px;
          }
        }
        .active-icon {
          position: absolute;
          width: 60*@px;
          height: 60*@px;
          background: url("../../assets/image/A/icon_unselected@3x.png") 50% 50% no-repeat;
          background-size: 100%;
          right: 0;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);

        }
        &.active {
          .active-icon {
            background-image: url("../../assets/image/A/icon_selected@3x.png");
          }
        }
      }
    }
    .submit-btn {
      padding: 30*@px;
      position: absolute;
      background: #fff;
      bottom: 0;
      left: 0;
      right: 0;
      .btn {
        display: block;
        height: 90*@px;
        border-radius: 40*@px;
        color: #fff;
        background: #3ABBF0;
        line-height: 90*@px;
        text-align: center;
      }
    }

  }

</style>
