<template>
  <div class="component-dynamic-item">
    <div class="top-view">
      <div class="bottom-block">
        <div class="owner-pop">
          <div class="avatar"></div>
          <div class="left-info">

            <div class="top">
              <div class="owner-nickname">
                <div class="nickname">VAMP Im. BROTERTFG</div>
                <div class="tag"></div>
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
      </div>
    </div>
    <div class="bottom-view">
      <div class="content">
        這是一個快樂，都比，熱血的遊戲家族～一起開黑，一起組隊玩遊戲！
      </div>
      <div class="btn-bar">
        <a class="bot-btn bot-btn-like-grey bot-btn-like"></a>
        <a class="bot-btn bot-btn-comment"></a>
        <a class="bot-btn bot-btn-share" @click="share"></a>
        <div class="comment-bar">
          <span class="comment">0 評論</span>
          <span class="comment">11 贊</span>
        </div>
      </div>
    </div>
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
    props: {},
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .component-dynamic-item {
    width: 100%;
    margin-bottom: 20*@px;
    .border-box();
    .top-view {
      position: relative;
      height: 640*@px;
      background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      .bottom-block {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 22*@px;
        height: 82*@px;
        z-index: 1;
        .owner-pop {
          position: relative;
          width: 100%;
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
                .tag {
                  float: left;
                  width: 35*@px;
                  height: 35*@px;
                }
                .vip {
                  height: 21*@px;
                  line-height: 21*@px;
                  width: 45*@px;
                  float: left;
                  text-indent: 31*@px;
                  color: #5E21EE;
                  font-size: 15*@px;
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
      }
    }
    .bottom-view {
      background: #FFFFFF;
      .content {
        padding: 20*@px 22*@px 12*@px;
        color: #000;
        line-height: 44*@px;
        font-size: 30*@px;
      }
      .btn-bar {
        height: 80*@px;
        line-height: 80*@px;
        width: 100%;
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
            background: url("../../assets/image/B1/icon_comment_gray@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.bot-btn-share {
            background: url("../../assets/image/B1/icon_share_gray@3x.png") 50% 50% no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
        }
        .comment-bar {
          float: right;
          height: 80*@px;
          line-height: 80*@px;
          font-size: 26*@px;
          color: #8C8C8C;
          .comment {
            margin-left: 10*@px;
          }
        }
      }
    }
    &:last-child {
      margin: 0;
    }
  }
</style>
