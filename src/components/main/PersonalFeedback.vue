<template>
  <div class="page-personal-feedback">
    <header-common title="意見反饋"></header-common>

    <div class="feedback-block">
      <textarea class="feedback-text"
                placeholder="有什麼意見可以反饋給我們，如採納，有重賞～"></textarea>
      <div class="limit">限 50 字</div>

      <a href="javascript:;" class="submit-btn">確定</a>
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

  .page-personal-feedback {
    background: #E5E5EC;
    .feedback-block {
      padding: 30*@px 30*@px 0 30*@px;
      .feedback-text {
        background: #fff;
        resize: none;

        width: 100%;
        height: 292*@px;
        box-sizing: border-box;
        border-radius: 20*@px;
        border: 0; padding: 40*@px;
        font-size: 32*@px;
      }
      .limit {
        font-size: 22*@px;
        color: #8D8D8D;
        text-align: right;
        margin-top: 7*@px;
      }
      .submit-btn {
        display: block;
        border-radius: 45*@px;
        text-align: center;
        font-size: 32*@px;
        color: #fff;
        background: @color-submit;
        height: 90*@px;
        margin-top: 35*@px;
        line-height: 90*@px;
      }
    }
  }
</style>
