<template>
  <div>
    <header-common title="朋友(10)">
      <div slot="right" class="scan-btn">
        <a href="javascript:;" class="scan-icon"></a>
      </div>
    </header-common>


    <div class="member-friends">
      <div class="member-info">

      </div>
    </div>

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
  .member-friends {
    .member-info {
      height: 252*@px;
      background: @bg-header;
    }
  }
</style>
