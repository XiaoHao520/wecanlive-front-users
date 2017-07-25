<template>
  <div class="page-family-detail">
    <header-common title="家族详情"></header-common>
    <div class="family-detail">
      <div class="family-info">
        <div class="family-base">
          <div class="avatar" :style="{backgroundImage: 'url(' + family.logo_item.image + ')'}">
            <div class="level">Lv.2</div>
          </div>
          <div class="family-name">
            <div class="name">{{ family.name }}</div>
            <!--todo-->
            <div class="con">贡献值 : 2000</div>
            <div class="date">成立时间: {{ family.date_created | date('yyyy-mm-dd')}}</div>
            <router-link :to="{name: 'main_family_manage', params:{id: $route.params.id} }"
                         class="manage-btn" v-if="me.id == family.author">管理家族</router-link>
          </div>
        </div>

        <div class="family-intro">
          <div class="intro">
            家族簡介: {{ family.family_introduce }}
          </div>
          <div class="more-btn"></div>
        </div>
      </div>


      <div class="family-member-list">
        <div class="member-type">
          家族管理員 ({{ manager_items.length }})
          <a href="javascript:;" class="hide-btn"
             @click="manager_display=!manager_display"
             :class="{'show-btn': !manager_display}"
          ></a>
        </div>


        <div v-if="manager_display" class="member-list">
          <ul>
            <template v-for="item in manager_items">
              <li class="member-item">
                <div class="avatar" :style="{backgroundImage: 'url(' + item.author_avatar + ')'}"></div>
                <div class="member-info">
                  <div class="name">{{ item.author_nickname }}</div>
                  <div class="detail">
                    <div class="sex"
                         :class="{'female': item.author_gender == 'F',
                                  'male': item.author_gender == 'M'}"></div>
                    <div class="age">{{ item.author_age }}歲</div>
                    <div class="constellation">{{ choices.constellation[item.author_constellation] }}</div>
                  </div>
                  <!--todo-->
                  <div class="con">貢獻值 : 2000</div>
                </div>
                <div v-if="item.role=='MASTER'" class="title master">家族長</div>
                <div v-if="item.role=='ADMIN'" class="title manager">家族管理員</div>
              </li>
            </template>
          </ul>
        </div>


        <div class="member-type">
          家族成員 ({{ member_items.length }})
          <a href="javascript:;" class="hide-btn"
             @click="member_display=!member_display"
             :class="{'show-btn': !member_display}"
          ></a>
        </div>

        <div v-if="member_display" class="member-list">
          <ul>
            <template v-for="item in member_items">
              <li class="member-item">
                <div class="avatar" :style="{backgroundImage: 'url(' + item.author_avatar + ')'}"></div>
                <div class="member-info">
                  <div class="name">{{ item.author_nickname }}</div>
                  <div class="detail">
                    <div class="sex"
                         :class="{ 'female': item.author_gender =='F' ,
                                   'male': item.author_gender == 'M' }"></div>
                    <div class="age">{{ item.author_age }}歲</div>
                    <div class="constellation">{{ choices.constellation[item.author_constellation] }}</div>
                  </div>
                  <!--todo-->
                  <div class="con">貢獻值 : 2000</div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        manager_display: true,
        member_display: true,
        family: [],
        items: [],
        manager_items: [],
        member_items: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Family').get({
          id: vm.$route.params.id,
        }).then((resp) => {
          vm.family = resp.data;
        });
        vm.api('FamilyMember').get({
          family: vm.$route.params.id,
          status: 'APPROVED',
        }).then((resp) => {
          vm.items = resp.data.results;
          vm.items.forEach((member) => {
            console.log(member);
            if (member.role === 'ADMIN' || member.role === 'MASTER') {
              vm.manager_items.push(member);
            } else if (member.role === 'NORMAL') {
              vm.member_items.push(member);
            }
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-detail {
    .family-detail {
      position: absolute;
      top: @height-header;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: scroll;
      .app-scroll();
      .family-info {
        background: @bg-header;
        padding: 45*@px 30*@px 0 30*@px;
        .family-base {
          padding-left: 195*@px;
          position: relative;
          .avatar {
            position: absolute;
            top: 0;
            left: 0;
            width: 165*@px;
            height: 165*@px;
            .border-radius(50%);
            background: url("../../assets/image/D/d2_1_pic_head_family@3x.png") 50% 50% no-repeat;
            background-size: cover;
            .level {
              background: url("../../assets/image/D/d2_1_bg_lv@3x.png") 50% 50% no-repeat;
              width: 90*@px;
              height: 26*@px;
              background-size: 100%;
              font-size: 17*@px;
              color: #fff;
              text-align: center;
              line-height: 26*@px;
              position: absolute;
              bottom: -5*@px;
              left: 50%;
              -webkit-transform: translate(-50%, 0);
              -moz-transform: translate(-50%, 0);
              -ms-transform: translate(-50%, 0);
              -o-transform: translate(-50%, 0);
              transform: translate(-50%, 0);
            }
          }
          .family-name {
            height: 165*@px;
            .border-box();
            padding-top: 20*@px;
            position: relative;
            .name {
              font-size: 35*@px;
              color: #fff;
              line-height: 35*@px;
            }
            .con, .date {
              margin-top: 17*@px;
              color: rgba(255, 255, 255, 0.6);
              font-size: 28*@px;
              line-height: 28*@px;
            }
            .manage-btn {
              position: absolute;
              right: 0;
              display: block;
              height: 56*@px;
              width: 150*@px;
              color: #fff;
              background-color: #2A01A6;
              font-size: 29*@px;
              text-align: center;
              line-height: 56*@px;
              border-radius: 30*@px;
              top: 20*@px;
            }
          }
        }
        .family-intro {
          margin-top: 30*@px;
          .intro {
            color: rgba(255, 255, 255, 0.8);
            min-height: 110*@px;
            font-size: 27*@px;
            line-height: 37*@px;
          }
          .more-btn {
            margin-top: 15*@px;
            height: 45*@px;
            background: url("../../assets/image/D/d2_1_icon_moredown@3x.png") 50% 0 no-repeat;
            background-size: 34*@px;
          }
        }
      }
      .family-member-list {
        .member-type {
          background: svg-gradient(to right, #1094FC, #03E6EA);
          padding: 0 30*@px;
          height: 70*@px;
          font-size: 30*@px;
          color: #fff;
          line-height: 70*@px;

          .hide-btn {
            display: inline-block;
            height: 100%;
            float: right;
            width: 44*@px;
            background: url("../../assets/image/D/d2_1_icon_retandown@3x.png") 50% 50% no-repeat;
            background-size: 100%;
            &.show-btn {
              background: url("../../assets/image/D/d2_1_icon_retanup@3x.png") 50% 50% no-repeat;
              background-size: 100%;
            }
          }
        }
        .member-list {
          ul {
            padding: 0 30*@px;
            .member-item {
              border-bottom: 1px solid @color-border;
              padding: 18*@px 0 18*@px 140*@px;
              position: relative;
              &:last-child {
                border-bottom: 0;
              }
              .avatar {
                width: 120*@px;
                height: 120*@px;
                border-radius: 50%;
                background: url("../../assets/image/example/avatar.png") 50% 50% no-repeat;
                background-size: cover;
                position: absolute;
                top: 18*@px;
                left: 0;
              }
              .member-info {
                height: 120*@px;
                padding-top: 10*@px;
                .border-box();
                .name {
                  font-size: 24*@px;
                  line-height: 24*@px;
                }
                .detail {
                  margin-top: 10*@px;
                  height: 28*@px;
                  line-height: 28*@px;
                  font-size: 24*@px;
                  .clearfix();
                  .sex {
                    height: 100%;
                    width: 28*@px;
                    float: left;
                    &.female {
                      background: url("../../assets/image/B3/icon_female@3x.png") 50% 50% no-repeat;
                      background-size: 100%;
                    }
                    &.male {
                      background: url("../../assets/image/B3/icon_male@3x.png") 50% 50% no-repeat;
                      background-size: 100%;
                    }
                  }
                  .age, .constellation {
                    float: left;
                    margin-left: 10*@px;
                    height: 100%;
                    line-height: 28*@px;
                    color: #8D8D8D;
                  }
                }
                .con {
                  font-size: 24*@px;
                  color: #8D8D8D;
                  margin-top: 10*@px;
                  line-height: 24*@px;
                }
              }
              .title {
                position: absolute;
                right: 0;
                top: 50%;
                -webkit-transform: translate(0, -50%);
                -moz-transform: translate(0, -50%);
                -ms-transform: translate(0, -50%);
                -o-transform: translate(0, -50%);
                transform: translate(0, -50%);
                height: 50*@px;
                font-size: 28*@px;
                color: #fff;
                width: 160*@px;
                text-align: center;
                line-height: 50*@px;
                border-radius: 30*@px;
                &.master {
                  background: #2D02ED;
                }
                &.manager {
                  background: #A001FA;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
