/* eslint-disable */
/* 程序配置 */
import mixins from '../mixins';

const config = {
  // 平台标识符，暂用于区分菜单
  project: 'myproject',
  // API Root，指定后台地址
  // api_root: (process.env.NODE_ENV === 'production') ? 'http://wecanlive.local.puahzj.com/api' : 'http://127.0.0.1:8000/api',
  // api_root: (process.env.NODE_ENV === 'production') ? 'http://app.local.easecloud.cn/api' : 'http://127.0.0.1:8000/api',
  api_root: (process.env.NODE_ENV === 'production') ?
    'http://wecanlive.vpsx.easecloud.cn:10080/api' : '/api',
  // 多套 API
  // api: {
  //   site_a: 'http://a.example.com/api',
  //   site_b: 'http://b.example.com/api',
  //   site_c: 'http://c.example.com/api',
  // },
  // API 格式，串接在 VueResource 字符串后面的格式
  api_format: '{/id}{/action}/',
  // api model 是否自动调整 (underscore: 自动将驼峰转换为下划线格式; off: 不自动转换)
  // 缺省 underscore
  api_model_adjust: 'underscore',
  // 平台名称
  platform_name: 'WeCanLive',
  // 版本号
  version: '1.0',
  // 初始路由
  init_route: { name: 'main_user_list' },
  // 初始登录的处理 function(vm)
  on_login() {
    const vm = this;
    vm.$router.replace(vm.config.init_route);
  },
  route_login: { name: 'passport_signup' },
  // 右上角的按钮链接
  tooltip_menus: [
    // { label: '原型', href: 'http://example.com/prototype/' },
  ],
  // 是否传送跨域 cookie
  cross_origin: true,
  // 权限菜单配置
  dynamic_menus: false,
  // 是否不加载 Vue Beauty 库
  skip_vue_beauty: false,
  // dynamic_menus: {
  //   model: 'Menu',
  //   action: 'get_user_menu',
  // }
  // 腾讯云通讯
  webim_appid: '1400033878',
  webim_account_type: 13638,
  action_authenticate(reload = true) {
    const vm = this;
    if (vm.me && !reload) return Promise.resolve(vm.me);
    return vm.api('User').get({ action: 'current', }).then(resp => {
      vm.current_user = resp.data;
      // 登录腾讯云通讯
      window.webim.login(
        {
          sdkAppID: config.webim_appid,
          appIdAt3rd: config.webim_appid,
          accountType: config.webim_account_type,
          identifier: resp.data.username,
          userSig: resp.data.tencent_sig,
        },
        {
          // 用于监听用户连接状态变化的函数，选填 Function
          onConnNotify(resp) {
            let info;
            switch (resp.ErrorCode) {
              case webim.CONNECTION_STATUS.ON:
                webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
                break;
              case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
                alert(info);
                webim.Log.warn(info);
                break;
              case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                alert(info);
                webim.Log.warn(info);
                break;
              default:
                webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
                break;
            }
          },
          // 用于IE9(含)以下浏览器中jsonp回调函数,移动端可不填，pc端必填 Function
          // jsonpCallback() {
          //   // 设置jsonp返回的
          //   webim.setJsonpLastRspData(rspData);
          // },
          // 监听新消息函数，必填 Func
          // newMsgList 为新消息数组，结构为[Msg]
          onMsgNotify(newMsgList) {
            newMsgList.forEach(msg => {
              // 全部交由 dealIM 路由处理
              if (window.app) window.app.dealIM(msg);
            });
          },
          // 监听新消息(直播聊天室)事件，直播场景下必填 Function
          // onBigGroupMsgNotify() {
          // },
          // 监听群资料变化事件，选填 Object
          onGroupInfoChangeNotify(groupInfo) {
            // webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
            // var groupId = groupInfo.GroupId;
            // var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
            // var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
            // var newOwner = groupInfo.OwnerAccount;//新的群主id, 为空，则表示没有变化
            // var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
            // var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化
            //
            // if (newName) {
            //   更新群组列表的群名称
            //   To do
            // webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
            // }
          },
          // 监听（多终端同步）群系统消息事件，必填 Object
          // 监听（多终端同步）群系统消息方法，方法都定义在receive_group_system_msg.js文件中
          // 注意每个数字代表的含义，比如，
          // 1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息
          onGroupSystemNotifys: {
            // "1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到）
            // "2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到）
            // "3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到）
            // "4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到)
            // "5": onDestoryGroupNotify, //群被解散(全员接收)
            // "6": onCreateGroupNotify, //创建群(创建者接收)
            // "7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收)
            // "8": onQuitGroupNotify, //主动退群(主动退出者接收)
            // "9": onSetedGroupAdminNotify, //设置管理员(被设置者接收)
            // "10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收)
            // "11": onRevokeGroupNotify, //群已被回收(全员接收)
            // "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
          },
          // 监听好友系统通知事件，选填 Object
          //监听好友系统通知函数对象，方法都定义在receive_friend_system_msg.js文件中
          onFriendSystemNotifys: {
            // "1": onFriendAddNotify, //好友表增加
            // "2": onFriendDeleteNotify, //好友表删除
            // "3": onPendencyAddNotify, //未决增加
            // "4": onPendencyDeleteNotify, //未决删除
            // "5": onBlackListAddNotify, //黑名单增加
            // "6": onBlackListDeleteNotify//黑名单删除
          },
          // 监听资料系统（自己或好友）通知事件，选填 Object
          // 监听资料系统通知函数对象，方法都定义在receive_profile_system_msg.js文件中
          onProfileSystemNotifys: {
            // "1": onProfileModifyNotify//资料修改
          },
          // 被其他登录实例踢下线，选填 Function
          // onKickedEventCall() {
          // },
          // 监听C2C系统消息通道，选填 Object
          //监听C2C消息通道的处理，方法在receive_new_msg.js文件中
          // onC2cEventNotifys: {
          // "92": onMsgReadedNotify,//消息已读通知
          // },
        },  // listeners
        {},  // options
        resp => {
          console.log('>>>>>===== webim success', resp);
        },
        err => {
          console.log('>>>>>===== webim error', resp);
        }
      );
      return vm.current_user;
    });
  },
  action_init_mixins(Vue) {
    Vue.mixin(mixins);
  },
  action_cordova_ready(Vue) {
    if (window.TencentMLVB) {
      window.TencentMLVB.getVersion();
    }
    if (window.WeCan) {
      window.WeCan.init(
        '2', // gameId
        '6Wn4ebr9kaQHGWLa', // gameKey
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh2sxFSpovptJ/+JgkVuLB1CzQJc/ngY9x9nCPAkIjYru1AU7/83MC3KsyOL9M1wiJMKXK15pIriG6Lsb5blGrs87zWe/D5fC6BdQLHLncjszwM7/g8vaickTY5xw1z8MORT6W72xyhPi1khUZxGA0LQIBMBhp1+YMO5V2GLkrqpt7CQpRwfBxx/4lqbhhZjwiV7sUfc5jkWM7ymVTk9qobt1+qkp7mKEdMz3m9fJbFXNue6oTXqyK4iZooQShs2xnJ05jELqmYNa5pNrEkcX3Ig4qVNJQ8ZdJuwDCnYvizVSbEo1hxG1WKjmDFYb5udMLolRFowQNU7sWi+jLpfrSwIDAQAB', // Public Key
        'extraInfo' // extraInfo
      );
    }
  },
  action_logout(Vue) {
    const vm = this;
    return vm.api('User').get({ action: 'logout' }).then(() => {
      vm.current_user = null;
      vm.$router.push({ name: 'passport_signin' });
    });
    if (window.WeCan) {
      window.WeCan.logout();
    }
  },
};

export default config;
