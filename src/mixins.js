// Mixins
import * as common from './components/_common';
import * as popup from './components/_popup';

export default {
  mounted() {
  },
  components: { ...common, ...popup },
  computed: {
  },
  filters: {
    number(value) {
      let val = Number(value);
      if (val >= 1000) {
        val = val % 1000 !== 0 ? `${(val / 1000).toFixed(1)}k` : `${(val / 1000)}k`;
      }
      return val;
    },
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
