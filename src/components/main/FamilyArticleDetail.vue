<template>
  <div class="page-family-article-detail">
    <header-common title="家族公告詳情"></header-common>

    <div class="family-article-detail">
      <div class="title">{{ item.name }}</div>
      <div class="author-date">
        <span class="author">{{ choices.role[item.author_role] }} {{ item.author_nickname }} 發佈</span>
        <span class="date">{{ item.date_created | date('mm/dd HH:MM') }}</span>
      </div>

      <!--todo 要放图片-->
      <div class="content">{{ item.content }}</div>
    </div>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        item: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('FamilyArticle').get({
          id: vm.$route.params.id,
        }).then((resp) => {
          vm.item = resp.data;
          console.log(vm.item);
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .page-family-article-detail {
    .family-article-detail {
      padding: 35*@px 30*@px;
      .title {
        font-size: 38*@px;
        height: 40*@px;
        line-height: 40*@px;
      }
      .author-date {
        margin-top: 20*@px;
        font-size: 24*@px;
        height: 24*@px;
        line-height: 24*@px;
        color: #8D8D8D;
        padding-bottom: 14*@px;
        border-bottom: 1px solid @color-border;
        .date {
          float: right;
        }
      }
      .content {
        margin-top: 30*@px;
        font-size: 32*@px;
        line-height: 42*@px;
        word-wrap: break-word;
      }
    }
  }
</style>
