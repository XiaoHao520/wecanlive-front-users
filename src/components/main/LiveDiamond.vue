<template>
  <div>
    <header-common title="鑽石貢獻榜" :backLink="backLink"></header-common>
    <section class="section-list"
             :class="{'not-status-bar': !overlapStatusBar}">
      <template v-for="i in 10">
        <rank-item action="diamond"
                   :rank="i"
                   :showTrackBtn="showTrackBtn"></rank-item>
      </template>
    </section>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    data() {
      return {
        backLink: { name: 'main_live', params: { id: 0 } },
        showTrackBtn: false,
      };
    },
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';

  .section-list {
    position: absolute;
    top: @height-header + @height-status-bar;
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
