import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
  name: "过度睡眠",
  bio: "idkwtd",
  typewriter: {
    enable: true, // 启用个人简介打字机效果
    speed: 120, // 打字速度（毫秒）
  },
  links: [
    {
      name: "Github",
      icon: "mdi:github",
      url: "https://github.com/LangTian0110",
    },
    {
      name: "CloudMusic",
      icon: "simple-icons:neteasecloudmusic",
      url: "https://music.163.com/#/user/home?id=5113280144",
    },
    {
      name: "Mail",
      icon: "majesticons:mail",
      url: "mailto:langtian0110@qq.com",
    },
  ],
};
