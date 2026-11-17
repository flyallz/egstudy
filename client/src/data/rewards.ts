// 本站自有奖励系统的数据定义：成就徽章、XP 商店、每周挑战、学习伙伴豆豆。
// 徽章解锁、挑战进度、豆豆等级全部由服务端按真实学习记录计算，这里只放展示文案与阈值说明。

export interface BadgeDef {
  key: string;
  name: string;
  icon: string;
  desc: string;
  hint: string; // 未解锁时显示的进度提示前缀
}

export const BADGES: BadgeDef[] = [
  { key: "perfect", name: "满分猎手", icon: "🎯", desc: "任意一次测验拿到满分 100 分", hint: "在任意测验中拿到 100 分" },
  { key: "streak7", name: "七日不辍", icon: "🔥", desc: "连续学习打卡满 7 天", hint: "连续打卡进度" },
  { key: "blank20", name: "填空高手", icon: "✏️", desc: "填空题累计答对 20 道", hint: "填空已答对" },
  { key: "words100", name: "词汇收割机", icon: "🌾", desc: "累计记住 100 个单词", hint: "已记住单词" },
  { key: "placement", name: "越级挑战者", icon: "🚀", desc: "通过任意一次越级考试", hint: "在学习路径里通过一次越级考试" },
];

export function badgeName(key: string): string {
  if (key.startsWith("challenge:")) return "本周挑战徽章";
  return BADGES.find((b) => b.key === key)?.name ?? "成就徽章";
}

export interface ShopItem {
  key: string;
  name: string;
  icon: string;
  price: number;
  consumable: boolean;
  desc: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { key: "hint_card", name: "提示卡", icon: "💡", price: 30, consumable: true, desc: "测验中去掉一个错误选项，每次测验限用 1 张（选择题可用）。" },
  { key: "shield_card", name: "免错卡", icon: "🛡️", price: 50, consumable: true, desc: "答错一题也算答对：不扣分、不影响通过判定，每次测验限用 1 张。" },
  { key: "skin_sunset", name: "种子树皮肤 · 晚霞橙", icon: "🌇", price: 120, consumable: false, desc: "把种子树的配色换成暖暖的晚霞橙，兑换后在背包里点「换上」。" },
  { key: "skin_forest", name: "种子树皮肤 · 森林绿", icon: "🌲", price: 120, consumable: false, desc: "把种子树的配色换成深深的森林绿，兑换后在背包里点「换上」。" },
  { key: "skin_grape", name: "种子树皮肤 · 葡萄紫", icon: "🍇", price: 120, consumable: false, desc: "把种子树的配色换成葡萄紫，兑换后在背包里点「换上」。" },
  { key: "frame_gold", name: "头像框 · 金色光环", icon: "👑", price: 80, consumable: false, desc: "给头像加一圈金色光环，兑换后在背包里点「换上」。" },
  { key: "frame_leaf", name: "头像框 · 薄荷绿环", icon: "🍃", price: 80, consumable: false, desc: "给头像加一圈薄荷绿环，兑换后在背包里点「换上」。" },
  { key: "frame_star", name: "头像框 · 珊瑚星环", icon: "⭐", price: 80, consumable: false, desc: "给头像加一圈珊瑚橙环，兑换后在背包里点「换上」。" },
];

export type SkinKey = "sunset" | "forest" | "grape";
export type FrameKey = "gold" | "leaf" | "star";

export function itemKeyToSkin(key: string): SkinKey | null {
  if (key === "skin_sunset") return "sunset";
  if (key === "skin_forest") return "forest";
  if (key === "skin_grape") return "grape";
  return null;
}
export function itemKeyToFrame(key: string): FrameKey | null {
  if (key === "frame_gold") return "gold";
  if (key === "frame_leaf") return "leaf";
  if (key === "frame_star") return "star";
  return null;
}

/** 种子树皮肤配色（面板渐变 / 进度条 / 太阳）。 */
export const SKIN_STYLES: Record<SkinKey, { panel: string; bar: string; sun: string; ground: string }> = {
  sunset: { panel: "linear-gradient(to bottom,#fdeeda,#fde3d0,#fbd9c0)", bar: "#f08c2e", sun: "#ffb04d", ground: "#f2c9a4" },
  forest: { panel: "linear-gradient(to bottom,#e2f2e4,#d3ecd9,#bfe3cc)", bar: "#2e7d4f", sun: "#ffd94d", ground: "#a9d3b4" },
  grape: { panel: "linear-gradient(to bottom,#f1e8fb,#e7dbfa,#d9c8f5)", bar: "#7c5cbf", sun: "#ffd94d", ground: "#c9b6ec" },
};

/** 头像框样式（套在圆形头像外的一圈）。 */
export const FRAME_STYLES: Record<FrameKey, string> = {
  gold: "0 0 0 3px #fffdf5, 0 0 0 6px #f5b81d, 0 0 14px 2px rgba(245,184,29,.55)",
  leaf: "0 0 0 3px #f2fbf7, 0 0 0 6px #17a398, 0 0 12px 1px rgba(23,163,152,.45)",
  star: "0 0 0 3px #fff7f2, 0 0 0 6px #e4572e, 0 0 12px 1px rgba(228,87,46,.45)",
};

export type ChallengeKind = "lessons" | "words" | "days";
export const CHALLENGE_INFO: Record<ChallengeKind, { title: string; unit: string; desc: string }> = {
  lessons: { title: "本周完成 5 次练习", unit: "次", desc: "语法测验、词汇练习都算，退出中断的不计入。" },
  words: { title: "本周记住 50 个词", unit: "个", desc: "在词卡或复习里把单词标记为「已掌握」。" },
  days: { title: "本周连续打卡 5 天", unit: "天", desc: "本周内有学习记录的天数，学一节课或复习一组词都算。" },
};
export const CHALLENGE_XP = 30;

// ---------------- 学习伙伴豆豆 ----------------

export interface PetStage {
  level: number;
  name: string;
  minXp: number;
  face: string; // 表情 emoji（配在名字旁）
}

export const PET_STAGES: PetStage[] = [
  { level: 1, name: "幼犬", minXp: 0, face: "🥺" },
  { level: 2, name: "学步", minXp: 100, face: "😊" },
  { level: 3, name: "勤奋", minXp: 300, face: "🤓" },
  { level: 4, name: "博学", minXp: 700, face: "😎" },
  { level: 5, name: "学霸", minXp: 1500, face: "🏆" },
];

export function petStageForXp(xp: number): { stage: PetStage; next: PetStage | null; xpToNext: number } {
  let stage = PET_STAGES[0]!;
  for (const s of PET_STAGES) if (xp >= s.minXp) stage = s;
  const next = PET_STAGES[stage.level] ?? null; // level 是 1 起，下标 level 即下一阶段
  return { stage, next, xpToNext: next ? next.minXp - xp : 0 };
}

export const PET_LINES = [
  "汪！今天也要一起加油，把这节课拿下！",
  "你认真学习的样子，豆豆都看在眼里啦。",
  "休息一下没关系，回来继续就好，豆豆等你。",
  "新单词不可怕，一个一个啃，豆豆陪你啃。",
  "错题是藏宝图，顺着它就能找到没学会的地方。",
  "每天进步一点点，种子总会长成大树的。",
  "豆豆的小花发夹都为你高兴得发亮啦！",
  "先定个小目标：今天再多记 5 个词，怎么样？",
  "你背的每个单词，豆豆都帮你记着呢。",
  "坚持打卡的人最了不起，汪汪为你骄傲！",
];

export const PET_FEED_LINES = [
  "嗷呜——好吃！豆豆充满电啦，陪你继续学！",
  "谢谢投喂！豆豆开心地转了个圈。",
  "吃饱饱，学好好！豆豆陪你冲下一课。",
  "这口小鱼干（学习能量）真香，豆豆满足地点点头。",
];
