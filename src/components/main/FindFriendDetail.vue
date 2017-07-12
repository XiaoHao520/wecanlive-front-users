<template>
  <div class="page-member-official">
    <header-common title="通訊錄好友"></header-common>

    <div class="member-block">
      <div class="app-member-list">
        <div class="member-type">WecanLive 上的朋友</div>
        <ul>
          <li class="member-item">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">wecanlive娛樂</div>
              <div class="intro">Kate Deverfdf</div>
            </div>
            <a href="javascript:;" class="btn follow-btn">
              <div class="follow-icon"></div>
              追蹤
            </a>
          </li>

          <li class="member-item">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">wecanlive娛樂</div>
              <div class="intro">Kate Deverfdf</div>
            </div>
            <a href="javascript:;" class="btn follow-btn">
              <div class="follow-icon"></div>
              追蹤

            </a>
          </li>
        </ul>
      </div>

      <div class="out-list">
        <ul>
          <li class="member-item">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">wecanlive娛樂</div>
              <div class="intro">Kate Deverfdf</div>
              <a href="javascript:;" class="btn invite-btn">
                邀請
              </a>
            </div>
          </li>

          <li class="member-item">
            <div class="avatar"></div>
            <div class="member-info">
              <div class="name">wecanlive娛樂</div>
              <div class="intro">Kate Deverfdf</div>
            </div>
            <a href="javascript:;" class="btn invite-btn">
              邀請
            </a>
          </li>


        </ul>
      </div>
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-member-official {
    background: #E5E5EC;
    .member-block {
      position: absolute;
      top: @height-header;
      left: 0; right: 0; bottom: 0;
      overflow-y: scroll;
      .app-scroll();
      .app-member-list {
        background: #fff;
        padding: 35*@px 30*@px 0 30*@px;
        .member-type {
          font-size: 24*@px;
          color: #989898;
          margin-bottom: 30*@px;
        }
      }
      .out-list {
        margin-top: 28*@px;
        background: #fff;
        padding: 15*@px 30*@px 0 30*@px;
      }
      .member-item {
        padding-left: 138*@px;
        border-bottom: 1px solid @color-border;
        position: relative;
        margin-bottom: 15*@px;
        padding-bottom: 15*@px;
        .avatar {
          position: absolute;
          top: 0; left: 0;
          width: 120*@px;
          height: 120*@px;
          background: url("../../assets/image/B2/list_icon_user_default@3x.png") 50% 50% no-repeat;
          background-size: 100%;
        }
        .member-info {
          box-sizing: border-box;
          padding-top: 30*@px;
          min-height: 120*@px;
          .name {
            font-size: 30*@px;
            height: 30*@px;
            line-height: 30*@px;
          }
          .intro {
            margin-top: 15*@px;
            font-size: 20*@px;
            line-height: 20*@px;
            color: #989898;
          }

        }
        .btn {
          position: absolute;
          top: 35*@px; right: 0;
          display: block;
          width: 145*@px;
          height: 50*@px;
          line-height: 50*@px;
          color: #fff;
          background: #A201FD;
          font-size: 26*@px;
          border-radius: 25*@px;
          box-sizing: border-box;
          .follow-icon {
            height: 100%;
            background: url("../../assets/image/B1/icon_add@3x.png") 50% 50% no-repeat;
            background-size: 20*@px;
            width: 20*@px;
            position: absolute;
            left: 32*@px;
          }
          &.follow-btn {
            padding-left: 60*@px;
          }
          &.invite-btn {
            text-align: center;
            background: #3ABBF0;
          }
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
</style>
