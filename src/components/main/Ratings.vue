<template>
  <div class="page-ratings">
    <header-common>
      <div slot="middle">
        <ul>
          <li class="ratings-type">
            <a href="javascript:;">鑽石榜</a>
          </li>

          <li class="ratings-type">
            <a href="javascript:;">送禮榜</a>
          </li>

          <li class="ratings-type">
            <a href="javascript:;">星光榜</a>
          </li>
        </ul>
      </div>
    </header-common>
  </div>
</template>

<script type="text/babel" lang="babel">
  export default {
    methods: {
      reload() {
      },
    },
  };
</script>

<style rel="stylesheet/less" type="text/less" lang="less" scoped>
  @import (once) '../../vue2-front/assets/css/less-template/template';
  @import (once) '../../assets/css/defines';
</style>
