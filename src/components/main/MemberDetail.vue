<template>
  <div class="page-member-detail">
    <div class="member-detail-block">
      <div class="header-action">
        <a href="javascript:;" class="btn btn-set"></a>
        <a href="javascript:;" class="btn btn-friend"></a>
      </div>

      <!--todo 圖標-->
      <div class="member-detail">
        <div class="avatar">
          <a href="javascript:;" class="modify-avatar-btn"></a>
        </div>
        <div class="member-info">
          <div class="member-name">
            <div class="name">Chris Lin</div>
            <a href="javascript:;" class="vip-level">VIP</a>
            <a href="javascript:;" class="code-btn"></a>
          </div>

          <div class="member-sex">男 &bull; 29歲 &bull; 金牛座</div>

          <div class="member-follow">
            <div class="follow-type">
              <div class="type">粉絲</div>
              <div class="num">2868</div>
            </div>
            <div class="follow-type follow">
              <div class="type">追蹤</div>
              <div class="num">876546</div>
            </div>
            <div class="follow-type">
              <div class="type">直播</div>
              <div class="num">5446768</div>
            </div>
          </div>

        </div>
      </div>

      <div class="personal-sign">
        <p>任何想法,都能產生的圓圈這就對和錯</p>
        <p>心本體體會陷入到對自己本體不能理解的狀態中</p>
      </div>

      <!--todo 圖標-->
      <div class="member-balance">
        <div class="balance-type">
          <div class="icon"></div>
          <div class="balance-num">8695</div>
        </div>
        <div class="balance-type">
          <div class="icon"></div>
          <div class="balance-num">236</div>
        </div>
        <div class="balance-type">
          <div class="icon"></div>
          <div class="balance-num">Lv.16</div>
        </div>
      </div>
    </div>


    <!--todo 图标-->
    <div class="contribution-list">
      <div class="contribution-title">貢獻榜</div>
      <div class="contribution-item">
        <div class="top-one-bg"></div>
        <div class="avatar"></div>
      </div>
      <div class="contribution-item">
        <div class="avatar"></div>
      </div>
      <div class="contribution-item">
        <div class="avatar"></div>
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
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-member-detail {
    .member-detail-block {
      background: @bg-header;
      padding: 62*@px 30*@px 45*@px 30*@px;
      &.not-status-bar {
        padding: 26*@px 30*@px 0 30*@px;
      }
      .header-action {
        height: 52*@px;
        margin-bottom: 48*@px;
        .btn {
          width: 52*@px;
          height: 52*@px;
          display: inline-block;
          &.btn-set {
            background: url("../../assets/image/B5/icon_setting@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
          &.btn-friend {
            float: right;
            background: url("../../assets/image/B5/icon_friend@3x.png") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
      }
      .member-detail {
        padding: 0 0 27*@px 196*@px;
        position: relative;
        border-bottom: 1px solid #2F017A;
        .avatar {
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          width: 167*@px;
          height: 167*@px;
          .modify-avatar-btn {
            background: url("../../assets/image/B5/icon_changepic@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            display: block;
            width: 60*@px;
            height: 60*@px;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .member-info {
          .member-name {
            .clearfix();
            color: #fff;
            margin-bottom: 12*@px;
            .name {
              font-size: 32*@px;
              float: left;
            }
            .vip-level {
              margin-left: 18*@px;
              color: #fff;
              float: left;
              display: block;
              font-size: 21*@px;
              height: 32*@px;
              line-height: 32*@px;
              background: #BCBEC0;
              width: 90*@px;
              border-bottom-right-radius: 15*@px;
              border-top-right-radius: 15*@px;
              border-top-left-radius: 15*@px;
              text-align: center;
            }
            .code-btn {
              width: 32*@px;
              height: 32*@px;
              background: 50% 50% no-repeat #fff;
              background-size: 100%;
              float: right;
            }
          }
          .member-sex {
            margin-bottom: 30*@px;
            height: 26*@px;
            line-height: 26*@px;
            font-size: 26*@px;
            padding-left: 35*@px;
            background: url("../../assets/image/B3/icon_male@3x.png") 0 50% no-repeat;
            background-size: 26*@px;
            color: #C2A4FB;
            word-spacing: 10*@px;
          }
          .member-follow {
            .clearfix();
            .follow-type {
              width: 155*@px;
              float: left;
              &.follow {
                width: 183*@px;
              }
              .type {
                color: #fff;
                font-size: 24*@px;
                height: 24*@px;
                line-height: 24*@px;
                margin-bottom: 12*@px;
              }
              .num {
                font-size: 22*@px;
                color: #1EE2FF;
              }
            }
          }
        }
      }
      .personal-sign {
        color: #fff;
        font-size: 25*@px;
        line-height: 34*@px;
        padding-top: 30*@px;
        text-align: center;
        margin-bottom: 47*@px;
        p {
          margin: 0;
        }
      }
      .member-balance {
        .clearfix();
        padding: 0 45*@px;
        .balance-type {
          float: left;
          width: 100%/3;
          .icon {
            width: 70*@px;
            height: 70*@px;
            background: 50% 50% no-repeat #fff;
            background-size: 100%;
            margin: 0 auto;
          }
          .balance-num {
            text-align: center;
            color: #fff;
            font-size: 20*@px;
            margin-top: 18*@px;
          }
        }
      }

    }
    .contribution-list {
      height: 137*@px;
      background: #170174;
      padding: 40*@px 0 0 135*@px;
      box-sizing: border-box;
      .clearfix();
      .contribution-title {
        float: left;
        height: 65*@px;
        font-size: 24*@px;
        color: #fff;
        line-height: 65*@px;
        margin-right: 130*@px;
      }
      .contribution-item {
        float: left;
        margin-right: 35*@px;
        .avatar {
          width: 65*@px;
          height: 65*@px;
          background: 50% 50% no-repeat #fff;
          border-radius: 50%;
        }
      }
    }
  }
</style>
