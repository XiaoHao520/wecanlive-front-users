/* eslint-disable */

export default [
  {
    path: '/passport', name: 'passport', component: require('./passport/App.vue'),
    children: [
      // A4 - 注册
      { path: '/signup', name: 'passport_signup', component: require('./passport/SignUp.vue') },
      // A5 - 填写个人信息
      {
        path: '/signup/complete',
        name: 'passport_signup_complete',
        component: require('./passport/SignUpComplete.vue')
      },
      // A - 登录页面
      { path: '/signin', name: 'passport_signin', component: require('./passport/SignIn.vue') },
      // A1 - 手机号登录
      { path: '/signin/mobile', name: 'passport_signin_mobile', component: require('./passport/SignInMobile.vue') },
      // A6 - 追踪名单推荐
      { path: '/follow', name: 'passport_follow', component: require('./passport/Follow.vue') },
      // A7 - 忘记密码
      { path: '/forgot', name: 'passport_forgot', component: require('./passport/Forgot.vue') },
      // A7 - 忘记密码 - 输入验证码
      { path: '/forgot/confirm', name: 'passport_forgot_confirm', component: require('./passport/ForgotConfirm.vue') },
      // A8 - 服务协议
      { path: '/license', name: 'passport_license', component: require('./passport/License.vue') },
      // A9 - 每日签到 - 绑定手机号
      { path: '/bind/mobile', name: 'passport_bind_mobile', component: require('./passport/BindMobile.vue') },
    ],
  },
  {
    path: '', name: 'main', component: require('./main/App.vue'),
    children: [
      // 引导页
      { path: '/tutorial', name: 'main_tutorial', component: require('./main/Tutorial.vue') },
      {
        path: '/',
        name: 'main_app',
        component: require('./main/IndexMain.vue'),
        children: [
          // B - 首页 - 追踪（直播和动态用 tab 分开做在同一页）
          { path: '/', name: 'main_index', component: require('./main/Index.vue') },
          // B2 - 热门
          { path: '/hot', name: 'main_hot', component: require('./main/Hot.vue') },
          // B5 - 节目
          { path: '/movie', name: 'main_movies', component: require('./main/Movies.vue') },
          // B3 - 发现（包括所有 tab）
          { path: '/discover', name: 'main_discover', component: require('./main/Discover.vue') },
          // B4 - 附近
          { path: '/thenearby', name: 'main_nearby', component: require('./main/Nearby.vue') },
        ],
      },
      // B1-2 - 评论列表（不同的 model 共用一个页面）
      { path: '/comments/:model/:id', name: 'main_comment_list', component: require('./main/CommentList.vue') },
      // B1-2-1 - 评论列表（不同的 model 共用一个页面）
      { path: '/likes/:model/:id', name: 'main_like_list', component: require('./main/LikeList.vue') },
      // B2-1 - 找朋友
      { path: '/find/friend', name: 'main_find_friend', component: require('./main/FindFriend.vue') },
      // B2-2 - 活动详情（包括所有类型）
      { path: '/activity/:id', name: 'main_activity_detail', component: require('./main/ActivityDetail.vue') },
      // B5-1 - 影片播放
      { path: '/movie/:id', name: 'main_movie_detail', component: require('./main/MovieDetail.vue') },
      // B5-2 - wecanlive官方账号（其实是个特殊的用户页面），三个 tab 做在一起
      {
        path: '/member/official',
        name: 'main_member_official',
        component: require('./main/MemberOfficial.vue'),
      },
      // B6 - 排行榜（三个 tab 做在一起）
      {
        path: '/ratings',
        name: 'main_ratings',
        component: require('./main/Ratings.vue'),
        children: [
          { path: '/ratings/diamond', name: 'main_ratings_diamond', component: require('./main/RatingsDiamond.vue') },
          { path: '/ratings/givegift', name: 'main_ratings_givegift', component: require('./main/RatingsGivegift.vue') },
          { path: '/ratings/starlight', name: 'main_ratings_starlight', component: require('./main/RatingsStarlight.vue') },
        ],
      },
      // C - 搜索（搜索结果在当前页面遮罩层内实现）
      { path: '/search', name: 'main_search', component: require('./main/Search.vue') },
      // D - 开始直播
      { path: '/live/start', name: 'main_live_start', component: require('./main/LiveStart.vue') },
      // D1 - !!先别做，要做原生遮罩!! 直播画面（主播和观众共用）
      {
        path: '/live/:id', name: 'main_live', component: require('./main/Live.vue'),
        children: [
          // （里面所有东西都做在这个页面）
        ]
      },
      // D3 - 结束直播
      { path: '/live/end', name: 'main_live_end', component: require('./main/LiveEnd.vue') },
      // 发布图片
      { path: '/active/event', name: 'main_active_event', component: require('./main/ActiveEvent.vue') },
      // 发布图片 - 分享动态
      { path: '/active/event/write', name: 'main_active_event_write', component: require('./main/ActiveEventWrite.vue') },
      // E - 信息
      { path: '/message', name: 'main_message', component: require('./main/Message.vue') },
      // E1-E2 - 系统消息框
      { path: '/message/:type', name: 'main_message_list', component: require('./main/MessageList.vue') },
      // E3 - 动态通知（两个 tab 做在一起）
      { path: '/notifies', name: 'main_notify_list', component: require('./main/NotifyList.vue') },
      // E4 - 来自陌生人的追踪
      { path: '/follows/received', name: 'main_follows_received', component: require('./main/FollowsReceived.vue') },
      // E2-2-1 - 聊天设置
      { path: '/chat/:id/settings', name: 'main_chat_settings', component: require('./main/ChatSettings.vue') },
      // E2-2-3 - 举报
      { path: '/chat/:id/inform', name: 'main_chat_inform', component: require('./main/ChatInform.vue') },
      // E2 - 聊天窗口
      { path: '/chat/:type/:id', name: 'main_chat', component: require('./main/Chat.vue') },
      // F - 个人（三个 tab 做在一起）
      { path: '/member/:id', name: 'main_member_detail', component: require('./main/MemberDetail.vue') },

      // F1 - 粉丝
      { path: '/member/:id/fans', name: 'main_member_fans', component: require('./main/MemberFans.vue') },
      // F2 - 追踪
      { path: '/member/:id/follows', name: 'main_member_follows', component: require('./main/MemberFollows.vue') },
      // F3 - 我的朋友
      { path: '/member/:id/friends', name: 'main_member_friends', component: require('./main/MemberFriends.vue') },
      // F5-1-2 - 家族公告详情
      { path: '/family/article/:id', name: 'main_family_article_detail', component: require('./main/FamilyArticleDetail.vue') },
      // F5-1-3 - 家族任务详情
      { path: '/family/mission/:id', name: 'main_family_mission_detail', component: require('./main/FamilyMissionDetail.vue') },
      // F5-2 - 创立家族
      { path: '/family/create', name: 'main_family_create', component: require('./main/FamilyCreate.vue') },
      // F5-1-1 - 家族详情
      { path: '/family/:id', name: 'main_family_detail', component: require('./main/FamilyDetail.vue') },
      // F5-1 - 家族聊天窗口
      { path: '/family/:id/chat', name: 'main_family_chat', component: require('./main/FamilyChat.vue') },
      // F5-1-1 - 所有家族公告
      { path: '/family/:id/articles', name: 'main_family_articles', component: require('./main/FamilyArticles.vue') },
      // F5-1-3 - 所有家族任务
      { path: '/family/:id/missions', name: 'main_family_missions', component: require('./main/FamilyMissions.vue') },
      // F5-3 - 家族管理
      { path: '/family/:id/manage', name: 'main_family_manage', component: require('./main/FamilyManage.vue') },
      // F5-3 - 家族公告管理
      { path: '/family/:id/manage/articles', name: 'main_family_manage_articles', component: require('./main/FamilyManageArticles.vue') },
      // F5-3 -发布家族公告
      { path: '/family/:id/article/create', name: 'main_family_article_create', component: require('./main/FamilyArticleCreate.vue') },
      // F5-3-1 - 家族任务管理
      { path: '/family/:id/manage/missions', name: 'main_family_manage_missions', component: require('./main/FamilyManageMissions.vue') },
      // F5-3 - 发布家族任务
      { path: '/family/:id/mission/create', name: 'main_family_mission_create', component: require('./main/FamilyMissionCreate.vue') },
      // F5-3-3 - 家族简介
      { path: '/family/:id/introduction', name: 'main_family_introduction', component: require('./main/FamilyIntroduction.vue') },
      // F5-3-4 - 家族成员管理
      { path: '/family/:id/manage/members', name: 'main_family_manage_members', component: require('./main/FamilyManageMembers.vue') },
      // F6 - 我的钻石
      { path: '/personal/diamond', name: 'main_personal_diamond', component: require('./main/PersonalDiamond.vue') },
      // F6-1 - 兑换成金币
      { path: '/personal/diamond/exchange/coin', name: 'main_personal_diamond_exchange_coin', component: require('./main/PersonalDiamondExchangeCoin.vue') },
      // F6-2 - 兑换成现金
      { path: '/personal/diamond/withdraw', name: 'main_personal_diamond_withdraw', component: require('./main/PersonalDiamondWithdraw.vue') },
      // F6-3 - 交易明细
      { path: '/personal/diamond/transactions', name: 'main_personal_diamond_transactions', component: require('./main/PersonalDiamondTransactions.vue') },
      // F7 - 我的金币
      { path: '/personal/coin', name: 'main_personal_coin', component: require('./main/PersonalCoin.vue') },
      // F7-1 - 交易明细
      { path: '/personal/coin/transactions', name: 'main_personal_coin_transactions', component: require('./main/PersonalCoinTransactions.vue') },
      // F8 - 我的等级
      { path: '/personal/level', name: 'main_personal_level', component: require('./main/PersonalLevel.vue') },
      // F8-1 - 等级规则
      { path: '/personal/level/rules', name: 'main_personal_level_rules', component: require('./main/PersonalLevelRules.vue') },
      // F9 - 设定
      { path: '/personal/settings', name: 'main_personal_settings', component: require('./main/PersonalSettings.vue') },
      // F9-1 - 我的i币
      { path: '/personal/icoin', name: 'main_personal_icoin', component: require('./main/PersonalIcoin.vue') },
      // F9-2 - 编辑个人资料
      { path: '/personal/profile', name: 'main_personal_profile', component: require('./main/PersonalProfile.vue') },
      // F9-3 - 账号管理
      { path: '/personal/account', name: 'main_personal_account', component: require('./main/PersonalAccount.vue') },
      // F9-3-1 - 更换手机号
      { path: '/personal/change/mobile', name: 'main_personal_change_mobile', component: require('./main/PersonalChangeMobile.vue') },
      // F9-3-2 - 修改密码
      { path: '/personal/change/password', name: 'main_personal_change_password', component: require('./main/PersonalChangePassword.vue') },
      // F9-4 - 封锁清单
      { path: '/personal/blacklist', name: 'main_personal_blacklist', component: require('./main/PersonalBlacklist.vue') },
      // F9-5 - 邀请好友
      { path: '/personal/referrer', name: 'main_personal_referrer', component: require('./main/PersonalReferrer.vue') },
      // F10 - VIP
      { path: '/vip', name: 'main_vip', component: require('./main/Vip.vue') },
      // F10 - VIP规则
      { path: '/vip/rules', name: 'main_vip_rules', component: require('./main/VipRules.vue') },
      // F9-6 - 意见反馈
      { path: '/personal/feedback', name: 'main_personal_feedback', component: require('./main/PersonalFeedback.vue') },
    ],
  }];
