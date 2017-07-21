<template>
  <div class="page-follow">
    <header-common>
      <div slot="left"></div>
      <div slot="middle" class="follow-header">
        <h1 class="head">追蹤名單推薦</h1>
        <h2 class="subhead">新手上路 wecan 爲您精選推薦直播</h2>
      </div>
      <div slot="right" class="btn-close">
        <router-link :to="{name: 'main_index'}" class="btn close"></router-link>
      </div>
    </header-common>


    <div class="follow-list">
      <ul>
        <li class="follow-item active"
            :class="{active: selectedItems.indexOf(member.user) > -1}"
            v-for="member in items"
            @click="toggleSelect(member.user)">
          <div class="avatar" :style="{backgroundImage: 'url('+member.avatar_url+')'}"></div>
          <div class="member-info">
            <div class="member-name">{{member.nickname}}</div>
            <div class="member-follow">
              <div class="follow-icon"></div>
              {{member.count_followed}}
            </div>
            <div class="member-title">{{member.signature}}</div>
          </div>
          <div class="active-icon" v-if="selectedItems.indexOf(member.user) > -1"></div>
        </li>
      </ul>
    </div>

    <div class="submit-btn">
      <a href="javascript:;" class="btn"
         @click="submit()">完成</a>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        model: 'Member',
        items: [],
        selectedItems: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api().get({
          is_new_recommended: 'True',
          page_size: 50,
        }).then(resp => {
          vm.items = resp.data.results;
        });
      },
      toggleSelect(memberId) {
        const vm = this;
        const index = vm.selectedItems.indexOf(memberId);
        if (index > -1) {
          vm.selectedItems.splice(index, 1);
        } else {
          vm.selectedItems.push(memberId);
        }
      },
      submit() {
        const vm = this;
        vm.selectedItems.forEach(memberId => {
          vm.api().save({
            action: 'follow',
            id: memberId,
          }, {}).then(() => {
            vm.authenticate(true).then(() => {
              vm.$router.replace({ name: 'main_index' });
            });
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
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
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: scroll;
      .app-scroll;
      box-sizing: border-box;
      .follow-item {
        position: relative;
        border-bottom: 1px solid @color-border;
        padding: 0 80*@px 15*@px 135*@px;
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
            .nowrap();
            font-size: 32*@px;
            line-height: 1rem;
            height: 1rem;
          }
          .member-follow {
            line-height: 36*@px;
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
            .nowrap();
            color: #959595;
            font-size: 26*@px;
            height: 36*@px;
            line-height: 36*@px;
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

