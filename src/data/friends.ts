// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		desc: "The web framework for content-driven websites",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		siteurl: "https://github.com/withastro/astro",
		tags: [
			"Framework",
		],
		title: "Astro",
	},
	{
		desc: "Mizuki User Manual",
		imgurl: "https://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: [
			"Docs",
		],
		title: "Mizuki Docs",
	},
	{
		desc: "Develop. Preview. Ship.",
		imgurl: "https://avatars.githubusercontent.com/u/14985020?v=4&s=640",
		siteurl: "https://vercel.com",
		tags: [
			"Hosting",
			"Cloud",
		],
		title: "Vercel",
	},
	{
		desc: "A utility-first CSS framework for rapidly building custom designs",
		imgurl: "https://avatars.githubusercontent.com/u/67109815?v=4&s=640",
		siteurl: "https://tailwindcss.com",
		tags: [
			"CSS",
			"Framework",
		],
		title: "Tailwind CSS",
	},
	{
		desc: "TypeScript is JavaScript with syntax for types",
		imgurl: "https://avatars.githubusercontent.com/u/6154722?v=4&s=640",
		siteurl: "https://www.typescriptlang.org",
		tags: [
			"Language",
			"JavaScript",
		],
		title: "TypeScript",
	},
	{
		desc: "A JavaScript library for building user interfaces",
		imgurl: "https://avatars.githubusercontent.com/u/6412038?v=4&s=640",
		siteurl: "https://reactjs.org",
		tags: [
			"Framework",
			"JavaScript",
		],
		title: "React",
	},
	{
		desc: "Where the world builds software",
		imgurl: "https://avatars.githubusercontent.com/u/9919?v=4&s=640",
		siteurl: "https://github.com",
		tags: [
			"Development",
			"Platform",
		],
		title: "GitHub",
	},
	{
		desc: "The web's most comprehensive resource for web developers",
		imgurl: "https://avatars.githubusercontent.com/u/7565578?v=4&s=640",
		siteurl: "https://developer.mozilla.org",
		tags: [
			"Docs",
			"Reference",
		],
		title: "MDN Web Docs",
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
