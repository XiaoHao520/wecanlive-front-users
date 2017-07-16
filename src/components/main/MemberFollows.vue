<template>
  <div class="page-member-follows">
    <header-common title="追蹤"></header-common>
    <div class="list">
      <ul>
        <li v-for="item in items" class="item">
          <div class="avatar" :style="{backgroundImage: 'url(' + item.avatar_url + ')'}"></div>
          <div class="content">
            <div class="name">{{ item.nickname }}</div>
            <div class="info">
              <div class="gender"
                   :class="{'female' : item.gender==='F' ,'male' : item.gender==='M' }"></div>
              <div class="age">{{ item.age }}歲</div>
              <div class="cont">{{ choices.constellation[item.constellation] }}</div>
            </div>
            <a href="javascript:;" class="add-btn">正在直播</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        items: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Member').get({
          member: vm.me.id,
          is_followed: 'True',
        }, {}).then((resp) => {
          vm.items = resp.data.results;
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-member-follows {
    background: #E5E5EC;
    .list {
      background: #fff;
      padding: 30*@px 30*@px 0 30*@px;
      .item {
        border-bottom: 1px solid @color-border;
        padding: 0 0 15*@px 138*@px;
        position: relative;
        margin-bottom: 15*@px;
        &:last-child {
          border: 0;
          margin: 0;
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
        .content {
          height: 120*@px;
          box-sizing: border-box;
          padding-top: 32*@px;
          .name {
            font-size: 24*@px;
            height: 24*@px;
            line-height: 24*@px;
            margin-bottom: 10*@px;
          }
          .info {
            .clearfix();
            .gender {
              height: 36*@px;
              width: 36*@px;
              background: 50% 50% no-repeat;
              background-size: 100%;
              float: left;
              margin-right: 23*@px;
              &.female {
                background-image: url("../../assets/image/B3/icon_female@3x.png");
              }
              &.male {
                background-image: url("../../assets/image/B3/icon_male@3x.png");
              }
            }
            .age, .cont {
              margin-right: 10*@px;
              font-size: 25*@px;
              height: 36*@px;
              line-height: 36*@px;
              float: left;
              color: #8A8A8A;
            }
          }
          .add-btn {
            width: 144*@px;
            height: 50*@px;
            background: #FD0202;
            color: #fff;
            display: block;
            position: absolute;
            right: 0;
            top: 35*@px;
            font-size: 24*@px;
            line-height: 50*@px;
            border-radius: 25*@px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
