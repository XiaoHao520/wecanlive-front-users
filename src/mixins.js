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
    goBack() {
      window.isBack = true;
      window.history.go(-1);
    },
  },
};
