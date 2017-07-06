<template>
  <div class="page-active-event-write">
    <header-common title="分享動態"
                   :backLink="{name: 'main_active_event'}">
      <div slot="right" class="submit-btn">
        <a href="javascript:;" @click="submit()">完成</a>
      </div>
    </header-common>


    <div class="active-event-write-block">
      <div class="event-write">
        <textarea v-model="content" class="write"></textarea>
        <div class="event-limit">100字內</div>
      </div>

      <div class="photo-list">
        <ul>
          <li v-for="(image,i) in image_items"
              :style="{backgroundImage: 'url('+ image.image +')'}"
              class="photo-item "
              :class="{'photo-item-last' : (i+1)% 3 ==0 }"></li>
        </ul>
      </div>

    </div>


  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        image_items: [],
        content: '',
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.image_items = vm.getContext('images');
      },
      submit() {
        const vm = this;
        vm.api('ActiveEvent').save({
          author: vm.me.id,
          type: 'IMAGE',
          content: vm.content,
//          images: vm.image_items,
        }).then(() => {
          vm.setContext('images', '');
          vm.$router.push({ name: 'main_index' });
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .page-active-event-write {
    background: #E6E6E8;
    .active-event-write-block {
      padding: 30*@px 30*@px 0 30*@px;
      .event-write {
        background: #fff;
        padding: 30*@px;
        .border-radius(15*@px);
        overflow: hidden;
        .write {
          height: 200*@px;
          width: 100%;
          resize: none;
          border: 0;
          font-size: 30*@px;
          padding: 0;
        }
        .event-limit {
          font-size: 26*@px;
          text-align: right;
          color: #BCBEC0;
          margin-top: 10*@px;
        }
      }
      .photo-list {
        ul {
          .clearfix();
        }
        .photo-item {
          float: left;
          margin: 30*@px 30*@px 0 0;
          width: 210*@px;
          height: 210*@px;
          background: 50% 50% no-repeat #ccc;
          background-size: cover;
          .border-radius(15*@px);
          &.photo-item-last {
            margin-right: 0;
          }
        }
      }
    }
  }


</style>
