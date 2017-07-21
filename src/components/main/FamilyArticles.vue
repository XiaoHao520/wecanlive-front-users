<template>
  <div class="page-family-articles">
    <header-common title="家族公告"></header-common>
    <div class="family-articles-list">
      <div class="all-unread-btn">
        <a href="javascript:;">標記全部已讀</a>
      </div>
      <ul>
        <li v-for="item in items" class="articles-item">
          <router-link :to="{name:'main_family_article_detail', params: {id: item.id} }" href="javascript:;">
            <div class="title">{{ item.name }}</div>
            <div class="date">{{ item.date_created | date('yyyy/mm/dd HH:MM') }}</div>
            <div class="content">{{ item.content }}</div>
          </router-link>
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
        vm.api('FamilyArticle').get({
          family: vm.$route.params.id,
        }).then((resp) => {
          vm.items = resp.data.results;
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-articles {
    background: #E5E5EC;
    .family-articles-list {
      position: absolute;
      top: @height-header;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: scroll;
      .app-scroll();
      padding: 0 30*@px;
      .all-unread-btn {
        color: #3902EF;
        text-align: right;
        font-size: 30*@px;
        padding: 30*@px 0 20*@px 0;
      }
      .articles-item {
        background: #fff;
        margin-bottom: 30*@px;
        border-radius: 10*@px;
        padding: 18*@px 0 20*@px 0;
        .title {
          padding: 0 20*@px;
          color: #3902EF;
          font-size: 36*@px;
        }
        .date {
          font-size: 24*@px;
          color: #8D8D8D;
          padding: 13*@px 20*@px;
          border-bottom: 1px solid @color-border;
        }
        .content {
          margin-top: 10*@px;
          padding: 0 20*@px;
          font-size: 30*@px;
          line-height: 40*@px;
          color: #6B6B6B;
          word-wrap: break-word;
          .text-overflow(3, 120*@px);
        }
      }
    }
  }


</style>
