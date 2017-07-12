<template>
  <div class="page-comment-list">
    <header-common title="評論列表"></header-common>
    <div class="comment-list">
      <ul>
        <li v-for="item in items" class="comment-item">
          <div class="avatar"
               :style="{backgroundImage: 'url(' + item.author_avatar + ')'}"></div>
          <div class="item-info">
            <div class="comment-header">
              <div class="name">{{ item.author_nickname }}</div>
              <div class="date">{{ item.date_created | date('mm/dd HH:MM') }}</div>
            </div>
            <div class="comment-content">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="add-comment">
      <div class="add-icon"></div>
      <input type="text" v-model="comment_content"
             class="comment-input" placeholder="添加評論">
      <div class="send-btn" @click="submit()">發送</div>
    </div>

  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        items: [],
        id: this.$route.params.id,
        model: this.$route.params.model,
        comment_content: '',
      };
    },
    methods: {
      reload() {
        const vm = this;
        if (vm.model === 'activeevent') {
          vm.api('Comment').get({ activeevent: vm.id }).then((resp) => {
            vm.items = resp.data.results;
          });
        }
      },
      submit() {
        const vm = this;
        if (vm.comment_content.length === 0) {
          vm.notify('评论内容不能为空');
          return;
        }

        if (vm.model === 'activeevent') {
          vm.api('Comment').save({ action: 'add_comment' }, {
            activeevent: vm.id,
            content: vm.comment_content,
          }).then(() => {
            vm.comment_content = '';
            vm.reload();
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-comment-list {
    .comment-list {
      padding: 30*@px 30*@px 0 30*@px;
      box-sizing: border-box;
      position: absolute;
      top: @height-header;
      bottom: 87*@px;
      left: 0;
      right: 0;
      overflow-y: scroll;
      .app-scroll();
      .comment-item {
        padding: 0 0 10*@px 132*@px;
        border-bottom: 1px solid @color-border;
        position: relative;
        margin-bottom: 15*@px;
        &:last-child {
          border-bottom: 0;
        }
        .avatar {
          width: 120*@px;
          height: 120*@px;
          position: absolute;
          top: 0;
          left: 0;
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          border-radius: 50%;
        }
        .item-info {
          padding-top: 10*@px;
          min-height: 120*@px;
          .comment-header {
            height: 32*@px;
            line-height: 32*@px;
            .name {
              display: inline-block;
              font-size: 32*@px;
            }
            .date {
              float: right;
              color: #989898;
              font-size: 22*@px;
            }
          }
          .comment-content {
            margin-top: 10*@px;
            font-size: 25*@px;
            color: #989898;
            width: 345*@px;
            line-height: 33*@px;
          }
        }
      }
    }
    .add-comment {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 87*@px;
      box-sizing: border-box;
      border-top: 1px solid @color-border;
      padding: 0 180*@px 0 78*@px;
      .add-icon {
        position: absolute;
        left: 30*@px;
        width: 50*@px;
        height: 100%;
        background: url("../../assets/image/B1/icon_add_2@3x.png") 50% 50% no-repeat;
        background-size: 50*@px;
      }
      .send-btn {
        height: 100%;
        width: 180*@px;
        font-size: 32*@px;
        color: #fff;
        line-height: 87*@px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        background: @bg-header;
      }
      .comment-input {
        height: 100%;
        width: 100%;
        font-size: 26*@px;
        padding: 0 22*@px;
        box-sizing: border-box;
        .placeholder-color(#989898);
      }
    }
  }
</style>
