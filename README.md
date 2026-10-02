# 我的18岁成人礼网站

一个温暖治愈的个人成长记录网站，采用 Aurevon 高级设计风格。
**双击 `index.html` 即可打开，无需安装任何软件。**

---

## 文件结构

```
├── index.html      ← 双击打开这个文件
├── style.css       ← 样式（一般不需要改）
├── script.js       ← 功能代码（一般不需要改）
├── config.js       ← ⭐ 个人信息配置（改这里就行！）
├── images/         ← 照片文件夹
│   ├── birth.jpg
│   ├── primary-school.jpg
│   ├── middle-school.jpg
│   ├── high-school.jpg
│   ├── 18th-birthday.jpg
│   └── photo1~9.jpg
└── README.md       ← 本说明文件
```

---

## ⭐ 如何修改个人信息（纯小白教程）

**你只需要改一个文件：`config.js`**

用记事本打开 `config.js`，按下面的说明修改：

### 1. 改名字
```javascript
name: "你的名字",    // 改成你的名字或昵称
```

### 2. 改生日时间
```javascript
birthday: "2008-11-01T00:00:00",  // 改成你的生日
// 格式：年-月-日T时:分:秒
// 例如：2008年11月1日 → "2008-11-01T00:00:00"
// 例如：2008年6月15日下午3点 → "2008-06-15T15:00:00"
```

### 3. 改欢迎语
```javascript
welcome: "欢迎来到我的18岁",  // 首页大标题
subtitle: "一段关于成长的故事，一份送给自己的成人礼",  // 副标题
```

### 3.5 改超级壁纸背景
```javascript
heroBg: {
  far:  "https://images.unsplash.com/photo-xxx?w=1920&q=80",  // 远景
  mid:  "https://images.unsplash.com/photo-xxx?w=1920&q=80",  // 中景
  near: "https://images.unsplash.com/photo-xxx?w=1920&q=80",  // 近景
},
```
三层叠加产生深度感，滚动时自动视差。去 https://unsplash.com 找喜欢的风景图链接即可。

### 4. 改成长时间线
```javascript
timeline: [
  { year: "2008", title: "生命之初", desc: "在这个世界上，我开始了我的旅程。", img: "images/birth.jpg" },
  { year: "2014", title: "小学时光", desc: "背着书包，走进了知识的殿堂。", img: "images/primary-school.jpg" },
  // ... 可以增加或删除，改文字内容
],
```

### 5. 改照片墙
```javascript
photos: [
  { src: "images/photo1.jpg", caption: "美好的回忆" },
  { src: "images/photo2.jpg", caption: "珍贵的瞬间" },
  // ... 可以增加或删除
],
```

### 6. 改"关于我"
```javascript
bio: "一个即将成年的少年/少女，热爱生活...",  // 个人介绍
interests: ["阅读", "音乐", "摄影"],  // 兴趣爱好标签
contact: {
  wechat: "你的微信号",
  qq: "你的QQ号",
  email: "your-email@example.com",
},
```

### 7. 改问卷问题
```javascript
surveyQuestions: [
  { id: 1, q: "你眼中的我是什么样的人？", ph: "请用几个词或一句话描述..." },
  // ... 可以修改问题和提示文字
],
```

### 8. 改抽奖奖品
```javascript
prizes: ["定制电子贺卡", "专属祝福视频", "生日派对邀请函", "神秘小礼物", "谢谢参与"],
```

---

## 如何替换照片

1. 把你的照片放到 `images` 文件夹里
2. 照片命名和 `config.js` 里的对应：
   - `birth.jpg` → 出生照片
   - `primary-school.jpg` → 小学照片
   - `middle-school.jpg` → 初中照片
   - `high-school.jpg` → 高中照片
   - `18th-birthday.jpg` → 18岁生日照片
   - `photo1.jpg` ~ `photo9.jpg` → 照片墙照片
3. 如果照片不够9张，删掉 `config.js` 里 `photos` 数组中多余的项

---

## 如何免费部署上线

### 方法一：GitHub Pages（推荐，3分钟搞定）

1. 打开 https://github.com 注册账号
2. 点击右上角 **+** → **New repository**
3. 仓库名填：`你的用户名.github.io`（例如 `zhangsan.github.io`）
4. 选 **Public** → 点 **Create repository**
5. 点 **Add file** → **Upload files**，把整个项目文件夹拖进去
6. 点 **Commit changes**
7. 进仓库 **Settings** → **Pages** → Branch 选 **main** → 点 **Save**
8. 等1-2分钟，访问 `https://你的用户名.github.io` 即可！
9. 把这个链接分享给朋友

### 方法二：Netlify（更简单）

1. 打开 https://netlify.com 用 GitHub 登录
2. 点 **New site from Git** → 选你的仓库 → **Deploy site**
3. 获得免费域名：`https://xxx.netlify.app`

---

## 常见问题

**Q: 照片不显示？**
A: 检查照片文件名是否和 config.js 里的一致，确保照片在 images 文件夹里。

**Q: 倒计时不准确？**
A: 检查 config.js 里生日时间格式，必须是 `"2008-11-01T00:00:00"` 这种格式。

**Q: 想多加几个时间节点？**
A: 在 config.js 的 timeline 数组里加就行，格式照着已有的写。

**Q: 想改颜色？**
A: 打开 style.css，最上面的 `:root` 里有颜色变量，改数字就行。

---

祝你18岁生日快乐！🎉