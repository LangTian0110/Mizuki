# Mizuki 内容修改指南

本教程将帮助你定位和修改 Mizuki 主题中所有向用户展示的内容。无论你是想修改站点名称、个人简介、导航菜单，还是添加新的友链、项目、技能数据，都能在这里找到对应的修改方法。

---

## 目录

1. [项目结构概述](#1-项目结构概述)
2. [不同类型内容的具体修改方法](#2-不同类型内容的具体修改方法)
3. [动态内容与静态内容的区分](#3-动态内容与静态内容的区分)
4. [修改后的预览和验证步骤](#4-修改后的预览和验证步骤)
5. [常见内容修改场景示例](#5-常见内容修改场景示例)

---

## 1. 项目结构概述

### 1.1 核心目录结构

```
Mizuki/
├── src/
│   ├── config/          # 【最重要】所有站点配置文件，控制站点展示内容
│   ├── data/            # 数据文件，存放友链、项目、技能等列表数据
│   ├── content/spec/    # Markdown 内容文件（关于页、友链说明等）
│   ├── pages/           # 页面路由文件，定义每个页面的结构
│   ├── components/      # UI 组件（通常不需要直接修改，除非改布局/样式）
│   ├── layouts/         # 布局模板
│   ├── i18n/            # 国际化翻译文件
│   ├── assets/          # 源码引用的静态资源（如头像）
│   └── styles/          # 全局样式文件
├── public/              # 静态资源目录，直接复制到构建输出
│   ├── assets/          # 横幅图片、音乐、字体等
│   ├── images/          # 相册、设备、日记图片
│   ├── js/              # 客户端脚本
│   ├── pio/             # Live2D 看板娘模型
│   └── favicon/         # 网站图标
└── scripts/             # 构建/辅助脚本
```

### 1.2 用户可见内容的主要存放位置

| 内容类型                         | 位置                                                   | 文件格式          |
| -------------------------------- | ------------------------------------------------------ | ----------------- |
| 站点配置（标题、横幅、主题色等） | `src/config/siteConfig.ts`                             | TypeScript        |
| 导航栏菜单                       | `src/config/navBarConfig.ts`                           | TypeScript        |
| 个人资料（头像、昵称、简介）     | `src/config/profileConfig.ts`                          | TypeScript        |
| 公告栏内容                       | `src/config/announcementConfig.ts`                     | TypeScript        |
| 页脚内容                         | `src/config/footerConfig.ts` / `src/FooterConfig.html` | TypeScript / HTML |
| 友链数据                         | `src/data/friends.ts`                                  | TypeScript        |
| 项目数据                         | `src/data/projects.ts`                                 | TypeScript        |
| 技能数据                         | `src/data/skills.ts`                                   | TypeScript        |
| 时间线数据                       | `src/data/timeline.ts`                                 | TypeScript        |
| 设备数据                         | `src/data/devices.ts`                                  | TypeScript        |
| 番剧数据                         | `src/data/anime.ts`                                    | TypeScript        |
| 日记数据                         | `src/data/diary.ts`                                    | TypeScript        |
| 关于页内容                       | `src/content/spec/about.md`                            | Markdown          |
| 友链页说明                       | `src/content/spec/friends.md`                          | Markdown          |
| 相册数据                         | `public/images/albums/*/info.json`                     | JSON              |
| 多语言文本                       | `src/i18n/languages/*.ts`                              | TypeScript        |
| 横幅图片                         | `public/assets/desktop-banner/` / `mobile-banner/`     | 图片              |
| 音乐文件                         | `public/assets/music/`                                 | 音频/图片         |
| 看板娘对话                       | `src/config/pioConfig.ts`                              | TypeScript        |
| 特效配置                         | `src/config/effectsConfig.ts`                          | TypeScript        |
| 评论系统                         | `src/config/commentConfig.ts`                          | TypeScript        |
| 音乐播放器                       | `src/config/musicConfig.ts`                            | TypeScript        |
| 许可协议                         | `src/config/licenseConfig.ts`                          | TypeScript        |
| 侧边栏布局                       | `src/config/sidebarConfig.ts`                          | TypeScript        |
| 壁纸配置                         | `src/config/backgroundWallpaper.ts`                    | TypeScript        |

---

## 2. 不同类型内容的具体修改方法

### 2.1 配置文件修改（最常修改）

配置文件位于 `src/config/` 目录，是控制站点展示内容的核心。所有配置文件均为 TypeScript 格式，修改后需要重启开发服务器。

#### 2.1.1 站点基本信息 — `src/config/siteConfig.ts`

```typescript
export const siteConfig: SiteConfig = {
  title: "Mizuki", // 站点标题，显示在浏览器标签和页面标题
  subtitle: "一个示例网站", // 站点副标题
  siteURL: "https://mizuki.mysqil.com/", // 站点URL，必须以斜杠结尾
  siteStartDate: "2025-01-01", // 站点运行起始日期，用于计算运行天数

  lang: "zh_CN", // 语言代码

  themeColor: {
    hue: 240, // 主题色色相（0-360），如：红色0，青色200，蓝绿250，粉色345
    fixed: false, // 是否对访问者隐藏主题色选择器
  },

  featurePages: {
    anime: true, // 番剧页面开关
    diary: true, // 日记页面开关
    friends: true, // 友链页面开关
    projects: true, // 项目页面开关
    skills: true, // 技能页面开关
    timeline: true, // 时间线页面开关
    albums: true, // 相册页面开关
    devices: true, // 设备页面开关
  },
  // ... 更多配置
};
```

**首页横幅文字**也在 `siteConfig.ts` 中：

```typescript
banner: {
  homeText: {
    enable: true,
    title: "わたしの部屋",           // 横幅主标题
    switchable: true,
    subtitle: [                       // 副标题数组，打字机效果循环展示
      "特別なことはないけど、君がいると十分です",
      "今でもあなたは私の光",
      "君ってさ、知らないうちに私の毎日になってたよ",
    ],
    typewriter: {
      enable: true,
      speed: 100,       // 打字速度（毫秒）
      deleteSpeed: 50,  // 删除速度（毫秒）
      pauseTime: 2000,  // 显示完成后暂停时间（毫秒）
    },
  },
},
```

#### 2.1.2 导航栏菜单 — `src/config/navBarConfig.ts`

导航栏支持两种类型的菜单项：**预设链接**和**自定义链接**。

```typescript
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
  links: [
    // 方式一：使用预设链接
    LinkPreset.Home, // 首页
    LinkPreset.Archive, // 归档

    // 方式二：自定义下拉菜单
    {
      name: "链接", // 菜单显示名称
      url: "/links/",
      icon: "material-symbols:link", // Iconify 图标
      children: [
        {
          name: "GitHub",
          url: "https://github.com/LyraVoid/Mizuki",
          external: true, // 外部链接，新标签页打开
          icon: "fa7-brands:github",
        },
        {
          name: "Bilibili",
          url: "https://space.bilibili.com/701864046",
          external: true,
          icon: "fa7-brands:bilibili",
        },
      ],
    },

    // 方式三：单级链接（无下拉）
    // { name: "关于", url: "/about/", icon: "material-symbols:info" }
  ],
};
```

**可用的预设链接**：`Home`、`Archive`、`About`、`Friends`、`Anime`、`Diary`、`Albums`、`Projects`、`Skills`、`Timeline`

**图标浏览**：https://icon-sets.iconify.design/

#### 2.1.3 个人资料 — `src/config/profileConfig.ts`

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.webp", // 头像路径（相对于 /src，以 / 开头则相对于 /public）
  name: "まつざか ゆき", // 显示昵称
  bio: "世界は大きい、君は行かなければならない", // 个人简介
  typewriter: {
    enable: true, // 启用简介打字机效果
    speed: 80, // 打字速度（毫秒）
  },
  links: [
    // 社交链接列表
    {
      name: "Bilibili",
      icon: "fa7-brands:bilibili",
      url: "https://space.bilibili.com/701864046",
    },
    {
      name: "GitHub",
      icon: "fa7-brands:github",
      url: "https://github.com/matsuzaka-yuki",
    },
  ],
};
```

#### 2.1.4 公告栏 — `src/config/announcementConfig.ts`

```typescript
export const announcementConfig: AnnouncementConfig = {
  title: "", // 公告标题，留空使用默认i18n文本
  content: "公告标题，还没有想好要搞什么", // 公告内容
  closable: true, // 允许用户关闭公告
  link: {
    enable: true, // 启用链接
    text: "了解更多", // 链接文本
    url: "/about/", // 链接 URL
    external: false, // 是否为外部链接
  },
};
```

#### 2.1.5 页脚 — `src/config/footerConfig.ts` 和 `src/FooterConfig.html`

```typescript
// src/config/footerConfig.ts
export const footerConfig: FooterConfig = {
  enable: false, // 是否启用自定义页脚
  customHtml: "", // 自定义HTML内容（如备案号）
  // 若 customHtml 为空，则读取 FooterConfig.html 文件内容
};
```

也可以直接编辑 `src/FooterConfig.html` 文件添加自定义页脚 HTML。

#### 2.1.6 看板娘对话 — `src/config/pioConfig.ts`

```typescript
export const pioConfig: PioConfig = {
  enable: true,
  models: ["/pio/models/NOIR/noir.model3.json"],
  dialog: {
    welcome: "欢迎来到 Mizuki 网站！", // 欢迎词
    touch: [
      // 触摸提示（随机展示）
      "你在干什么呀？",
      "不要乱摸我啦！",
    ],
    home: "点击这里回到首页哦！", // 首页提示
    skin: ["想看看我的新衣服吗？"], // 换装提示
    close: "QWQ 下次再见哦～", // 关闭提示
    link: "https://github.com/LyraVoid/Mizuki", // 关于链接
  },
};
```

#### 2.1.7 评论系统 — `src/config/commentConfig.ts`

```typescript
export const commentConfig: CommentConfig = {
  enable: false, // 启用评论
  system: "twikoo", // 选择 "twikoo" 或 "giscus"
  twikoo: {
    envId: "https://twikoo.vercel.app", // Twikoo 环境 ID
    lang: "zh_CN",
  },
  giscus: {
    repo: "your-github-username/your-repo-name",
    repoId: "your-repo-id",
    category: "Announcements",
    categoryId: "your-category-id",
    // ... 更多 giscus 配置
  },
};
```

#### 2.1.8 音乐播放器 — `src/config/musicConfig.ts`

```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true,
  showFloatingPlayer: true,
  floatingEntryMode: "fab", // "default" 或 "fab"
  mode: "local", // "local" 本地音乐 或 "meting" 在线音乐
  // Meting 模式配置（mode: "meting" 时使用）
  meting_api:
    "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
  id: "14164869977", // 歌单 ID
  server: "netease", // "netease" 网易云 / "tencent" QQ音乐
  type: "playlist",
};
```

本地音乐文件存放在 `public/assets/music/` 目录下：

- `cover/` — 封面图片（如 `cl.webp`）
- `url/` — 音频文件（如 `cl.mp3`）

#### 2.1.9 许可协议 — `src/config/licenseConfig.ts`

```typescript
export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0", // 协议名称
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 协议链接
};
```

#### 2.1.10 樱花特效 — `src/config/effectsConfig.ts`

```typescript
export const sakuraConfig: SakuraConfig = {
  enable: false, // 是否启用樱花飘落特效
  switchable: true, // 用户是否可以切换
  sakuraNum: 21, // 樱花数量
  // ... 速度、大小、透明度等配置
};
```

#### 2.1.11 壁纸配置 — `src/config/backgroundWallpaper.ts`

```typescript
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  enable: true,
  src: {
    desktop: ["/assets/desktop-banner/1.webp", ...],  // 桌面壁纸
    mobile: ["/assets/mobile-banner/1.webp", ...],    // 移动壁纸
  },
  carousel: { enable: true, interval: 5 },
  opacity: 0.8,
  blur: 1,
  // ... 更多配置
};
```

#### 2.1.12 侧边栏布局 — `src/config/sidebarConfig.ts`

控制侧边栏组件的显示顺序和位置：

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  components: {
    left: ["profile", "announcement", "tags", "card-toc"],
    right: ["site-stats", "calendar", "categories", "music-sidebar"],
    drawer: ["profile", "announcement", "music-sidebar", "categories", "tags"],
  },
  // 可调整组件顺序、移除组件、或添加新组件
};
```

---

### 2.2 数据文件修改

数据文件位于 `src/data/` 目录，存放各类列表数据。

#### 2.2.1 友链数据 — `src/data/friends.ts`

```typescript
export const friendsData: FriendItem[] = [
  {
    id: 1,
    title: "Astro", // 友链名称
    imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640", // 头像URL
    desc: "The web framework for content-driven websites", // 描述
    siteurl: "https://github.com/withastro/astro", // 网站链接
    tags: ["Framework"], // 标签（用于筛选）
  },
  // 添加更多友链...
];
```

**添加新友链**：在 `friendsData` 数组中新增一个对象，确保 `id` 唯一。

#### 2.2.2 项目数据 — `src/data/projects.ts`

```typescript
export const projectsData: Project[] = [
  {
    id: "mizuki",
    title: "Mizuki", // 项目名称
    description: "A next-gen Material Design 3 blog theme...", // 描述
    image: "/assets/projects/mizuki.webp", // 项目图片
    category: "web", // 分类："web" | "mobile" | "desktop" | "other"
    techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"], // 技术栈
    status: "completed", // 状态："completed" | "in-progress" | "planned"
    sourceCode: "https://github.com/LyraVoid/Mizuki", // 源码链接
    visitUrl: "https://mizuki.mysqil.com", // 演示链接
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    featured: true, // 是否为精选项目
    tags: ["Blog", "Theme", "Open Source"],
  },
];
```

#### 2.2.3 技能数据 — `src/data/skills.ts`

```typescript
export const skillsData: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript", // 技能名称
    description: "Modern JavaScript development...", // 描述
    icon: "logos:javascript", // Iconify 图标名
    category: "frontend", // 分类："frontend" | "backend" | "database" | "tools" | "other"
    level: "advanced", // 等级："beginner" | "intermediate" | "advanced" | "expert"
    experience: { years: 3, months: 6 }, // 经验时长
    color: "#F7DF1E", // 卡片主题色
  },
];
```

#### 2.2.4 时间线数据 — `src/data/timeline.ts`

```typescript
export const timelineData: TimelineItem[] = [
  {
    id: "current-study",
    title: "Studying Computer Science and Technology", // 标题
    description: "Currently studying...", // 描述
    type: "education", // 类型："education" | "work" | "project" | "achievement"
    startDate: "2022-09-01",
    location: "Beijing", // 地点
    organization: "Beijing Institute of Technology", // 组织/机构
    skills: ["Java", "Python"], // 相关技能
    achievements: ["GPA: 3.6/4.0"], // 成就列表
    icon: "material-symbols:school", // 图标
    color: "#059669", // 主题色
    featured: true, // 是否精选
  },
];
```

#### 2.2.5 设备数据 — `src/data/devices.ts`

```typescript
export const devicesData: DeviceCategory = {
  OnePlus: [
    // 类别名（可自定义）
    {
      name: "OnePlus 13T", // 设备名称
      image: "/images/device/oneplus13t.webp", // 设备图片
      specs: "Gray / 16G + 1TB", // 规格参数
      description: "Flagship performance...", // 描述
      link: "https://www.oneplus.com/cn/13t", // 链接
    },
  ],
  // 可添加自定义类别
  自定义: [
    {
      name: "...",
      image: "...",
      specs: "...",
      description: "...",
      link: "...",
    },
  ],
};
```

#### 2.2.6 番剧数据 — `src/data/anime.ts`

当 `siteConfig.anime.mode` 设为 `"local"` 时使用本地数据：

```typescript
const localAnimeList: AnimeItem[] = [
  {
    title: "Lycoris Recoil", // 番剧名称
    status: "completed", // 状态："watching" | "completed" | "planned"
    rating: 9.8, // 评分
    cover: "/assets/anime/lkls.webp", // 封面图片
    description: "Girl's gunfight", // 描述
    episodes: "12 episodes", // 集数
    year: "2022", // 年份
    genre: ["Action", "Slice of life"], // 类型标签
    studio: "A-1 Pictures", // 制作公司
    link: "https://www.bilibili.com/bangumi/media/md28338623", // 链接
    progress: 12, // 观看进度
    totalEpisodes: 12, // 总集数
    startDate: "2022-07",
    endDate: "2022-09",
  },
];
```

番剧页面也支持在线数据源，在 `siteConfig.ts` 中配置：

- `anime.mode: "bangumi"` — 使用 Bangumi API（需设置 `bangumi.userId`）
- `anime.mode: "bilibili"` — 使用 Bilibili API（需设置 `bilibili.vmid`）

#### 2.2.7 日记数据 — `src/data/diary.ts`

```typescript
const diaryData: DiaryItem[] = [
  {
    id: 1,
    content:
      "The falling speed of cherry blossoms is five centimeters per second!", // 日记内容
    date: "2025-01-15T10:30:00Z", // 日期（ISO 格式）
    images: ["/images/diary/sakura.jpg", "/images/diary/1.webp"], // 图片
    location: "Tokyo", // 位置（可选）
    mood: "happy", // 心情（可选）
    tags: ["life", "spring"], // 标签（可选）
  },
];
```

---

### 2.3 Markdown 内容文件

#### 2.3.1 关于页 — `src/content/spec/about.md`

这是标准的 Markdown 文件，支持所有扩展语法（代码高亮、数学公式、Callout 等）：

```markdown
## 关于我

这里是关于页的内容，支持完整的 Markdown 语法。

> [!NOTE]
> 支持 Callout 语法。

$$
E = mc^2
$$
```

#### 2.3.2 友链页说明 — `src/content/spec/friends.md`

友链卡片下方显示的说明文字，同样是 Markdown 格式。可以在此添加友链申请说明等。

---

### 2.4 相册数据 — `public/images/albums/`

每个相册是一个文件夹，包含 `info.json` 和图片文件：

```
public/images/albums/
├── AcgExample/
│   ├── info.json       # 相册信息
│   ├── cover.webp      # 封面图
│   ├── 1.webp          # 照片
│   ├── 2.webp
│   └── ...
├── EncryptedExample/
│   └── info.json
└── ...
```

**info.json 格式**：

```json
{
  "title": "Some lovely pictures",
  "hidden": false,
  "description": "The world is vast, and you have to go explore it.",
  "date": "2025-08-01",
  "location": "Bilibili",
  "tags": ["Kawai", "Cute", "Moe"],
  "layout": "masonry",
  "columns": 3
}
```

**添加新相册**：

1. 在 `public/images/albums/` 下创建新文件夹
2. 添加 `info.json` 文件
3. 放入图片文件（推荐 webp 格式）
4. 可选：添加 `cover.webp` 作为封面

---

### 2.5 国际化文本 — `src/i18n/languages/`

多语言翻译文件控制界面上所有固定文本：

```
src/i18n/languages/
├── zh_CN.ts    # 简体中文
├── zh_TW.ts    # 繁体中文
├── en.ts       # 英文
└── ja.ts       # 日文
```

修改界面文本时，找到对应的 `I18nKey` 并修改其值：

```typescript
// src/i18n/languages/zh_CN.ts
export const zh_CN: Translation = {
  [Key.home]: "主页",
  [Key.about]: "关于我们",
  [Key.notFoundTitle]: "页面未找到",
  [Key.notFoundDescription]: "抱歉，您访问的页面不存在或已被移动。",
  // ...
};
```

**当前语言**由 `src/config/siteConfig.ts` 中的 `SITE_LANG` 决定。

---

### 2.6 静态资源替换

#### 横幅图片

```
public/assets/desktop-banner/1.webp  ~ 4.webp   # 桌面端横幅
public/assets/mobile-banner/1.webp   ~ 4.webp   # 移动端横幅
```

替换这些图片文件即可更换横幅。图片路径在 `siteConfig.ts` 的 `banner.src` 中配置。

#### 头像

```
src/assets/images/avatar.webp       # 个人资料头像
```

替换此文件，或在 `profileConfig.ts` 中修改 `avatar` 路径。

#### 网站图标

```
public/favicon/favicon.ico
```

#### 字体文件

```
public/assets/font/ZenMaruGothic-Medium.ttf   # 英文字体
public/assets/font/loli.ttf                    # 中日韩字体
```

字体配置在 `siteConfig.ts` 的 `font` 字段中。

#### 音乐文件

```
public/assets/music/cover/   # 音乐封面
public/assets/music/url/     # 音频文件
```

---

## 3. 动态内容与静态内容的区分

### 3.1 静态内容

静态内容在构建时确定，不会随用户访问而变化。修改后需要**重新构建**才能生效。

| 内容          | 文件                               | 修改后操作     |
| ------------- | ---------------------------------- | -------------- |
| 站点配置      | `src/config/*.ts`                  | 重启开发服务器 |
| 数据列表      | `src/data/*.ts`                    | 重启开发服务器 |
| Markdown 内容 | `src/content/spec/*.md`            | 自动热更新     |
| 相册数据      | `public/images/albums/*/info.json` | 自动热更新     |
| 国际化文本    | `src/i18n/languages/*.ts`          | 重启开发服务器 |
| 页面模板      | `src/pages/*.astro`                | 自动热更新     |
| 静态资源      | `public/**/*`                      | 刷新浏览器     |

### 3.2 动态内容

动态内容在运行时获取或计算，可能随时间、用户操作变化。

| 内容              | 来源               | 说明                                |
| ----------------- | ------------------ | ----------------------------------- |
| Bangumi 番剧数据  | Bangumi API        | 需配置 `bangumi.userId`，构建时拉取 |
| Bilibili 数据     | Bilibili API       | 需配置 `bilibili.vmid`，构建时拉取  |
| Memos 日记        | Memos API          | 需配置 `diaryApiUrl`，运行时获取    |
| Twikoo 评论       | Twikoo 服务端      | 运行时加载                          |
| Giscus 评论       | GitHub Discussions | 运行时加载                          |
| Meting 音乐       | Meting API         | 运行时获取歌单                      |
| 站点运行天数      | 自动计算           | 基于 `siteStartDate`                |
| 文章字数/阅读时间 | 自动计算           | 基于文章内容                        |

### 3.3 修改注意事项

1. **配置文件修改后需重启开发服务器**：`src/config/` 和 `src/data/` 下的文件修改后，需要停止并重新运行 `pnpm dev`。

2. **API 数据需先构建**：Bangumi/Bilibili 数据在构建时获取。如需在开发环境测试，设置 `fetchOnDev: true` 并先运行 `pnpm build`。

3. **环境变量**：敏感信息（如 Bilibili SESSDATA）应放在 `.env` 文件中，不要硬编码。

4. **图片优化**：项目配置了自动图片优化（webp 格式），建议使用高质量源图，构建时自动优化。

5. **内容集合**：`src/content/` 目录下的 Markdown 文件遵循 Astro Content Collections 规范，frontmatter 字段有类型校验。

---

## 4. 修改后的预览和验证步骤

### 4.1 本地开发预览

```bash
# 安装依赖（首次或依赖变更后）
pnpm install

# 启动开发服务器
pnpm dev
```

开发服务器启动后，访问控制台显示的本地地址（通常为 `http://localhost:4321/`）。

### 4.2 验证清单

修改内容后，建议按以下清单逐项验证：

- [ ] **首页**：横幅图片、标题文字、副标题打字机效果
- [ ] **导航栏**：菜单项名称、链接、图标、下拉菜单
- [ ] **侧边栏**：个人资料（头像、昵称、简介、社交链接）、公告栏
- [ ] **文章列表**：分类导航、文章卡片显示
- [ ] **文章详情页**：内容渲染、目录、评论（如启用）
- [ ] **关于页**：Markdown 内容正确渲染
- [ ] **友链页**：友链卡片、搜索筛选、说明文字
- [ ] **番剧页**：番剧卡片、筛选、评分显示
- [ ] **日记页**：日记内容、图片
- [ ] **相册页**：相册列表、照片展示
- [ ] **项目页**：项目卡片、分类筛选
- [ ] **技能页**：技能卡片、分类和等级筛选
- [ ] **时间线页**：时间线条目、类型筛选
- [ ] **设备页**：设备卡片
- [ ] **404 页**：错误提示文字
- [ ] **页脚**：版权信息、自定义内容
- [ ] **移动端**：响应式布局、汉堡菜单
- [ ] **暗色模式**：切换暗色模式检查显示效果
- [ ] **看板娘**：对话文字（如启用）
- [ ] **音乐播放器**：播放功能（如启用）

### 4.3 构建验证

```bash
# 生产构建
pnpm build

# 本地预览构建结果
pnpm preview
```

构建验证可以发现开发环境中不会出现的问题，如：

- 图片路径错误
- 类型检查失败
- 构建时数据获取失败
- 死链接

### 4.4 常见问题排查

| 问题         | 可能原因             | 解决方法                                 |
| ------------ | -------------------- | ---------------------------------------- |
| 修改未生效   | 未重启开发服务器     | 重启 `pnpm dev`                          |
| 图片不显示   | 路径错误             | 检查路径是否以 `/` 开头（相对于 public） |
| 页面 404     | 特色页面已关闭       | 检查 `siteConfig.featurePages`           |
| 番剧数据为空 | API 未配置或网络问题 | 检查 `siteConfig.bangumi/bilibili` 配置  |
| 类型错误     | 数据格式不匹配       | 检查 TypeScript 接口定义                 |
| 构建失败     | frontmatter 格式错误 | 检查 Markdown 文件的 frontmatter         |

---

## 5. 常见内容修改场景示例

### 场景一：修改站点名称和副标题

**目标**：将站点名改为 "我的博客"，副标题改为 "记录生活点滴"

**修改文件**：`src/config/siteConfig.ts`

```typescript
export const siteConfig: SiteConfig = {
  title: "我的博客",
  subtitle: "记录生活点滴",
  // ...
};
```

同时修改导航栏标题：

```typescript
  navbarTitle: {
    mode: "text-icon",
    text: "我的博客",    // 修改此处
    // ...
  },
```

---

### 场景二：添加一个新的友情链接

**目标**：添加一个名为 "Vue.js" 的友链

**修改文件**：`src/data/friends.ts`

```typescript
export const friendsData: FriendItem[] = [
  // ... 已有友链
  {
    id: 9, // 确保id唯一
    title: "Vue.js",
    imgurl: "https://avatars.githubusercontent.com/u/6128107?v=4&s=640",
    desc: "The Progressive JavaScript Framework",
    siteurl: "https://vuejs.org",
    tags: ["Framework", "JavaScript"],
  },
];
```

---

### 场景三：更换首页横幅图片

**目标**：使用自己的图片作为横幅

**步骤**：

1. 准备图片（推荐 webp 格式，桌面端 1920x800，移动端 750x400）
2. 将图片放入 `public/assets/desktop-banner/` 和 `public/assets/mobile-banner/`
3. 修改 `src/config/siteConfig.ts`：

```typescript
banner: {
  src: {
    desktop: [
      "/assets/desktop-banner/my-banner-1.webp",  // 替换为你的文件名
      "/assets/desktop-banner/my-banner-2.webp",
    ],
    mobile: [
      "/assets/mobile-banner/my-banner-1.webp",
      "/assets/mobile-banner/my-banner-2.webp",
    ],
  },
  // ...
},
```

---

### 场景四：添加一个新的项目展示

**目标**：添加一个新项目 "My App"

**修改文件**：`src/data/projects.ts`

```typescript
export const projectsData: Project[] = [
  // ... 已有项目
  {
    id: "my-app",
    title: "My App",
    description: "A cool application I built.",
    image: "/assets/projects/my-app.webp", // 将图片放到 public/assets/projects/
    category: "web",
    techStack: ["React", "Node.js"],
    status: "in-progress",
    sourceCode: "https://github.com/username/my-app",
    visitUrl: "https://my-app.example.com",
    startDate: "2025-01-01",
    featured: false,
    tags: ["App", "Web"],
  },
];
```

---

### 场景五：修改关于页内容

**目标**：自定义关于页的文字内容

**修改文件**：`src/content/spec/about.md`

```markdown
---
# 此文件的 frontmatter 可以为空
---

## 你好，世界

欢迎来到我的个人博客！我是一名热爱编程的开发者。

### 我的兴趣

- 编程
- 阅读
- 旅行

### 联系方式

- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com
```

---

### 场景六：修改 404 页面文字

**目标**：自定义 404 页面的提示信息

**修改文件**：`src/i18n/languages/zh_CN.ts`（以简体中文为例）

```typescript
[Key.notFoundTitle]: "哎呀，页面走丢了",
[Key.notFoundDescription]: "你访问的页面可能已被删除或地址输入有误，请检查后重试。",
[Key.backToHome]: "带我回家",
```

如需修改其他语言，编辑对应的语言文件（`en.ts`、`ja.ts`、`zh_TW.ts`）。

---

### 场景七：创建一个新的相册

**目标**：创建一个名为 "旅行记录" 的相册

**步骤**：

1. 在 `public/images/albums/` 下创建文件夹 `TravelRecord/`
2. 创建 `info.json`：

```json
{
  "title": "旅行记录",
  "hidden": false,
  "description": "记录每一次出行的美好瞬间",
  "date": "2025-06-01",
  "location": "各地",
  "tags": ["旅行", "风景"],
  "layout": "masonry",
  "columns": 3
}
```

3. 添加封面图 `cover.webp` 和照片 `1.webp`、`2.webp` 等

---

### 场景八：启用评论系统

**目标**：启用 Giscus 评论

**修改文件**：`src/config/commentConfig.ts`

```typescript
export const commentConfig: CommentConfig = {
  enable: true,
  system: "giscus",
  giscus: {
    repo: "your-username/your-repo", // GitHub 仓库
    repoId: "your-repo-id", // 仓库 ID（从 giscus.app 获取）
    category: "Announcements",
    categoryId: "your-category-id", // 分类 ID（从 giscus.app 获取）
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: "zh_CN",
    loading: "lazy",
  },
};
```

---

### 场景九：添加时间线条目

**目标**：添加一段新的工作经历

**修改文件**：`src/data/timeline.ts`

```typescript
{
  id: "new-job-2025",
  title: "前端工程师",
  description: "在某科技公司担任前端工程师，负责产品开发。",
  type: "work",
  startDate: "2025-03-01",
  location: "上海",
  organization: "某科技公司",
  position: "前端工程师",
  skills: ["React", "TypeScript", "Tailwind CSS"],
  achievements: [
    "主导完成了核心产品的前端重构",
    "将页面加载速度提升了 50%",
  ],
  icon: "material-symbols:work",
  color: "#2563EB",
  featured: true,
},
```

---

### 场景十：关闭不需要的特色页面

**目标**：关闭设备页面和日记页面

**修改文件**：`src/config/siteConfig.ts`

```typescript
featurePages: {
  anime: true,
  diary: false,      // 关闭日记页面
  friends: true,
  projects: true,
  skills: true,
  timeline: true,
  albums: true,
  devices: false,    // 关闭设备页面
},
```

关闭后，对应的导航栏链接会自动隐藏，访问该页面会跳转到 404。

---

## 附录：配置文件快速索引

| 我想修改...         | 去这个文件                                                             |
| ------------------- | ---------------------------------------------------------------------- |
| 站点标题/副标题/URL | `src/config/siteConfig.ts`                                             |
| 主题色              | `src/config/siteConfig.ts` → `themeColor.hue`                          |
| 首页横幅文字        | `src/config/siteConfig.ts` → `banner.homeText`                         |
| 横幅图片            | `src/config/siteConfig.ts` → `banner.src` + 替换 `public/assets/` 图片 |
| 导航菜单            | `src/config/navBarConfig.ts`                                           |
| 个人头像/昵称/简介  | `src/config/profileConfig.ts`                                          |
| 社交链接            | `src/config/profileConfig.ts` → `links`                                |
| 公告内容            | `src/config/announcementConfig.ts`                                     |
| 页脚信息            | `src/config/footerConfig.ts` / `src/FooterConfig.html`                 |
| 友链列表            | `src/data/friends.ts`                                                  |
| 项目展示            | `src/data/projects.ts`                                                 |
| 技能展示            | `src/data/skills.ts`                                                   |
| 时间线              | `src/data/timeline.ts`                                                 |
| 设备展示            | `src/data/devices.ts`                                                  |
| 番剧列表            | `src/data/anime.ts`（本地模式）或 `siteConfig.ts`（API模式）           |
| 日记内容            | `src/data/diary.ts`                                                    |
| 关于页              | `src/content/spec/about.md`                                            |
| 友链页说明          | `src/content/spec/friends.md`                                          |
| 相册                | `public/images/albums/*/info.json` + 图片                              |
| 界面文字（中文）    | `src/i18n/languages/zh_CN.ts`                                          |
| 界面文字（英文）    | `src/i18n/languages/en.ts`                                             |
| 界面文字（日文）    | `src/i18n/languages/ja.ts`                                             |
| 评论系统            | `src/config/commentConfig.ts`                                          |
| 音乐播放器          | `src/config/musicConfig.ts`                                            |
| 看板娘              | `src/config/pioConfig.ts`                                              |
| 樱花特效            | `src/config/effectsConfig.ts`                                          |
| 壁纸配置            | `src/config/backgroundWallpaper.ts`                                    |
| 侧边栏布局          | `src/config/sidebarConfig.ts`                                          |
| 文章许可协议        | `src/config/licenseConfig.ts`                                          |
| 特色页面开关        | `src/config/siteConfig.ts` → `featurePages`                            |
| 404 页面文字        | `src/i18n/languages/zh_CN.ts` → `notFound*` 相关 key                   |
