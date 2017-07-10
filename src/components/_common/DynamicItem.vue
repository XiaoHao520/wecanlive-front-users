<template>
  <div class="component-dynamic-item">
    <template v-if="item">
      <div class="top-view"
           :style="{backgroundImage: !!item.images_item.length && 'url('+ item.images_item[0].image +')'}">
        <div class="bottom-block">
          <div class="owner-pop">
            <div class="avatar"
                 :style="{backgroundImage: !!item && 'url('+ item.avatar_url +')'}"></div>
            <div class="left-info">

              <div class="top">
                <div class="owner-nickname">
                  <div class="nickname">{{item.nickname}}</div>
                  <div class="level">LV.20</div>
                  <div class="vip">2</div>
                </div>
                <div class="time">{{item.date_created | date('mm/dd HH:MM')}}</div>
              </div>

              <div class="bottom">
                <span class="gender"
                      :class="{
                      'gender-female': item.gender == 'F',
                      'gender-male': item.gender == 'M',
                      }"></span>
                {{item.age}} 歲 {{choices.constellation[item.constellation]}}
                <a class="btn-add"
                   @click="follow"
                   v-if="!item.author_is_following">
                  <span class="icon"></span>
                  追蹤
                </a>
                <a class="btn-add btn-added"
                   @click="follow"
                   v-if="item.author_is_following">
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
          {{item.content}}
        </div>
        <div class="btn-bar">
          <a class="bot-btn bot-btn-like-grey"
             :class="{'bot-btn-like': item.is_like}"
             @click="like"></a>
          <a class="bot-btn bot-btn-comment"></a>
          <a class="bot-btn bot-btn-share" @click="share"></a>
          <div class="comment-bar">
            <router-link :to="{name: 'main_comment_list', params: {model: 'activeevent', id: item.id}}"
                         class="comment">{{item.count_comment}} 評論</router-link>
            <router-link :to="{name: 'main_like_list', params: {model: 'activeevent', id: item.id}}"
                         class="comment">{{item.count_like}} 贊</router-link>
          </div>
        </div>
      </div>
    </template>
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
      like() {
        const vm = this;
        if (vm.item) {
          vm.api('ActiveEvent').save({
            action: 'like',
            id: vm.item.id,
          }, {}).then((resp) => {
            vm.item.is_like = resp.body.is_like;
            vm.item.count_like = resp.body.count_like;
          }, () => {
            vm.notify('點贊失敗');
          });
        }
      },
      follow() {
        const vm = this;
        vm.api('Member').save({
          action: 'follow',
          id: vm.item.author,
        }, {}).then(() => {
        }, () => {});
      },
    },
    props: {
      item: Object,
    },
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
                  max-width: 255*@px;
                  .single-text-overflow();
                  font-size: 30*@px;
                  height: 32*@px;
                  line-height: 32*@px;
                }
                .level {
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
                  float: left;
                  height: 32*@px;
                  line-height: 32*@px;
                  width: 62*@px;
                  color: #5E21EE;
                  font-size: 20*@px;
                  text-indent: 43*@px;
                  background: url("../../assets/image/B1/icon_vip@3x.png") 50% 50% no-repeat;
                  -webkit-background-size: 100%;
                  background-size: 100%;
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
      }
    }
    .bottom-view {
      background: #FFFFFF;
      .content {
        padding: 20*@px 22*@px 12*@px;
        color: #000;
        line-height: 44*@px;
        font-size: 30*@px;
        word-break: break-all;
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
            .animation(zoom-in, .4s);
            @keyframes zoom-in {
              0% {
                .transform(scale3d(1, 1, 1));
              }
              50% {
                .transform(scale3d(1.5, 1.5, 1));
              }
              100% {
                .transform(scale3d(1, 1, 1));
              }
            }
            @-webkit-keyframes zoom-in {
              0% {
                .transform(scale3d(1, 1, 1));
              }
              50% {
                .transform(scale3d(1.5, 1.5, 1));
              }
              100% {
                .transform(scale3d(1, 1, 1));
              }
            }
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
          .comment {
            font-size: 26*@px;
            color: #8C8C8C;
            display: inline-block;
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
