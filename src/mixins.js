// Mixins
import * as common from './components/_common';

export default {
  mounted() {
  },
  components: { ...common },
  computed: {
  },
  filters: {
  },
  methods: {
    /**
     * 重写路由返回方法
     * 路由返回用此方法
     */
    goBack(backLink = null) {
      const vm = this;
      window.isBack = true;
      if (backLink) {
        vm.$router.replace(backLink);
      } else {
        window.history.go(-1);
      }
    },
  },
};
