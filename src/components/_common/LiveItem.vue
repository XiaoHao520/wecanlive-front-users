<template>
  <div class="component-live-item">
    <div class="live-title">
      <div class="title">直播标题</div>
      <div class="time">4/20 16:00</div>
    </div>

    <div class="live-member-num" v-if="!review">10086</div>
    <div class="review-member-num" v-if="review">10086</div>

    <div class="owner-pop" v-if="showInfo">
      <div class="avatar"></div>
      <div class="left-info">

        <div class="top">
          <div class="owner-nickname">
            <div class="nickname">VAMP Im. BROTERTFG</div>
            <div class="crown">LV.20</div>
            <div class="vip">2</div>
          </div>
          <div class="time">4/20 16:00</div>
        </div>

        <div class="bottom">
          <span class="gender gender-female"></span>
          23 歲 白羊座
          <a class="btn-add">
            <span class="icon"></span>
            追蹤
          </a>
          <a class="btn-add btn-added">
            <span class="icon"></span>
            已追蹤
          </a>
        </div>

      </div>
    </div>
    <div class="btn-bar" v-if="!review">
      <a class="bot-btn bot-btn-like-grey bot-btn-like"></a>
      <a class="bot-btn bot-btn-comment"></a>
      <a class="bot-btn bot-btn-share" @click="share"></a>
      <div class="comment-bar">
        <span class="comment">0 評論</span>
        <span class="comment">11 贊</span>
      </div>
    </div>

    <div class="icon-review" v-if="review"></div>
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
      showInfo: {
        type: Boolean,
        default: true,
      },
      review: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .component-live-item {
    position: relative;
    height: 750*@px;
    width: 100%;
    margin-bottom: 1px;
    .border-box();
    background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    .live-title {
      height: 68*@px;
      overflow: hidden;
      .border-box();
      padding: 0 20*@px;
      .title {
        float: left;
        height: 68*@px;
        font-size: 30*@px;
        color: #FFFFFF;
        line-height: 68*@px;
      }
      .time {
        float: right;
        height: 68*@px;
        font-size: 28*@px;
        color: #A1A1A1;
        line-height: 68*@px;
      }
    }
    .live-member-num {
      width: 216*@px;
      height: 36*@px;
      line-height: 36*@px;
      margin-left: 22*@px;
      background: url("../../assets/image/B1/table_live@3x.png") 50% 50% no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      color: #888888;
      font-size: 25*@px;
      text-indent: 135*@px;
    }
    .review-member-num {
      width: 216*@px;
      height: 36*@px;
      line-height: 36*@px;
      margin-left: 22*@px;
      background: url("../../assets/image/B1/table_review@3x.png") 50% 50% no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      color: #888888;
      font-size: 25*@px;
      text-indent: 135*@px;
    }
    .owner-pop {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 80*@px;
      height: 82*@px;
      .border-box();
      padding: 0 0 0 20*@px;
      overflow: hidden;
      .avatar {
        float: left;
        width: 82*@px;
        height: 82*@px;
        background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        .border-radius(50%);
      }
      .left-info {
        float: left;
        height: 82*@px;
        width: 630*@px;
        .border-box();
        .top {
          overflow: hidden;
          width: 100%;
          .border-box();
          padding: 0 0 0 15*@px;
          .owner-nickname {
            float: left;
            overflow: hidden;
            .nickname {
              float: left;
              color: #FFFFFF;
              width: 255*@px;
              .single-text-overflow();
              font-size: 30*@px;
            }
            .crown {
              float: left;
              width: 86*@px;
              height: 32*@px;
              line-height: 32*@px;
              background: url("../../assets/image/B1/icon_crown@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              color: #0928DF;
              font-size: 18*@px;
              text-indent: 36*@px;
            }
            .vip {
              height: 32*@px;
              line-height: 32*@px;
              width: 62*@px;
              float: left;
              color: #5E21EE;
              font-size: 20*@px;
              text-indent: 43*@px;
              background: url("../../assets/image/B1/icon_vip@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
              margin-left: 5*@px;
              .border-box();
              padding-top: 2*@px;
            }
          }
          .time {
            float: right;
            font-size: 26*@px;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .bottom {
          height: 44*@px;
          line-height: 44*@px;
          width: 100%;
          font-size: 26*@px;
          color: #FFFFFF;
          .gender {
            float: left;
            display: block;
            margin-top: 4*@px;
            width: 36*@px;
            height: 36*@px;
            vertical-align: middle;
            &.gender-female {
              background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
            &.gender-male {
              background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
          .btn-add {
            float: right;
            height: 44*@px;
            width: 145*@px;
            line-height: 44*@px;
            text-align: center;
            color: #FFFFFF;
            font-size: 26*@px;
            background: #9B20F3;
            .border-radius(44*@px);
            &.btn-added {
              background: #00BBEC;
              .icon {
                display: inline-block;
                width: 20*@px;
                height: 20*@px;
                background: url("../../assets/image/B1/icon_added@3x.png") 50% 50% no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
              }
            }
            .icon {
              display: inline-block;
              width: 20*@px;
              height: 20*@px;
              background: url("../../assets/image/B1/icon_add@3x.png") 50% 50% no-repeat;
              -webkit-background-size: 100%;
              background-size: 100%;
            }
          }
        }
      }
    }
    .btn-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 80*@px;
      line-height: 80*@px;
      .border-box();
      padding: 0 38*@px 0 20*@px;
      .bot-btn {
        float: left;
        width: 44*@px;
        height: 44*@px;
        margin-right: 46*@px;
        margin-top: 18*@px;
        &.bot-btn-like-grey {
          background: url("../../assets/image/B1/icon_like_gray@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        &.bot-btn-like {
          background: url("../../assets/image/B1/icon_like_pred@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        &.bot-btn-comment {
          background: url("../../assets/image/B1/icon_comment_nor@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
        &.bot-btn-share {
          background: url("../../assets/image/B1/icon_share_nor@3x.png") 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
        }
      }
      .comment-bar {
        float: right;
        height: 80*@px;
        line-height: 80*@px;
        font-size: 26*@px;
        color: #FFFFFF;
        .comment {
          margin-left: 10*@px;
        }
      }
    }
    .icon-review {
      position: absolute;
      width: 144*@px;
      height: 144*@px;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background: url("../../assets/image/B1/icon_play@3x.png") 50% 50% no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
</style>
