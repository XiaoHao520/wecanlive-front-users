// Mixins
import * as common from './components/_common';
import * as popup from './components/_popup';

export default {
  mounted() {
  },
  components: { ...common, ...popup },
  computed: {
    overlapStatusBar() {
      return /iPhone/.test(navigator.userAgent)
        && /Cordova/.test(navigator.userAgent);
    },
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
    delta(lat, lon) {
      const PI = 3.14159265358979324;
      const a = 6378245.0;
      const ee = 0.00669342162296594323;
      let dLat = this.transformLat(lon - 105.0, lat - 35.0);
      let dLon = this.transformLon(lon - 105.0, lat - 35.0);
      const radLat = lat / 180.0 * PI;
      let magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      const sqrtMagic = Math.sqrt(magic);
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
      dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
      return { lat: dLat, lon: dLon };
    },
    gcj_encrypt(wgsLat, wgsLon) {
      if (this.outOfChina(wgsLat, wgsLon)) return { lat: wgsLat, lon: wgsLon };

      const d = this.delta(wgsLat, wgsLon);
      return { lat: wgsLat + d.lat, lon: wgsLon + d.lon };
    },
    gcj_decrypt(gcjLat, gcjLon) {
      if (this.outOfChina(gcjLat, gcjLon)) return { lat: gcjLat, lon: gcjLon };

      const d = this.delta(gcjLat, gcjLon);
      return { lat: gcjLat - d.lat, lon: gcjLon - d.lon };
    },
    wgs_bd(wgsLat, wgsLon) {
      if (this.outOfChina(wgsLat, wgsLon)) return { lat: wgsLat, lon: wgsLon };

      const d = this.delta(wgsLat, wgsLon);
      return this.bd_encrypt(wgsLat + d.lat, wgsLon + d.lon);
    },
    bd_encrypt(gcjLat, gcjLon) {
      const xPi = 3.14159265358979324 * 3000.0 / 180.0;
      const x = gcjLon;
      const y = gcjLat;
      const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi);
      const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi);
      const bdLon = z * Math.cos(theta) + 0.0065;
      const bdLat = z * Math.sin(theta) + 0.006;
      return { lat: bdLat, lon: bdLon };
    },
    outOfChina(lat, lon) {
      if (lon < 72.004 || lon > 137.8347) {
        return true;
      }
      if (lat < 0.8293 || lat > 55.8271) {
        return true;
      }
      return false;
    },
    transformLat(x, y) {
      const PI = 3.14159265358979324;
      let ret = -100.0 + (2.0 * x) + (3.0 * y) + (0.2 * y * y) + (0.1 * x * y) + (0.2 * Math.sqrt(Math.abs(x)));
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
      return ret;
    },
    transformLon(x, y) {
      const PI = 3.14159265358979324;
      let ret = 300.0 + x + (2.0 * y) + (0.1 * x * x) + (0.1 * x * y) + (0.1 * Math.sqrt(Math.abs(x)));
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * PI) + (300.0 * Math.sin(x / 30.0 * PI))) * 2.0 / 3.0;
      return ret;
    },
    /**
     * 采用缓存机制，通过用户名获取一个用户对象
     * @param username
     */
    getUserByUsername(username) {
      const vm = this;
      if (!window.userBuffer) window.userBuffer = {};
      const userBuffer = window.userBuffer;
      return new Promise((resolve, reject) => {
        if (userBuffer[username]) resolve(userBuffer[username]);
        vm.api('User').get({ username, page_size: 1 }).then(resp => {
          if (!resp.data || !resp.data.results.length) reject();
          userBuffer[username] = resp.data.results[0];
          resolve(userBuffer[username]);
        });
      });
    },
    /**
     * 发送即时消息
     * @param target string 用户username/直播间live_{id}/家族family_{id}
     * @param content string JSON 格式的数据对象
     */
    sendIM(target, content) {
      const webim = window.webim;
      const vm = this;
      const isGroup = /^(?:live|family)_\d+$/.test(target);
      const session = new webim.Session(
        isGroup ? webim.SESSION_TYPE.GROUP : webim.SESSION_TYPE.C2C,
        target,
      );
      // 如果 content 是字符串，直接发送，否则自动 JSON 串行化。
      const elem = new webim.Msg.Elem.Custom(
        typeof content === 'string' ? content : JSON.stringify(content), '', '');
      const msg = new webim.Msg(
        session,
        true,
        Math.floor(Math.random() * 100000000),
        Math.floor(Math.random() * 100000000),
        Math.floor(Number(new Date()) / 1000),
        vm.me.username,
        isGroup ? webim.GROUP_MSG_SUB_TYPE : webim.C2C_MSG_SUB_TYPE,
        vm.me.username,
      );
      msg.addCustom(elem);
      webim.sendMsg(msg);
    },
    /**
     * 处理接收到的 IM 消息
     * 路由消息并且分发给应用界面
     * @param msg webim.Msg 实例
     * https://www.qcloud.com/document/product/269/1594#2.4-.E6.B6.88.E6.81.AF.E5.AF.B9.E8.B1.A1msg
     */
    dealIM(msg) {
      const vm = this;
      if (!window.webim) return;
      msg.getElems().forEach(elem => {
        try {
          const data = {
            fromAccount: msg.fromAccount,
            sessionId: msg.sess.id(),
            data: JSON.parse(elem.content.data),
          };
          const isSelfSend = data.fromAccount === vm.me.username;
          // console.error(data);
          // 直播室消息
          if (/^live_\d+$/.test(data.sessionId)) {  // 直播间消息
            // 如果当前不是在直播间里面，忽略这条消息
            if (vm.$route.name !== 'main_live' ||
              `live_${vm.$route.params.id}` !== data.sessionId) return;
            // 获取 main_live 房间的 vm
            const vmLive = vm.getVmByName('main_live');
            // 各种类型消息的路由
            if (data.data.type === 'like') { // 点爱心
              vmLive.showLike(!isSelfSend);
            } else if (data.data.type === 'comment') { // 发普通评论
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showComment({
                  sender: user,
                  data: data.data,
                });
              });
            } else if (data.data.type === 'barrage') { // 弹幕
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showBarrage({
                  sender: user,
                  data: data.data,
                });
              });
            } else if (data.data.type === 'gift') { // 送礼物
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showGift({
                  sender: user,
                  data: data.data,
                });
              });
            } else if (data.data.type === 'share') { // 分享
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showShare(user);
              });
            } else if (data.data.type === 'follow') { // 追踪
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showFollow(user);
              });
            } else if (data.data.type === 'notify') { // 事件通知
              vm.getUserByUsername(data.fromAccount).then(user => {
                vmLive.showNotify({
                  sender: user,
                  data: data.data,
                });
              });
            } else if (data.data.type === 'system') { // 系统消息
              vmLive.showSystem({
                data: data.data,
              });
            }
          } else if (/^family_\d+$/.test(data.sessionId)) {  // 家族消息
            //
            if (vm.$route.name !== 'main_family_chat' ||
              `family_${vm.$route.params.id}` !== data.sessionId) return;
            //
            const vmFamily = vm.getVmByName('main_family_chat');
            console.log(data.data);
            vmFamily.showMessage({ data: data.data });
          } else if (data.sessionId === vm.me.username) {  // 发给自己的消息
            // TODO: 未实现
          } else {
            console.error('未定义的消息格式', data);
          }
        } catch (e) {
          // pass
        }
      });
    },
  },
};
