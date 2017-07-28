<template>
  <div>
    <header-common title="鑽石貢獻榜" :backLink="backLink"></header-common>
    <section class="section-list"
             :class="{'not-status-bar': !overlapStatusBar}">
      <template v-for="(item,i) in items">
        <rank-item action="diamond"
                   :rank="i+1"
                   :item="item"
                   :showTrackBtn="showTrackBtn"></rank-item>
      </template>
    </section>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        backLink: { name: 'main_live', params: { id: this.$route.params.id } },
        showTrackBtn: false,
        items: [],
      };
    },
    methods: {
      reload() {
        const vm = this;
        vm.api('Live').get({
          action: 'get_live_diamond_rank',
          id: vm.$route.params.id,
        }, {}).then((resp) => {
          vm.items = resp.data;
        });
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';

  .section-list {
    position: absolute;
    top: @height-header + @height-statusbar;
    left: 0;
    right: 0;
    bottom: 0;
    .app-scroll();
    background: #E4E4EB;
    &.not-status-bar {
      top: @height-header;
    }
  }
</style>
