<template>
  <div class="page-message-list">
    <header-common title="系統訊息"></header-common>
    <div class="message-list">
      <ul>
        <li class="message-item">
          <div class="date">04/06 10:59</div>
          <div class="message-detail">
            <div class="avatar"></div>
            <div class=""></div>
          </div>
        </li>
      </ul>
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
  @import (once) '../../vue2-front/assets/css/less-template/template-defines';
  @import (once) '../../assets/css/defines';
</style>
