# wecanlive-front

> WeCanLive App Frontend

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


前端 IM 消息通讯格式定义：
--------------------------

在 `src/mixins.js` 里面的 `dealIM(msg)` 内定义消息的处理方法：

发送的内容一般遵循固定的格式用于路由，是一个标准的 json object。

在 `dealIM(msg)` 方法里面会捕获一切发送到当前登录用户的消息，并且按照一定规则封装到 data 对象中。

### 一般结构

发送的报文格式

```
vm.sendIM('live_5', {
  type: 'like',  // 这个是一个必填的项，后面的逻辑根据这个进行路由
  comment: '你好六哦',  // 这些后面的就随意了，根据实际需要填入数据
  ...
});
```

接收的报文格式

```
data = {
  fromAccount: 'admin',  // 这个是发送这条消息的用户的 username
  sessionId: 'live_5',  // 私聊的接收用户:username / 直播群:live_<id> / 家族群:family_<id>
  data: {  // 这个对象放的才是发出去的结构
    type: 'like',  // 必填，下面的业务逻辑会根据这个字段进行路由
    comment: '你好六哦',
    ...
  },
};
```

简单来说，固定的信息就是 `data.fromAccount`，`data.sessionId`，`data.data.type`，路由根据这三个固定的字段展开。

### 聊天室消息结构

聊天室消息统一的 `sessionId` 格式为 `live_<直播编号>`，现根据 `data.sessionId` 的格式路由到此分类。

#### 用户点赞 `type = 'like'`

data = {
  fromAccount: '13800138000',
  sessionId: 'live_5',
  data: {
    type: 'like',
    // 无需额外参数
  },
};


