/**
 * 个人信息配置文件 —— 只改这里就能自定义网站所有内容
 */
const CONFIG = {
  name: "Li Jingtian",
  birthday: "2008-11-01",           // 出生日期，18岁生日=该日期+18年（按北京时间）

  // 首页文案
  heroTitle: "Welcome to My 18th Chapter",   // 大标题
  heroCheers: "cheers to 18 years",          // 小标题
  heroTagline: "鲜衣怒马少年去，不负韶华行且知", // 倒计时下方的句子

  // ── 各章节景物背景（全新动态配图） ──
  // 来自 Unsplash 高清大图，慢速背景漂移 + JS 动态星野叠加
  scenes: {
    hero:     "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=85", // 群山银河
    timeline: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=85", // 星轨夜空
    photos:   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=85", // 地球太空
    about:    "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1920&q=85", // 深蓝星云
    survey:   "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1920&q=85", // 璀璨银河
  },

  // ── 成长时间线（detail = 点击卡片后右侧展开的个人叙述） ──
  timeline: [
    { year: "2008", title: "生命之初", desc: "在这个世界上，我开始了我的旅程。",
      detail: "2008年，我来到了这个世界。那一天，家人说我哭声响亮，像是在宣告一个生命的到来。从此，这个世界上多了一个会笑、会闹、会做梦的我。",
      img: "images/birth.jpg" },
    { year: "2014", title: "小学时光", desc: "背着书包，走进了知识的殿堂。",
      detail: "第一次背上书包走进校园，阳光透过树叶洒在操场上。那时的快乐很简单：一根冰棍、一场游戏、一句'明天见'。",
      img: "images/primary-school.jpg" },
    { year: "2017", title: "初中岁月", desc: "青春的序章，友谊的种子在这里发芽。",
      detail: "初中是懵懂的年纪。开始有自己的想法，也遇到了一群能聊到深夜的朋友。那些一起刷题、一起吐槽、一起做梦的日子，至今想起仍会微笑。",
      img: "images/middle-school.jpg" },
    { year: "2020", title: "高中年华", desc: "奋斗的汗水，梦想的翅膀逐渐丰满。",
      detail: "高中三年，是全力以赴的三年。凌晨的灯光、摞起的试卷、并肩作战的同窗——那些看似辛苦的日子，其实都是闪闪发光的青春。",
      img: "images/high-school.jpg" },
    { year: "2026", title: "成年之门", desc: "18岁，我准备好了迎接新的世界。",
      detail: "十八岁，是一道门。门外是更广阔的世界，门内是十八年的爱与陪伴。我带着所有人的祝福，准备推开这扇门，去成为自己想成为的人。",
      img: "images/18th-birthday.jpg" },
  ],

  // ── 照片墙 ──
  photos: [
    { src: "images/photo1.jpg", caption: "美好的回忆" },
    { src: "images/photo2.jpg", caption: "珍贵的瞬间" },
    { src: "images/photo3.jpg", caption: "快乐时光" },
    { src: "images/photo4.jpg", caption: "青春纪念" },
    { src: "images/photo5.jpg", caption: "成长足迹" },
    { src: "images/photo6.jpg", caption: "温暖记忆" },
    { src: "images/photo7.jpg", caption: "精彩时刻" },
    { src: "images/photo8.jpg", caption: "珍贵友谊" },
    { src: "images/photo9.jpg", caption: "美好未来" },
  ],

  // ── 锦天自白 ──
  bio: "一个即将成年的少年，热爱生活，喜欢探索世界的美好。在这里，我想和你分享我的成长故事。",
  interests: ["阅读", "音乐", "摄影", "旅行", "编程", "绘画"],
  contact: { wechat: "你的微信号", qq: "你的QQ号", email: "your-email@example.com" },

  // ── 旁人寄语（问卷） ──
  surveyQuestions: [
    { id: 1, q: "在你眼中，我是怎样的人",   ph: "请用几个词或一句话描述..." },
    { id: 2, q: "属于我们的难忘瞬间",       ph: "分享一个我们的故事..." },
    { id: 3, q: "赠我一句拾捌岁寄语",       ph: "写下你的祝福..." },
    { id: 4, q: "您的署名",                 ph: "请输入你的昵称" },
  ],
  prizes: ["定制电子贺卡", "专属祝福视频", "生日派对邀请函", "神秘小礼物", "谢谢参与"],

  // ── 旁人寄语接收方式（Web3Forms 免费表单服务） ──
  // 去 https://web3forms.com 用邮箱注册，创建一个表单后拿到 Access Key
  // 把下面引号里的内容替换成你的 Access Key（朋友提交的寄语会发到你的邮箱）
  web3formsKey: "21d25ea0-2e9d-4ff8-8ebc-dc240c0d53bf",

  // ── 每屏底部「下一章」按钮文字 ──
  nextLabels: ["启幕新程", "继续旅程", "轻触拾光", "写下寄语"],
};