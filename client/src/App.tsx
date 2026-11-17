import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {
  CEFR_LEVELS,
  GRAMMAR_XP,
  VOCAB_XP,
  type CefrLevel,
  type GrammarLesson,
  type VocabSet,
  type Word,
} from "./data/content";
import {
  ALL_VOCAB_LESSONS,
  CEFR_LESSONS,
  GRAMMAR_101,
  QUIZ_COUNTS,
  TOPIC_DEFS,
  TOPIC_LESSONS,
  TOTAL_XP_FULL,
  buildGrammarPlacement,
  buildTopicPlacement,
  cefrLessons,
  grammarByLevel101,
  isDifficultyPending,
  isDifficultyPartial,
  collectedCountFor,
  quizCountFor,
  topicLessons,
} from "./data/catalog";
import { TreeWidget } from "./components/widgets";
import { ChallengeCard, PetCard } from "./components/Rewards";
import { useAppearance } from "./appearance";
import { FRAME_STYLES, badgeName } from "./data/rewards";
import {
  GrammarLessonView,
  PlacementView,
  DIFF_STARS,
  type Difficulty3,
  type LessonStats,
} from "./views/LessonViews";
import { VocabSetView } from "./views/VocabViews";
import { ReviewView } from "./views/Review";
import { MaterialsView } from "./views/Materials";
import { ToolsView } from "./views/Tools";
import { HistoryView } from "./views/History";
import { ProfileView } from "./views/Profile";
import { currentWeekDates, todayStr, useAnimatedNumber } from "./lib";
import { tx, useSettings } from "./settings";
import heroImg from "./assets/hero.webp";
import cardGrammarImg from "./assets/card-grammar.webp";
import cardVocabTopicImg from "./assets/card-vocab-topic.webp";
import cardVocabCefrImg from "./assets/card-vocab-cefr.webp";
import cardWritingImg from "./assets/card-writing.webp";
import footerGuideImg from "./assets/footer-guide.webp";

type View =
  | { name: "home" }
  | { name: "roadmap" }
  | { name: "review" }
  | { name: "materials" }
  | { name: "tools" }
  | { name: "history" }
  | { name: "profile" }
  | { name: "grammar"; id: string; phase: "theory" | "quizIntro"; difficulty: Difficulty3 }
  | { name: "vocab"; id: string; mode: "cards" | "practice" | "dictation" | "pronounce" }
  | { name: "placement-grammar"; level: CefrLevel }
  | { name: "placement-topic"; topicId: string };

const NAV: { key: string; zh: string; en: string }[] = [
  { key: "home", zh: "首页", en: "Home" },
  { key: "roadmap", zh: "学习路径", en: "Path" },
  { key: "review", zh: "复习", en: "Review" },
  { key: "materials", zh: "学习资料", en: "Materials" },
  { key: "tools", zh: "工具", en: "Tools" },
  { key: "history", zh: "历史", en: "History" },
];

type RoadmapTab = "grammar" | "topic" | "cefr";

// ---------------- 主导航切换过渡的词卡 ----------------
// 每次切换随机抽一个站内真实有的词：已学过的优先（复习牌组 / 已标记记住 / 已完成词汇课），
// 没有已学词时从 CEFR A1 词汇里抽。正面词性统一显示中文。
interface NavWord {
  pos: string;
  word: string;
  phonetic: string;
  meaning: string;
}
const POS_ZH: Record<string, string> = {
  "n.": "名词",
  "v.": "动词",
  "adj.": "形容词",
  "adv.": "副词",
  "prep.": "介词",
  "n./v.": "名词/动词",
};
const posZh = (pos: string) => POS_ZH[pos] ?? pos;
const WORD_INDEX = new Map<string, Word>();
for (const s of ALL_VOCAB_LESSONS) {
  for (const w of s.words) {
    const key = w.word.toLowerCase();
    if (!WORD_INDEX.has(key)) WORD_INDEX.set(key, w);
  }
}
const CEFR_A1_WORD_POOL: Word[] = [
  ...new Map(cefrLessons("A1").flatMap((s) => s.words).map((w) => [w.word.toLowerCase(), w] as const)).values(),
];

interface ModalState {
  kind: "grammar" | "vocab";
  id: string;
}

export function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [roadmapTab, setRoadmapTab] = useState<RoadmapTab>("grammar");
  const [grammarLevel, setGrammarLevel] = useState<CefrLevel>("A1");
  const [cefrLevel, setCefrLevel] = useState<CefrLevel>("A1");
  const [topicId, setTopicId] = useState<string>("t-education");
  const [modal, setModal] = useState<ModalState | null>(null);
  const [modalDiff, setModalDiff] = useState<Difficulty3>("简单");
  const [accountOpen, setAccountOpen] = useState(false);
  // 主导航切换过渡：id 变化即重播一次（null = 不显示）；连点时新的一次直接取代旧的一次。
  // 每次触发都重新随机抽一个词（已学过的优先），抽到的词随这次过渡一起存下。
  const [navFx, setNavFx] = useState<{ id: number; w: NavWord } | null>(null);
  const navFxTimer = useRef<number | null>(null);
  const [infoModal, setInfoModal] = useState<string | null>(null);
  const [skipOffset, setSkipOffset] = useState(0);
  const [settings, setSettings] = useSettings();
  const [appearance, setAppearance] = useAppearance();
  const lang = settings.lang;
  const queryClient = useQueryClient();

  const progress = useQuery({
    queryKey: ["progress"],
    queryFn: () => api.getProgress({ today: todayStr() }),
  });
  const historyToday = useQuery({
    queryKey: ["history", "today-mini"],
    queryFn: () => api.getHistory({ query: "", limit: 100 }),
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const data = progress.data;
  const xp = data?.xp ?? 0;
  const displayXp = useAnimatedNumber(xp);
  const streak = data?.streak ?? 0;
  const studyDates = data?.studyDates ?? [];
  const profile = data?.profile ?? { name: "学习者", email: "" };
  const unlocks = useMemo(() => new Set(data?.unlocks ?? []), [data]);
  const claims = useMemo(() => new Set(data?.claims ?? []), [data]);
  const deckKeys = useMemo(() => new Set((data?.deck ?? []).map((d) => d.wordKey)), [data]);

  const completedMap = useMemo(() => {
    const map = new Map<string, { bestScore: number; xpEarned: number }>();
    for (const c of data?.completed ?? []) map.set(c.lessonId, { bestScore: c.bestScore, xpEarned: c.xpEarned });
    return map;
  }, [data]);

  const statsMap = useMemo(() => {
    const map = new Map<string, LessonStats>();
    for (const s of data?.lessonStats ?? []) {
      // 原站提取课的分项课时（#practice / #dictation）合并回本课：次数与星数相加、最佳取高
      const baseId = s.lessonId.split("#")[0]!;
      const cur = map.get(baseId) ?? { attempts: 0, bestScore: 0, recentScore: 0, stars: 0 };
      cur.attempts += s.attempts;
      cur.bestScore = Math.max(cur.bestScore, s.bestScore);
      cur.recentScore = s.recentScore;
      cur.stars += s.stars;
      map.set(baseId, cur);
    }
    // 提取课的词卡环节本身值 1 星（词卡以难度「词卡」记账、服务端不给星，这里按完成状态补上）
    for (const [id, st] of map) {
      const lesson = ALL_VOCAB_LESSONS.find((l) => l.id === id);
      if (lesson?.extracted && (completedMap.get(id)?.bestScore ?? 0) >= 80) st.stars += 1;
    }
    return map;
  }, [data, completedMap]);

  // 原站提取课的环节通过状态（练习 / 听写记在分项课时上）
  const componentPassedFor = (id: string) => ({
    practice: (completedMap.get(`${id}#practice`)?.bestScore ?? 0) >= 80,
    dictation: (completedMap.get(`${id}#dictation`)?.bestScore ?? 0) >= 80,
  });

  const marksMap = useMemo(() => {
    const map: Record<string, "known" | "learning"> = {};
    for (const m of data?.reviewMarks ?? []) {
      if (m.status === "known" || m.status === "learning") map[m.wordKey] = m.status;
    }
    return map;
  }, [data]);

  const passed = (id: string) => (completedMap.get(id)?.bestScore ?? 0) >= 80;

  // 解锁规则：语法按级别顺序（前一级全通过或越级解锁才开下一级，级内逐课解锁）
  const grammarUnlocked = (level: CefrLevel, idx: number): boolean => {
    if (unlocks.has(`grammar:${level}`)) return true;
    const li = CEFR_LEVELS.indexOf(level);
    if (li > 0) {
      const prevLevel = CEFR_LEVELS[li - 1]!;
      if (!unlocks.has(`grammar:${prevLevel}`)) {
        const prevLessons = grammarByLevel101(prevLevel);
        if (!prevLessons.every((l) => passed(l.id))) return false;
      }
    }
    if (idx === 0) return true;
    const lessons = grammarByLevel101(level);
    const prev = lessons[idx - 1];
    return prev ? passed(prev.id) : false;
  };
  const topicUnlocked = (tid: string, idx: number): boolean => {
    if (unlocks.has(`topic:${tid}`)) return true;
    if (idx === 0) return true;
    const prev = topicLessons(tid)[idx - 1];
    return prev ? passed(prev.id) : false;
  };

  const totalLessons = GRAMMAR_101.length + ALL_VOCAB_LESSONS.length;
  const grammarDone = GRAMMAR_101.filter((l) => completedMap.has(l.id)).length;
  const vocabDone = ALL_VOCAB_LESSONS.filter((s) => completedMap.has(s.id)).length;
  // 已完成课数按真实课目统计（提取课的分项课时 #practice / #dictation 不单独计课）
  const completedCount = grammarDone + vocabDone;
  const accuracy =
    data && data.historyStats.totalAnswered > 0
      ? Math.round((data.historyStats.totalCorrect / data.historyStats.totalAnswered) * 100)
      : 0;
  const knownWords = Object.values(marksMap).filter((s) => s === "known").length;

  // 每日目标
  const today = todayStr();
  const evMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of data?.todayEvents ?? []) m.set(e.type, e.amount);
    return m;
  }, [data]);
  const todayAttempts = useMemo(
    () => (historyToday.data?.items ?? []).filter((i) => i.createdAt.slice(0, 10) === today),
    [historyToday.data, today],
  );
  const goals = [
    { label: "完成 1 次练习", now: Math.min(1, evMap.get("lesson") ?? 0), target: 1 },
    { label: "复习 5 个单词", now: Math.min(5, evMap.get("review") ?? 0), target: 5 },
    { label: "一次测验达到 80 分", now: todayAttempts.some((a) => !a.interrupted && a.score >= 80) ? 1 : 0, target: 1 },
    { label: "学习 10 张词卡", now: Math.min(10, evMap.get("cards") ?? 0), target: 10 },
    { label: "累计答对 10 题", now: Math.min(10, todayAttempts.reduce((n, a) => n + a.correct, 0)), target: 10 },
  ];
  const goalsDone = goals.every((g) => g.now >= g.target);
  const dailyClaimed = claims.has(`daily:${today}`);
  const weekDates = currentWeekDates();
  const weekStudied = weekDates.filter((d) => studyDates.includes(d)).length;
  const weeklyClaimed = claims.has(`weekly:${weekDates[0]}`);

  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);
  const notify = (msg: string) => setToast({ id: Date.now(), msg });

  // 徽章解锁提示：对比上次看到的徽章集合，新点亮的逐个弹 toast（首次加载用服务端本次新判定出的）
  const badgeKeysRef = useRef<Set<string> | null>(null);
  const [freshBadges, setFreshBadges] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!data) return;
    const keys = new Set(data.badges.map((b) => b.key));
    if (badgeKeysRef.current === null) {
      badgeKeysRef.current = keys;
      if (data.newBadges.length > 0) {
        setFreshBadges(new Set(data.newBadges));
        data.newBadges.forEach((k, i) => {
          window.setTimeout(() => notify(`🏅 徽章解锁：${badgeName(k)}，去个人中心看看徽章墙`), i * 900);
        });
      }
      return;
    }
    const fresh = [...keys].filter((k) => !badgeKeysRef.current!.has(k));
    badgeKeysRef.current = keys;
    if (fresh.length > 0) {
      setFreshBadges(new Set(fresh));
      fresh.forEach((k, i) => {
        window.setTimeout(() => notify(`🏅 徽章解锁：${badgeName(k)}，去个人中心看看徽章墙`), i * 900);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const inventoryMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of data?.inventory ?? []) m.set(i.itemKey, i.quantity);
    return m;
  }, [data]);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast((cur) => (cur && cur.id === toast.id ? null : cur)), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const claim = useMutation({
    mutationFn: async (kind: "daily" | "weekly") =>
      await api.claimChest({ kind, today, weekDates }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      if (res.message) notify(res.message);
    },
  });

  // 继续学习：按顺序找第一组未通过的课（语法优先，其次主题、CEFR）
  const continueCandidates = useMemo(() => {
    const list: { kind: "grammar" | "vocab"; id: string; title: string }[] = [];
    for (const l of GRAMMAR_101) if (!passed(l.id)) list.push({ kind: "grammar", id: l.id, title: `${l.level} · ${l.titleCn}` });
    for (const s of TOPIC_LESSONS) if (!passed(s.id)) list.push({ kind: "vocab", id: s.id, title: s.titleCn });
    for (const s of CEFR_LESSONS) if (!passed(s.id)) list.push({ kind: "vocab", id: s.id, title: s.titleCn });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedMap]);
  const continueItem = continueCandidates[skipOffset % Math.max(1, continueCandidates.length)];

  const reset = useMutation({
    mutationFn: async () => await api.resetProgress({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["writing-history"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
      setView({ name: "home" });
    },
  });
  const [confirmReset, setConfirmReset] = useState(false);
  const [logoutNote, setLogoutNote] = useState(false);

  const go = (v: View) => {
    setView(v);
    setAccountOpen(false);
  };

  useEffect(
    () => () => {
      if (navFxTimer.current) window.clearTimeout(navFxTimer.current);
    },
    [],
  );

  // 过渡词卡抽词：已学过的词优先（复习牌组里的、已标记记住的、已完成词汇课里的），
  // 一个已学词都没有时从 CEFR A1 词汇里抽。每次触发都重新随机抽一个。
  const pickNavWord = (): NavWord => {
    const learned = new Map<string, NavWord>();
    const addW = (w: { pos: string; word: string; phonetic: string; meaning: string }) => {
      learned.set(w.word.toLowerCase(), { pos: posZh(w.pos), word: w.word, phonetic: w.phonetic, meaning: w.meaning });
    };
    for (const d of data?.deck ?? []) addW(d);
    for (const [key, status] of Object.entries(marksMap)) {
      if (status !== "known") continue;
      const hit = WORD_INDEX.get(key);
      if (hit) addW(hit);
    }
    for (const id of completedMap.keys()) {
      const lesson = ALL_VOCAB_LESSONS.find((s) => s.id === id);
      if (lesson) for (const w of lesson.words) addW(w);
    }
    const pool =
      learned.size > 0
        ? [...learned.values()]
        : CEFR_A1_WORD_POOL.map((w) => ({ pos: posZh(w.pos), word: w.word, phonetic: w.phonetic, meaning: w.meaning }));
    return pool[Math.floor(Math.random() * pool.length)] ?? { pos: "动词", word: "learn", phonetic: "/lɜːn/", meaning: "学习" };
  };

  // 只供主导航六项使用：先立即切页（过渡层不拦截点击、不阻塞导航），再盖上过渡层；
  // 快速连点时清掉上一个计时器并以新 id 重播，永远只有一个过渡层。每次切换重新抽一个词。
  const goNav = (key: string) => {
    const switching = view.name !== key;
    go({ name: key } as View);
    if (!switching) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navFxTimer.current) window.clearTimeout(navFxTimer.current);
    setNavFx({ id: Date.now(), w: pickNavWord() });
    navFxTimer.current = window.setTimeout(() => setNavFx(null), 1050);
  };
  const navActive = (key: string) =>
    view.name === key ||
    (key === "roadmap" && (view.name === "grammar" || view.name === "vocab" || view.name.startsWith("placement")));

  const openRoadmap = (tab: RoadmapTab) => {
    setRoadmapTab(tab);
    go({ name: "roadmap" });
  };

  const grammarLesson = view.name === "grammar" ? GRAMMAR_101.find((l) => l.id === view.id) : undefined;
  const vocabSet = view.name === "vocab" ? ALL_VOCAB_LESSONS.find((s) => s.id === view.id) : undefined;
  const modalGrammar = modal?.kind === "grammar" ? GRAMMAR_101.find((l) => l.id === modal.id) : undefined;
  const modalRecent = modalGrammar
    ? (historyToday.data?.items ?? []).find((i) => i.lessonId === modalGrammar.id)
    : undefined;
  const modalVocab = modal?.kind === "vocab" ? ALL_VOCAB_LESSONS.find((s) => s.id === modal.id) : undefined;

  const hour = new Date().getHours();
  const greeting = hour < 6 ? "夜深了" : hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好";
  const viewKey = [
    view.name,
    view.name === "roadmap" ? roadmapTab : "",
    "id" in view ? view.id : "",
    "level" in view ? view.level : "",
    "topicId" in view ? view.topicId : "",
  ].join(":");

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-40 bg-[var(--bg)]/95 pt-safe backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={() => go({ name: "home" })} className="text-left" aria-label="闪记英语，回到首页">
            <span className="font-display text-2xl leading-none text-[var(--ink)]">
              闪记英语<span className="text-[var(--coral)]">.</span>
            </span>
            <span className="mt-0.5 block text-[10px] font-bold tracking-[0.3em] text-[var(--dim)]">FLASH ENGLISH</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-sm font-bold text-[var(--ink)] shadow-sm">
              <span key={streak} className={streak > 0 ? "animate-flame-pop" : "inline-block opacity-40 grayscale"} aria-hidden>🔥</span>{" "}
              {streak} {tx(lang, "天", "days")}
            </span>
            <span className="rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm font-bold text-white">{displayXp} XP</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((o) => !o)}
                aria-expanded={accountOpen}
                aria-haspopup="true"
                aria-label={tx(lang, "打开账号面板", "Open account panel")}
                style={appearance.frame ? { boxShadow: FRAME_STYLES[appearance.frame] } : undefined}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f08c2e] font-display text-lg text-white"
              >
                {profile.name.charAt(0) || "学"}
              </button>
              {accountOpen ? (
                <div className="animate-modal-in absolute right-0 top-12 z-50 w-72 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl" role="menu" aria-label="账号面板">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f08c2e] font-display text-xl text-white"
                      style={appearance.frame ? { boxShadow: FRAME_STYLES[appearance.frame] } : undefined}
                      aria-hidden
                    >
                      {profile.name.charAt(0) || "学"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-[var(--ink)]">{profile.name}</p>
                      <p className="truncate text-sm text-[var(--dim)]">{profile.email || tx(lang, "未填写邮箱", "No email yet")}</p>
                    </div>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--mint)] px-3 py-0.5 text-sm font-bold text-[var(--teal-dark)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--teal)]" aria-hidden /> {tx(lang, "进度已同步", "Progress synced")}
                  </p>
                  <div className="mt-3 grid gap-1.5">
                    <button type="button" onClick={() => go({ name: "profile" })} className="min-h-10 rounded-2xl bg-[var(--mint)] px-4 py-2 text-left font-bold text-[var(--ink)]">
                      {tx(lang, "个人中心", "Profile")} →
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoutNote(true)}
                      className="min-h-10 rounded-2xl bg-[#fbe3da] px-4 py-2 text-left font-bold text-[var(--coral)]"
                    >
                      {tx(lang, "退出登录", "Log out")}
                    </button>
                    {logoutNote ? (
                      <p className="rounded-2xl bg-[#fdf3ee] p-3 text-sm text-[var(--dim)]">
                        本站是本地学习模式：没有账号密码，进度保存在这台设备上，不需要退出登录。想清空进度可用页面底部的「重置学习进度」。
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-4 border-t border-[var(--border)] pt-3">
                    <p className="text-sm font-bold text-[var(--ink)]">{tx(lang, "显示设置", "Display")}</p>
                    <SettingRow label={tx(lang, "字号", "Font size")} value={settings.fontSize} options={["小", "中", "大"]} labels={{ 小: tx(lang, "小", "S"), 中: tx(lang, "中", "M"), 大: tx(lang, "大", "L") }} onPick={(v) => setSettings({ fontSize: v as typeof settings.fontSize })} />
                    <SettingRow label={tx(lang, "界面", "Theme")} value={settings.theme} options={["浅色", "深色", "跟随系统"]} labels={{ 浅色: tx(lang, "浅色", "Light"), 深色: tx(lang, "深色", "Dark"), 跟随系统: tx(lang, "跟随系统", "System") }} onPick={(v) => setSettings({ theme: v as typeof settings.theme })} />
                    <SettingRow label={tx(lang, "语言", "Language")} value={settings.lang} options={["中文", "英文"]} labels={{ 中文: "中文", 英文: "English" }} onPick={(v) => setSettings({ lang: v as typeof settings.lang })} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="主导航">
          <ul className="flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <li key={item.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goNav(item.key)}
                  aria-current={navActive(item.key) ? "page" : undefined}
                  className={`relative min-h-10 px-3.5 py-2 text-[15px] font-bold ${navActive(item.key) ? "text-[var(--ink)]" : "text-[var(--dim)]"}`}
                >
                  {tx(lang, item.zh, item.en)}
                  {navActive(item.key) ? <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-[var(--teal)]" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {toast ? (
        <div
          key={toast.id}
          role="status"
          className="animate-toast-in fixed left-1/2 top-24 z-[70] max-w-[calc(100vw-2rem)] rounded-full bg-[var(--ink)] px-5 py-2.5 text-center font-bold text-white shadow-xl"
        >
          {toast.msg}
        </div>
      ) : null}

      {navFx ? (
        <div key={navFx.id} className="nav-fx" aria-hidden="true">
          <div className="nav-fx-scene">
            <div className="nav-fx-flip">
              <div className="nav-fx-face nav-fx-front">
                <span className="nav-fx-tag">{navFx.w.pos}</span>
                <span className="nav-fx-word" style={navFx.w.word.length > 9 ? { fontSize: 25 } : undefined}>
                  {navFx.w.word}
                </span>
                <span className="nav-fx-phonetic">{navFx.w.phonetic}</span>
              </div>
              <div className="nav-fx-face nav-fx-back">
                <span className="nav-fx-tag">意思</span>
                <span
                  className="nav-fx-meaning"
                  style={navFx.w.meaning.length > 8 ? { fontSize: 19 } : navFx.w.meaning.length > 5 ? { fontSize: 24 } : undefined}
                >
                  {navFx.w.meaning}
                </span>
              </div>
            </div>
          </div>
          <p className="nav-fx-brand font-display">
            闪记英语<span className="text-[var(--coral)]">.</span>
          </p>
          <div className="nav-fx-track">
            <div className="nav-fx-fill" />
          </div>
        </div>
      ) : null}

      <main className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div key={viewKey} className="animate-page-in">
        {view.name === "home" && (
          <HomeView
            greeting={greeting}
            name={profile.name}
            lang={lang}
            xp={xp}
            streak={streak}
            studyDates={studyDates}
            goals={goals}
            goalsDone={goalsDone}
            dailyClaimed={dailyClaimed}
            weekStudied={weekStudied}
            weeklyClaimed={weeklyClaimed}
            onClaim={(kind) => claim.mutate(kind)}
            claiming={claim.isPending}
            claimMsg={claim.data?.ok === false ? claim.data.message : claim.data?.ok ? claim.data.message : ""}
            knownWords={knownWords}
            continueItem={continueItem}
            onContinue={() => {
              if (!continueItem) return;
              if (continueItem.kind === "grammar") setModal({ kind: "grammar", id: continueItem.id });
              else setModal({ kind: "vocab", id: continueItem.id });
            }}
            onSkip={() => setSkipOffset((n) => n + 1)}
            onStart={() => openRoadmap("grammar")}
            onOpenTab={openRoadmap}
            onOpenTools={() => go({ name: "tools" })}
            skin={appearance.skin}
            pet={data?.pet ?? { feeds: 0, lastFedDate: null, seenLevel: 1 }}
            challenge={data?.weekChallenge ?? { weekKey: weekDates[0]!, kind: "lessons", target: 5, progress: 0, claimed: false }}
            onNotify={notify}
            onOpenProfile={() => go({ name: "profile" })}
          />
        )}

        {view.name === "roadmap" && (
          <RoadmapView
            tab={roadmapTab}
            onTab={setRoadmapTab}
            grammarLevel={grammarLevel}
            onGrammarLevel={setGrammarLevel}
            cefrLevel={cefrLevel}
            onCefrLevel={setCefrLevel}
            topicId={topicId}
            onTopic={setTopicId}
            statsMap={statsMap}
            passed={passed}
            grammarUnlocked={grammarUnlocked}
            topicUnlocked={topicUnlocked}
            levelUnlocked={(lv) => unlocks.has(`grammar:${lv}`)}
            topicPlacementUnlocked={(tid) => unlocks.has(`topic:${tid}`)}
            onOpenGrammar={(id) => setModal({ kind: "grammar", id })}
            onOpenVocab={(id) => setModal({ kind: "vocab", id })}
            onPlacementGrammar={(lv) => go({ name: "placement-grammar", level: lv })}
            onPlacementTopic={(tid) => go({ name: "placement-topic", topicId: tid })}
            onLocked={() => notify("🔒 这一课还没解锁，先完成前一课吧")}
          />
        )}

        {view.name === "review" && (
          <ReviewView deck={data?.deck ?? []} marks={marksMap} onGoRoadmap={() => openRoadmap("topic")} />
        )}
        {view.name === "materials" && (
          <MaterialsView
            onOpenGrammar={(id) => setModal({ kind: "grammar", id })}
            onOpenVocab={(id) => setModal({ kind: "vocab", id })}
          />
        )}
        {view.name === "tools" && <ToolsView />}
        {view.name === "history" && <HistoryView />}
        {view.name === "profile" && (
          <ProfileView
            lang={lang}
            settings={settings}
            onSettings={setSettings}
            badges={data?.badges ?? []}
            freshBadges={freshBadges}
            blankCorrect={data?.blankCorrect ?? 0}
            knownWords={knownWords}
            inventory={inventoryMap}
            appearance={appearance}
            onAppearance={setAppearance}
            onNotify={notify}
            data={{
              xp,
              streak,
              name: profile.name,
              email: profile.email,
              completedCount,
              totalLessons,
              grammarDone,
              grammarTotal: GRAMMAR_101.length,
              vocabDone,
              vocabTotal: ALL_VOCAB_LESSONS.length,
              accuracy,
              totalXp: TOTAL_XP_FULL,
            }}
          />
        )}

        {view.name === "grammar" && grammarLesson && (
          <GrammarLessonView
            lesson={grammarLesson}
            initialPhase={view.phase}
            initialDifficulty={view.difficulty}
            onBack={() => openRoadmap("grammar")}
          />
        )}
        {view.name === "grammar" && !grammarLesson && <p className="py-10 text-[var(--dim)]">没有找到这节课。</p>}

        {view.name === "vocab" && vocabSet && (
          <VocabSetView
            set={vocabSet}
            cardsDone={completedMap.has(vocabSet.id)}
            deckKeys={deckKeys}
            initialMode={view.mode}
            componentPassed={componentPassedFor(vocabSet.id)}
            onBack={() => openRoadmap(vocabSet.kind === "vocab-topic" ? "topic" : "cefr")}
          />
        )}
        {view.name === "vocab" && !vocabSet && <p className="py-10 text-[var(--dim)]">没有找到这组词汇。</p>}

        {view.name === "placement-grammar" && (
          <PlacementView
            title={`${view.level} 语法越级考试`}
            subtitle={`通过后解锁 ${view.level} 全部 ${grammarByLevel101(view.level).length} 节课程与全部难度（不点亮星级）。`}
            questions={buildGrammarPlacement(view.level)}
            passCount={48}
            unlockKey={`grammar:${view.level}`}
            onBack={() => openRoadmap("grammar")}
          />
        )}
        {view.name === "placement-topic" && (
          <PlacementView
            title={`${TOPIC_DEFS.find((t) => t.id === view.topicId)?.cn ?? ""}主题越级考试`}
            subtitle="30 题（25 道练习与填空 + 5 道听写），答对 25 题解锁本主题全部 10 课（不点亮星级）。"
            questions={buildTopicPlacement(view.topicId)}
            passCount={25}
            unlockKey={`topic:${view.topicId}`}
            onBack={() => openRoadmap("topic")}
          />
        )}

        <footer className="mt-12 border-t border-[var(--border)] pt-5 pb-2 text-center text-xs text-[var(--dim)]">
          <p>闪记英语 · The Forum Center · © 2026 · {tx(lang, "原创中文讲解，覆盖 CEFR A1–C2", "Original Chinese lessons, CEFR A1–C2")}</p>
          <p className="mt-2 flex flex-wrap justify-center gap-1">
            {["关于我们", "隐私政策", "使用条款", "联系我们"].map((label) => (
              <button key={label} type="button" onClick={() => setInfoModal(label)} className="min-h-8 px-2 font-bold underline underline-offset-2">
                {label}
              </button>
            ))}
          </p>
          {confirmReset ? (
            <p className="mt-3">
              确定要清空全部进度，从一颗种子重新开始吗？{" "}
              <button
                type="button"
                onClick={() => {
                  reset.mutate();
                  setConfirmReset(false);
                }}
                className="min-h-8 px-2 font-bold text-[var(--coral)]"
              >
                确定清空
              </button>
              <button type="button" onClick={() => setConfirmReset(false)} className="min-h-8 px-2 font-bold text-[var(--teal-dark)]">
                取消
              </button>
            </p>
          ) : (
            <button type="button" onClick={() => setConfirmReset(true)} className="mt-2 min-h-8 px-2 font-bold text-[var(--dim)] underline underline-offset-2">
              重置学习进度
            </button>
          )}
        </footer>
        </div>
      </main>

      {/* 课程弹窗 */}
      {modal && modalGrammar ? (
        <GrammarModal
          lesson={modalGrammar}
          stats={statsMap.get(modalGrammar.id)}
          recent={
            modalRecent
              ? {
                  score: modalRecent.score,
                  difficulty: modalRecent.difficulty,
                  correct: modalRecent.correct,
                  total: modalRecent.total,
                }
              : null
          }
          num={grammarByLevel101(modalGrammar.level).findIndex((l) => l.id === modalGrammar.id) + 1}
          difficulty={modalDiff}
          onDifficulty={setModalDiff}
          onClose={() => setModal(null)}
          onTheory={() => {
            go({ name: "grammar", id: modalGrammar.id, phase: "theory", difficulty: modalDiff });
            setModal(null);
          }}
          onQuiz={() => {
            go({ name: "grammar", id: modalGrammar.id, phase: "quizIntro", difficulty: modalDiff });
            setModal(null);
          }}
        />
      ) : null}
      {modal && modalVocab ? (
        <VocabModal
          set={modalVocab}
          stats={statsMap.get(modalVocab.id)}
          cardsDone={completedMap.has(modalVocab.id)}
          componentPassed={componentPassedFor(modalVocab.id)}
          onClose={() => setModal(null)}
          onOpen={(mode) => {
            go({ name: "vocab", id: modalVocab.id, mode });
            setModal(null);
          }}
        />
      ) : null}

      {infoModal ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={infoModal}>
          <div className="animate-modal-in w-full max-w-md rounded-[2rem] bg-[var(--surface)] p-6">
            <h2 className="font-display text-2xl text-[var(--ink)]">{infoModal}</h2>
            <p className="mt-3 leading-relaxed text-[var(--dim)]">
              {infoModal === "关于我们"
                ? "闪记英语是 The Forum Center 的免费英语自学站：语法按 CEFR 分级、词汇按主题与等级两条线，配种子 XP 树与连续打卡，陪你每天学一点。全部讲解为中文原创。"
                : infoModal === "隐私政策"
                  ? "本站不需要注册账号。学习进度、词卡与作文记录只保存在本站的数据库中，用于展示你的学习轨迹；雅思作文批改会把你提交的作文发送给 AI 批改服务，请不要在作文里写真实姓名、学校等个人信息。"
                  : infoModal === "使用条款"
                    ? "本站内容供个人学习使用。测验分数、XP 与种子树阶段为本站自设的学习激励规则；雅思批改分数为 AI 预估，仅供自练参考，不构成任何考试成绩承诺。"
                    : "有课程建议或发现讲解错误，欢迎在个人中心留下邮箱后通过后续版本的新增反馈入口联系我们；当前版本可先记下问题，更新后会逐条处理。"}
            </p>
            <button type="button" onClick={() => setInfoModal(null)} className="mt-5 min-h-11 w-full rounded-full bg-[var(--ink)] px-5 py-2 font-bold text-white">
              关闭
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SettingRow({
  label,
  value,
  options,
  labels,
  onPick,
}: {
  label: string;
  value: string;
  options: string[];
  labels: Record<string, string>;
  onPick: (v: string) => void;
}) {
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <span className="w-14 shrink-0 text-sm text-[var(--dim)]">{label}</span>
      <div className="flex flex-1 gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            aria-pressed={value === o}
            className={`min-h-9 flex-1 rounded-full px-2 py-1 text-sm font-bold ${value === o ? "bg-[var(--ink)] text-white" : "bg-[var(--mint)] text-[var(--teal-dark)]"}`}
          >
            {labels[o] ?? o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- 课程弹窗 ----------------

// 指引三步与三张难度卡一一对应：每一步只高亮当前这一张卡，不整排包裹。
// 题量按本课实际题量生成（原站题库整课替换的课与全站默认题量可能不同）。
function tourStepsFor(lesson: GrammarLesson) {
  const hardPending = isDifficultyPending(lesson, "困难");
  const hardPartial = isDifficultyPartial(lesson, "困难");
  return [
    {
      title: "简单级别",
      text: `这是最基础的句子集合，练习时提示保持不变，先从这一档热身。共 ${quizCountFor(lesson, "简单")} 题，通过这一档，就能获得 1 颗星。`,
    },
    {
      title: "中等级别",
      text: `独立的一套题目，句子更长，填空题也比简单级别更多。共 ${quizCountFor(lesson, "中等")} 题，通过后获得 2 颗星。`,
    },
    {
      title: "困难级别",
      text: hardPending
        ? `这一档共 ${quizCountFor(lesson, "困难")} 题，原站题目尚未提取，先标待补、暂不可开始；等题目提取回来后开放。`
        : hardPartial
          ? `这一档原站共 ${quizCountFor(lesson, "困难")} 题，目前只收录了已提取的 ${collectedCountFor(lesson, "困难")} 题可以练，其余 ${quizCountFor(lesson, "困难") - collectedCountFor(lesson, "困难")} 题还在待补。通过后获得 3 颗星。`
          : `独立的一套题目，共 ${quizCountFor(lesson, "困难")} 题。必须全部答对才通过并获得 3 颗星；答错一题返回理论。`,
    },
  ];
}

function GrammarModal({
  lesson,
  stats,
  recent,
  num,
  difficulty,
  onDifficulty,
  onClose,
  onTheory,
  onQuiz,
}: {
  lesson: GrammarLesson;
  stats?: LessonStats;
  recent?: { score: number; difficulty: string; correct: number; total: number } | null;
  num: number;
  difficulty: Difficulty3;
  onDifficulty: (d: Difficulty3) => void;
  onClose: () => void;
  onTheory: () => void;
  onQuiz: () => void;
}) {
  const [tourStep, setTourStep] = useState<number | null>(null);

  // 第一次打开课弹窗时自动走一次指引，之后不再自动打扰（「指示」按钮可随时重看）
  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem("grammar-tour-seen") === "1";
    } catch {
      seen = true;
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      setTourStep(0);
      try {
        localStorage.setItem("grammar-tour-seen", "1");
      } catch {
        /* ignore */
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, []);

  const endTour = () => setTourStep(null);
  const tourSteps = tourStepsFor(lesson);
  const step = tourStep !== null ? tourSteps[tourStep] : undefined;
  const hi = (active: boolean) =>
    active ? "relative z-20 shadow-[0_0_0_3px_#ffffff,0_0_0_7px_#2dd4bf] transition-shadow duration-300" : "";

  return (
    <div className="animate-backdrop-in fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={`课程：${lesson.titleCn}`}>
      <div className="animate-modal-in relative w-full max-w-lg rounded-t-[2rem] bg-[var(--surface)] p-6 sm:rounded-[2rem]">
        <div className="flex items-start gap-4">
          <span className="font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[var(--ink)] text-2xl text-white" aria-hidden>
            {String(num).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[var(--dim)]">{lesson.level} 语法</p>
            <h2 className="font-display mt-0.5 text-2xl leading-snug text-[var(--ink)]">{lesson.titleCn}</h2>
            <p className="mt-0.5 text-sm text-[var(--dim)]">{lesson.titleEn} · {lesson.intro}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭课程面板" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--mint)] font-black text-[var(--ink)]">
            ✕
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-4 gap-2 text-center">
          <div className="rounded-2xl border border-[var(--border)] p-3">
            <dd className="font-display text-xl text-[var(--ink)] sm:text-2xl">{recent ? `${recent.score}%` : "—"}</dd>
            <dt className="mt-1 text-xs text-[var(--dim)]">最近成绩{recent?.difficulty ? ` · ${recent.difficulty}` : ""}</dt>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-3">
            <dd className="font-display text-xl text-[var(--ink)] sm:text-2xl">{recent ? `${recent.correct}/${recent.total}` : "—"}</dd>
            <dt className="mt-1 text-xs text-[var(--dim)]">正确答案</dt>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-3">
            <dd className="font-display text-xl text-[var(--ink)] sm:text-2xl">{stats?.attempts ?? 0}</dd>
            <dt className="mt-1 text-xs text-[var(--dim)]">完成次数</dt>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-3">
            <dd className="font-display text-xl text-[var(--ink)] sm:text-2xl">{stats ? `${stats.bestScore}%` : "—"}</dd>
            <dt className="mt-1 text-xs text-[var(--dim)]">最高分</dt>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-lg text-[var(--ink)]">选择级别</p>
          <button
            type="button"
            onClick={() => setTourStep(0)}
            className="min-h-9 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm font-bold text-[var(--dim)]"
            aria-label="打开新手指示"
          >
            ❓ 指示
          </button>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          {(Object.keys(QUIZ_COUNTS) as Difficulty3[]).map((d, i) => {
            const selected = difficulty === d;
            const stars = DIFF_STARS[d];
            const pending = isDifficultyPending(lesson, d);
            const partial = isDifficultyPartial(lesson, d);
            return (
              <button
                key={d}
                type="button"
                disabled={pending}
                onClick={() => onDifficulty(d)}
                aria-pressed={selected}
                aria-label={pending ? `${d}：原站题目待补，暂不可开始` : partial ? `${d}：已收 ${collectedCountFor(lesson, d)}/${quizCountFor(lesson, d)} 题，其余待补` : undefined}
                className={`min-h-14 rounded-2xl border-2 px-2 py-2.5 font-bold transition-colors ${
                  pending
                    ? "cursor-not-allowed border-dashed border-[var(--border)] bg-[#e8e6da] text-[var(--dim)] opacity-70"
                    : selected
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--border)] bg-white text-[var(--dim)]"
                } ${hi(tourStep === i)}`}
              >
                {d}
                <span className="mt-0.5 block text-base tracking-wider" aria-hidden>
                  <span className="text-[var(--mustard)]">{"★".repeat(stars)}</span>
                  <span className={selected ? "text-white/50" : "text-[var(--dim)]/50"}>{"☆".repeat(3 - stars)}</span>
                </span>
                <span className="block text-xs font-medium opacity-75">{partial ? `已收 ${collectedCountFor(lesson, d)}/${quizCountFor(lesson, d)} 题 · 其余待补` : `${quizCountFor(lesson, d)} 题${pending ? " · 原站题目待补" : ""}`}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 rounded-2xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--dim)]">
          {isDifficultyPending(lesson, difficulty)
            ? `「${difficulty}」级别共 ${quizCountFor(lesson, difficulty)} 题，原站题目尚未提取，待补后再开放。`
            : isDifficultyPartial(lesson, difficulty)
              ? `「${difficulty}」级别原站共 ${quizCountFor(lesson, difficulty)} 题，目前只收录了已提取的 ${collectedCountFor(lesson, difficulty)} 题，其余 ${quizCountFor(lesson, difficulty) - collectedCountFor(lesson, difficulty)} 题待补 · 通过可获得 ${DIFF_STARS[difficulty]} 颗星 · ${difficulty === "困难" ? "全部答对" : "达到 80%"}通过`
              : `通过「${difficulty}」级别可获得 ${DIFF_STARS[difficulty]} 颗星 · 共 ${quizCountFor(lesson, difficulty)} 题 · ${difficulty === "困难" ? "全部答对" : "达到 80%"}通过`}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onTheory} className="min-h-11 rounded-full border-2 border-[var(--ink)] bg-white px-3 py-2 font-bold text-[var(--ink)]">
            📖 理论
          </button>
          <button type="button" onClick={onQuiz} className="min-h-11 rounded-full border-2 border-[var(--border)] bg-white px-3 py-2 font-bold text-[var(--ink)]">
            ↺ 重新开始
          </button>
        </div>
        <button
          type="button"
          onClick={onQuiz}
          disabled={isDifficultyPending(lesson, difficulty)}
          className="hover-lift mt-3 min-h-16 w-full rounded-3xl bg-[var(--ink)] px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="block text-xl font-black">锻炼</span>
          <span className="block text-sm opacity-80">
            {isDifficultyPending(lesson, difficulty)
              ? "原站题目待补"
              : isDifficultyPartial(lesson, difficulty)
                ? `已收 ${collectedCountFor(lesson, difficulty)}/${quizCountFor(lesson, difficulty)} 题`
                : `${quizCountFor(lesson, difficulty)} 句话`}
          </span>
        </button>
        <p className="mt-3 text-center text-xs text-[var(--dim)]">完成测验最高 +{GRAMMAR_XP} XP · 星级按最高通过难度记录</p>

        {tourStep !== null && step ? (
          <>
            <div className="absolute inset-0 z-10 rounded-t-[2rem] bg-[#06231f]/60 sm:rounded-[2rem]" aria-hidden />
            <div
              key={tourStep}
              className="animate-slide-up absolute bottom-4 left-4 z-30 w-[min(21rem,calc(100%-2rem))] rounded-[1.75rem] bg-[#0b3b34] p-5 text-white shadow-2xl"
              role="dialog"
              aria-label={`新手指引第 ${tourStep + 1} 步，共 ${tourSteps.length} 步：${step.title}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-black text-[#2dd4bf]">步骤 {tourStep + 1}/{tourSteps.length}</p>
                <button
                  type="button"
                  onClick={endTour}
                  aria-label="关闭指引"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-black text-white"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-display mt-1.5 text-2xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-[#d7e8e2]">{step.text}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={endTour} className="min-h-11 px-2 font-bold text-white/85">
                  跳过
                </button>
                <div className="flex items-center gap-2">
                  {tourStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setTourStep(tourStep - 1)}
                      aria-label="返回上一步指引"
                      className="min-h-11 rounded-2xl border border-white/50 px-4 py-2 font-bold text-white"
                    >
                      上一步
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => (tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : endTour())}
                    className="hover-lift min-h-11 rounded-2xl bg-[#2dd4bf] px-6 py-2 font-black text-[#06302a]"
                  >
                    {tourStep < tourSteps.length - 1 ? "下一个 →" : "完成 ✓"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function VocabModal({
  set,
  stats,
  cardsDone,
  componentPassed,
  onClose,
  onOpen,
}: {
  set: VocabSet;
  stats?: LessonStats;
  cardsDone: boolean;
  componentPassed?: { practice: boolean; dictation: boolean };
  onClose: () => void;
  onOpen: (mode: "cards" | "practice" | "dictation" | "pronounce") => void;
}) {
  const ex = set.extracted;
  const modes: { key: "cards" | "practice" | "dictation" | "pronounce"; label: string; locked: boolean }[] = ex
    ? [
        { key: "cards", label: "学卡片", locked: false },
        { key: "practice", label: ex.practiceEasy.length ? "练习" : "练习（待补）", locked: !cardsDone || ex.practiceEasy.length === 0 },
        { key: "dictation", label: ex.dictationWords.length ? "听写" : "听写（待补）", locked: !(componentPassed?.practice ?? false) || ex.dictationWords.length === 0 },
        { key: "pronounce", label: "发音（待补）", locked: true },
      ]
    : [
        { key: "cards", label: "学卡片", locked: false },
        { key: "practice", label: "练习", locked: !cardsDone },
        { key: "dictation", label: "听写", locked: !cardsDone },
        { key: "pronounce", label: "发音", locked: !cardsDone },
      ];
  return (
    <div className="animate-backdrop-in fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={`词汇课：${set.titleCn}`}>
      <div className="animate-modal-in w-full max-w-lg rounded-t-[2rem] bg-[var(--surface)] p-6 sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-[var(--ink)]">{set.titleCn}</h2>
            <p className="mt-0.5 text-[var(--dim)]">{set.titleEn} · 共 {set.words.length} 个词</p>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭课程面板" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--mint)] font-black text-[var(--ink)]">
            ✕
          </button>
        </div>
        <p className="mt-3 rounded-2xl bg-[var(--mint)] p-3.5 leading-relaxed text-[var(--ink)]">
          {ex
            ? ex.practiceEasy.length === 0
              ? `原站的 ${set.words.length} 张词卡已收录并译成中文；练习、听写和发音题目待补。学完词卡可得 +${ex.cardsXp} XP。`
              : `学完词卡 +${ex.cardsXp} XP 并解锁练习；练习（简单档）通过 +${ex.practiceXp} XP、1 星，解锁听写；听写通过 +${ex.dictationXp} XP、1 星。本课共 +${ex.cardsXp + ex.practiceXp + ex.dictationXp} XP、3/${ex.totalStars} 星（中等、困难档与发音待补）。`
            : `学完本课全部卡片即算通过（+${VOCAB_XP} XP），练习、听写、发音随即解锁。`}
          {stats ? ` 你已尝试 ${stats.attempts} 次，最佳成绩 ${stats.bestScore} 分。` : ""}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              disabled={m.locked}
              onClick={() => onOpen(m.key)}
              className={`min-h-12 rounded-2xl px-4 py-2 font-bold ${
                m.locked
                  ? "cursor-not-allowed bg-[#e8e6da] text-[var(--dim)]"
                  : m.key === "cards"
                    ? "bg-[var(--ink)] text-white"
                    : "border-2 border-[var(--border)] bg-white text-[var(--ink)]"
              }`}
            >
              {m.locked ? "🔒 " : ""}{m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- 首页 ----------------

function HomeView(props: {
  greeting: string;
  name: string;
  lang: "中文" | "英文";
  xp: number;
  streak: number;
  studyDates: string[];
  goals: { label: string; now: number; target: number }[];
  goalsDone: boolean;
  dailyClaimed: boolean;
  weekStudied: number;
  weeklyClaimed: boolean;
  onClaim: (kind: "daily" | "weekly") => void;
  claiming: boolean;
  claimMsg: string;
  knownWords: number;
  continueItem?: { kind: "grammar" | "vocab"; id: string; title: string };
  onContinue: () => void;
  onSkip: () => void;
  onStart: () => void;
  onOpenTab: (tab: RoadmapTab) => void;
  onOpenTools: () => void;
  skin: import("./data/rewards").SkinKey | null;
  pet: { feeds: number; lastFedDate: string | null; seenLevel: number };
  challenge: { weekKey: string; kind: string; target: number; progress: number; claimed: boolean };
  onNotify: (msg: string) => void;
  onOpenProfile: () => void;
}) {
  const { lang } = props;
  const [chestShake, setChestShake] = useState<"daily" | "weekly" | null>(null);
  const tryClaim = (kind: "daily" | "weekly", ready: boolean, claimed: boolean) => {
    if (claimed || props.claiming) return;
    if (!ready) {
      setChestShake(kind);
      window.setTimeout(() => setChestShake((s) => (s === kind ? null : s)), 500);
      return;
    }
    props.onClaim(kind);
  };
  return (
    <>
      <section className="relative mt-3 overflow-hidden rounded-[2rem] bg-[var(--ink)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative z-10 p-6 sm:p-10">
            <p className="font-bold text-[#2dd4bf]">{props.greeting}，{props.name} 👋</p>
            <h1 className="font-display mt-2 text-[38px] leading-[1.12] text-white">
              {tx(lang, "按阶段学，", "Learn step by step,")}
              <br />
              <span className="text-[#2dd4bf]">{tx(lang, "一课一课记。", "one lesson at a time.")}</span>
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-[#c8d8d2]">
              {tx(
                lang,
                "语法按 CEFR 一级一级打地基，词汇按主题和等级两条线积累。每节课都有中文讲解、例句发音和限时测验，学完给你的种子树加 XP。",
                "Grammar follows CEFR levels; vocabulary grows along topics and levels. Every lesson has Chinese explanations, audio examples and timed quizzes that feed your seed tree with XP.",
              )}
            </p>
            <div className="mt-8 flex gap-6 sm:gap-8">
              <div>
                <p className="font-display text-4xl text-white">{GRAMMAR_101.length}</p>
                <p className="mt-1 text-sm text-[#9fb8b0]">{tx(lang, "节语法课", "grammar lessons")}</p>
              </div>
              <div className="border-l border-white/20 pl-6 sm:pl-8">
                <p className="font-display text-4xl text-white">{TOPIC_LESSONS.length}</p>
                <p className="mt-1 text-sm text-[#9fb8b0]">{tx(lang, "节词汇课", "vocabulary lessons")}</p>
              </div>
              <div className="border-l border-white/20 pl-6 sm:pl-8">
                <p className="font-display text-4xl text-white">CEFR</p>
                <p className="mt-1 text-sm text-[#9fb8b0]">A1 – C2</p>
              </div>
            </div>
            <button
              type="button"
              onClick={props.onStart}
              className="hover-lift mt-8 min-h-12 rounded-full bg-[var(--mustard)] px-7 py-3 text-lg font-black text-[var(--ink)]"
            >
              {tx(lang, "开始练习 →", "Start practising →")}
            </button>
          </div>
          <div className="relative min-h-56 lg:min-h-full">
            <img src={heroImg} alt="三名学生坐在书堆上学习英语，周围漂浮着单词卡片" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
        <TreeWidget xp={props.xp} streak={props.streak} studyDates={props.studyDates} totalXp={TOTAL_XP_FULL} skin={props.skin} />
      </section>

      {/* 学习伙伴豆豆 + 本周挑战 */}
      <section className="mt-4 grid items-start gap-4 lg:grid-cols-2">
        <PetCard xp={props.xp} pet={props.pet} studiedToday={props.studyDates.includes(todayStr())} onNotify={props.onNotify} />
        <ChallengeCard challenge={props.challenge} onNotify={props.onNotify} />
      </section>
      <button
        type="button"
        onClick={props.onOpenProfile}
        className="hover-lift mt-4 flex w-full items-center gap-3 rounded-[2rem] bg-[#fdf6d8] p-5 text-left shadow-sm"
        aria-label="去个人中心打开 XP 奖励商店和成就徽章墙"
      >
        <span className="text-3xl" aria-hidden>🎁</span>
        <span className="flex-1">
          <span className="font-display block text-xl text-[var(--ink)]">XP 奖励商店 · 成就徽章墙</span>
          <span className="text-sm text-[var(--dim)]">用学来的 XP 换提示卡、免错卡、种子树皮肤和头像框；徽章都挂在个人中心。</span>
        </span>
        <span className="font-black text-[var(--teal-dark)]" aria-hidden>→</span>
      </button>

      {/* 每日目标与宝箱 */}
      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[var(--surface)] p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-[var(--ink)]">今日目标</h2>
            <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--teal-dark)]">
              {props.goals.filter((g) => g.now >= g.target).length} / {props.goals.length}
            </span>
          </div>
          <ul className="mt-4 grid gap-2.5">
            {props.goals.map((g) => {
              const done = g.now >= g.target;
              return (
                <li key={g.label} className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${done ? "bg-[var(--teal)] text-white" : "bg-[#e8e6da] text-[var(--dim)]"}`}>
                    {done ? <span className="animate-check-pop">✓</span> : ""}
                  </span>
                  <span className={`flex-1 font-medium ${done ? "text-[var(--ink)]" : "text-[var(--dim)]"}`}>{g.label}</span>
                  <span className="text-sm font-bold text-[var(--dim)]">{g.now}/{g.target}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex items-center gap-3 rounded-3xl bg-[#fdf6d8] p-4">
            <span
              className={`inline-block text-4xl ${chestShake === "daily" ? "animate-shake" : props.goalsDone && !props.dailyClaimed ? "animate-chest-bounce" : ""}`}
              aria-hidden
            >
              🎁
            </span>
            <div className="flex-1">
              <p className="font-bold text-[var(--ink)]">每日宝箱</p>
              <p className="text-sm text-[var(--dim)]">
                {props.dailyClaimed ? "今日宝箱已开启，明天再来。" : props.goalsDone ? "5 个目标全部完成，可以开宝箱了！" : "完成全部 5 个目标即可开启。"}
              </p>
              {props.claimMsg ? <p className="text-sm font-bold text-[var(--teal-dark)]">{props.claimMsg}</p> : null}
            </div>
            <button
              type="button"
              disabled={props.dailyClaimed || props.claiming}
              aria-disabled={!props.goalsDone && !props.dailyClaimed}
              onClick={() => tryClaim("daily", props.goalsDone, props.dailyClaimed)}
              className={`hover-lift min-h-11 shrink-0 rounded-full bg-[var(--mustard)] px-5 py-2 font-black text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40 ${!props.goalsDone && !props.dailyClaimed ? "opacity-60" : ""}`}
            >
              开宝箱
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] bg-[var(--surface)] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-[var(--ink)]">继续学习</h2>
              <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--teal-dark)]">已记住 {props.knownWords} 词</span>
            </div>
            {props.continueItem ? (
              <>
                <p className="mt-3 leading-relaxed text-[var(--dim)]">
                  下一课：<span className="font-bold text-[var(--ink)]">{props.continueItem.title}</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={props.onContinue} className="hover-lift min-h-12 rounded-full bg-[var(--ink)] px-6 py-2.5 font-bold text-white">
                    继续 →
                  </button>
                  <button type="button" onClick={props.onSkip} className="min-h-10 px-2 font-bold text-[var(--teal-dark)] underline underline-offset-4">
                    跳过这一课
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-[var(--dim)]">全部课程都通过了，太厉害了！可以去历史页回顾错题，或重练拿星。</p>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-[2rem] bg-[var(--ink)] p-5 text-white sm:p-6">
            <span
              className={`inline-block text-4xl ${chestShake === "weekly" ? "animate-shake" : props.weekStudied >= 5 && !props.weeklyClaimed ? "animate-chest-bounce" : ""}`}
              aria-hidden
            >
              🧰
            </span>
            <div className="flex-1">
              <p className="font-display text-xl">周宝箱</p>
              <p className="text-sm text-[#c8d8d2]">
                本周已学习 {props.weekStudied} / 5 天{props.weeklyClaimed ? " · 已领取" : props.weekStudied >= 5 ? " · 可以开启了" : " · 满 5 天开启"}
              </p>
            </div>
            <button
              type="button"
              disabled={props.weeklyClaimed || props.claiming}
              aria-disabled={props.weekStudied < 5 && !props.weeklyClaimed}
              onClick={() => tryClaim("weekly", props.weekStudied >= 5, props.weeklyClaimed)}
              className={`hover-lift min-h-11 shrink-0 rounded-full bg-[var(--mustard)] px-5 py-2 font-black text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40 ${props.weekStudied < 5 && !props.weeklyClaimed ? "opacity-60" : ""}`}
            >
              开周宝箱
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[38px] leading-[1.1] text-[var(--ink)] sm:text-[52.48px]">{tx(lang, "选择学习内容", "Choose what to learn")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ContentCard img={cardGrammarImg} alt="学生坐在书堆上，指着写有主语、动词、宾语的讲解板" title={tx(lang, "按 CEFR 分级的语法", "Grammar by CEFR")} desc="101 节课分布在 A1 至 C2 六个级别。每节课先学习简明理论，再做简单、中等、困难三档测验。" onOpen={() => props.onOpenTab("grammar")} />
          <ContentCard img={cardVocabTopicImg} alt="学生举着单词卡，周围是教育、健康、环境、科技主题卡片" title={tx(lang, "按主题分类的词汇", "Vocabulary by topic")} desc="5000 多个学术词汇，分为 25 个雅思主题。用带中文释义、例句和发音的词卡学习。" onOpen={() => props.onOpenTab("topic")} />
          <ContentCard img={cardVocabCefrImg} alt="学生指着画有苹果的单词卡，卡片下方有 A1 到 C2 等级标签" title={tx(lang, "按 CEFR 分级的词汇", "Vocabulary by CEFR")} desc="CEFR 标准的基础词汇，按 A1 至 C2 六级排列，适合初学者逐步打好词汇基础。" onOpen={() => props.onOpenTab("cefr")} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[38px] leading-[1.1] text-[var(--ink)] sm:text-[52.48px]">工具</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ContentCard img={cardWritingImg} alt="学生抱着写字板批改作文，周围是带对勾的作文纸" title={tx(lang, "雅思写作 Task 2 批改", "IELTS Writing Task 2 review")} desc="粘贴题目和作文，按四项标准得到预估 Band 分、需要修改的地方、建议词汇表，以及基于你的作文写成的修改稿。" onOpen={props.onOpenTools} />
        </div>
      </section>

      <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[var(--ink)]">
        <div className="grid items-end lg:grid-cols-[1.1fr_1fr_auto]">
          <div className="p-6 sm:p-10">
            <h2 className="font-display text-[26.88px] leading-[1.2] text-white">
              开始与 ForumFlash 一起踏上
              <br />
              英语学习之旅
            </h2>
            <p className="mt-3 max-w-sm text-[#c8d8d2]">免费、无需注册。每天 15 分钟，看着种子长成参天大树。</p>
            <button type="button" onClick={props.onStart} className="hover-lift mt-6 min-h-12 rounded-full bg-[var(--mustard)] px-7 py-3 text-lg font-black text-[var(--ink)]">
              开始练习 →
            </button>
          </div>
          <div className="relative hidden h-64 lg:block">
            <img src={footerGuideImg} alt="学生举着 Aa 单词卡指向前方" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="p-6 text-left sm:p-10 lg:text-right">
            <p className="font-display text-2xl leading-tight text-white">
              The Forum
              <br />
              Center
            </p>
            <p className="mt-4 text-sm text-[#9fb8b0]">闪记英语 · FLASH ENGLISH</p>
            <p className="mt-1 text-sm text-[#9fb8b0]">全课程共 {TOTAL_XP_FULL} XP</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContentCard({ img, alt, title, desc, onOpen }: { img: string; alt: string; title: string; desc: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`打开：${title}`}
      className="group hover-lift overflow-hidden rounded-[27px] border border-[#dce6e5] bg-[#fffcf9] text-left transition-[transform,box-shadow,border-color] duration-[250ms] hover:border-[var(--teal)]"
    >
      <div className="m-[10px] mb-0 aspect-square overflow-hidden bg-[#edf3ee]">
        <img src={img} alt={alt} className="h-full w-full object-cover object-top" />
      </div>
      <div className="px-[22px] pb-5 pt-4">
        <h3 className="font-display mb-[11px] mt-[2px] text-[32.64px] leading-[1.18] text-[#093b3c]">{title}</h3>
        <p className="mb-[18px] text-[13.056px] leading-[1.6] text-[#657578]">{desc}</p>
        <span className="block text-right text-[26px] leading-[26px] text-[#2ac8bb]" aria-hidden>→</span>
      </div>
    </button>
  );
}

// ---------------- 学习路径（蛇形） ----------------

interface PathNode {
  id: string;
  title: string;
  sub: string;
}

function SnakePath({
  nodes,
  statsMap,
  passed,
  unlocked,
  onOpen,
  onLocked,
}: {
  nodes: PathNode[];
  statsMap: Map<string, LessonStats>;
  passed: (id: string) => boolean;
  unlocked: (idx: number) => boolean;
  onOpen: (id: string) => void;
  onLocked?: () => void;
}) {
  const firstOpen = nodes.findIndex((n, i) => unlocked(i) && !passed(n.id));
  const passedCount = nodes.filter((n) => passed(n.id)).length;
  const linePct = nodes.length > 1 ? Math.min(100, (passedCount / (nodes.length - 1)) * 100) : passedCount > 0 ? 100 : 0;
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [hintId, setHintId] = useState<string | null>(null);

  const handleClick = (node: PathNode, i: number) => {
    if (unlocked(i)) {
      onOpen(node.id);
      return;
    }
    setShakeId(node.id);
    setHintId(node.id);
    onLocked?.();
    window.setTimeout(() => setShakeId((s) => (s === node.id ? null : s)), 500);
    window.setTimeout(() => setHintId((h) => (h === node.id ? null : h)), 2800);
  };

  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute bottom-8 left-1/2 top-8 -translate-x-1/2" aria-hidden>
        <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 border-l-[3px] border-dashed border-[var(--mint-deep)]" />
        <div
          className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[var(--teal)] transition-[height] duration-700 ease-out"
          style={{ height: `${linePct}%` }}
        />
      </div>
      <ol className="relative grid gap-7">
        {nodes.map((node, i) => {
          const isPassed = passed(node.id);
          const isUnlocked = unlocked(i);
          const isCurrent = i === firstOpen;
          const stars = statsMap.get(node.id)?.stars ?? 0;
          const side = i % 2 === 0;
          return (
            <li
              key={node.id}
              className={`animate-node-in flex items-center gap-4 ${side ? "flex-row" : "flex-row-reverse"}`}
              style={{ animationDelay: `${Math.min(i * 60, 660)}ms` }}
            >
              <div className={`w-[calc(50%-2.5rem)] ${side ? "text-right" : "text-left"}`}>
                <p className={`font-bold leading-snug ${isUnlocked ? "text-[var(--ink)]" : "text-[var(--dim)]"}`}>{node.title}</p>
                <p className="text-sm text-[var(--dim)]">{node.sub}</p>
                {stars > 0 ? <p className="text-[var(--mustard)]" aria-label={`已获得 ${stars} 星`}>{"★".repeat(stars)}</p> : null}
                {hintId === node.id ? (
                  <p className="animate-slide-up mt-1 text-sm font-bold text-[var(--coral)]" role="status">
                    先完成前一课，这一课就会解锁
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => handleClick(node, i)}
                aria-disabled={!isUnlocked}
                aria-label={
                  isPassed
                    ? `打开课程：${node.title}，已完成${stars > 0 ? `，${stars} 星` : ""}`
                    : isCurrent
                      ? `打开课程：${node.title}，当前课程`
                      : isUnlocked
                        ? `打开课程：${node.title}`
                        : `课程未解锁：${node.title}，需先完成前一课`
                }
                className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-black ${
                  shakeId === node.id ? "animate-shake" : ""
                } ${
                  isPassed
                    ? "bg-[#0b2e2a] text-white"
                    : isCurrent
                      ? "animate-pulse-ring border-4 border-[var(--teal)] bg-white text-[var(--teal-dark)]"
                      : isUnlocked
                        ? "border-4 border-[var(--mint-deep)] bg-white text-[var(--dim)]"
                        : "bg-[#ddd9c8] text-[#8f8a76]"
                }`}
              >
                {isPassed ? (
                  <span className="animate-check-pop">✓</span>
                ) : isCurrent ? (
                  "▶"
                ) : isUnlocked ? (
                  i + 1
                ) : (
                  "🔒"
                )}
              </button>
              <div className="w-[calc(50%-2.5rem)]" aria-hidden />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const GRAMMAR_LEVEL_NAMES: Record<CefrLevel, string> = {
  A1: "基础级", A2: "初级", B1: "中级", B2: "中高级", C1: "高级", C2: "精通级",
};

const GRAMMAR_LEVEL_INTROS: Record<CefrLevel, { summary: string; heading: string; exam: string }> = {
  A1: { summary: "识别句子成分，表达熟悉的日常需求。", heading: "英语句子基础", exam: "考查简单句、be 动词、一般现在时和日常表达结构。" },
  A2: { summary: "运用基本时态、建议、比较和连接观点的方式。", heading: "常用语法结构", exam: "综合考查过去、将来、比较、数量词和现在完成时。" },
  B1: { summary: "用更丰富的句式表达经历、观点和计划。", heading: "拓展语法表达", exam: "综合考查本阶段的语法知识。" },
  B2: { summary: "用准确的结构组织复杂想法。", heading: "进阶句式", exam: "综合考查本阶段的语法知识。" },
  C1: { summary: "理解并运用更精细的语法差别。", heading: "高级语法表达", exam: "综合考查本阶段的语法知识。" },
  C2: { summary: "灵活运用英语语法表达细微意义。", heading: "精准语法表达", exam: "综合考查本阶段的语法知识。" },
};

const A1_GRAMMAR_CATEGORIES = [
  "词类", "词类", "词类", "词类", "词类", "词类", "冠词", "数量词", "词类", "词类",
  "介词", "时态", "动词形式", "时态", "句子结构", "句子结构", "句子结构", "句子结构", "情态动词",
] as const;

function GrammarRoadPath({
  level, lessons, statsMap, passed, unlocked, onOpen, onLocked,
}: {
  level: CefrLevel;
  lessons: GrammarLesson[];
  statsMap: Map<string, LessonStats>;
  passed: (id: string) => boolean;
  unlocked: (idx: number) => boolean;
  onOpen: (id: string) => void;
  onLocked: () => void;
}) {
  const firstOpen = lessons.findIndex((lesson, i) => unlocked(i) && !passed(lesson.id));
  const [hintId, setHintId] = useState<string | null>(null);

  const open = (lesson: GrammarLesson, index: number) => {
    if (unlocked(index)) {
      onOpen(lesson.id);
    } else {
      setHintId(lesson.id);
      onLocked();
      window.setTimeout(() => setHintId((current) => current === lesson.id ? null : current), 2800);
    }
  };

  return (
    <div className="ff-level-road">
      {lessons.map((lesson, index) => {
        const complete = passed(lesson.id);
        const available = unlocked(index);
        const current = index === firstOpen;
        const stars = statsMap.get(lesson.id)?.stars ?? 0;
        const category = level === "A1" ? A1_GRAMMAR_CATEGORIES[index] : "语法";
        return (
          <div
            key={lesson.id}
            className={`ff-road-row ${index % 2 === 0 ? "ff-road-right" : "ff-road-left"} ${available ? "" : "ff-road-locked"}`}
            style={{ animationDelay: `${Math.min(index * 60, 660)}ms` }}
          >
            <span className="ff-road-link" aria-hidden="true" />
            <span className="ff-road-turn" aria-hidden="true" />
            <button
              type="button"
              className={`ff-level-node ${complete ? "ff-complete" : ""} ${current ? "ff-current" : ""}`}
              onClick={() => open(lesson, index)}
              aria-label={`${String(index + 1).padStart(2, "0")} ${lesson.titleCn}，${complete ? "已完成" : available ? "可学习" : "待解锁"}，${stars}/3 星`}
            >
              <span>{complete ? "✓" : String(index + 1).padStart(2, "0")}</span>
              {available ? <small className="ff-node-stars" aria-label={`${stars}/3 星`}>{[0, 1, 2].map((n) => <i key={n} className={n < stars ? "ff-star-on" : ""}>★</i>)}</small> : <small className="ff-node-locked">待解锁</small>}
            </button>
            <button
              type="button"
              className={`ff-node-copy ${complete ? "ff-complete" : ""}`}
              onClick={() => open(lesson, index)}
              aria-disabled={!available}
            >
              <span>{category}</span>
              <strong>{lesson.titleEn}</strong>
              <em>{complete ? "查看结果 · 再学一遍 →" : available ? "查看课程信息 →" : "完成前一课后解锁"}</em>
              {hintId === lesson.id ? <small role="status">先完成前一课，这一课就会解锁</small> : null}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function RoadmapView(props: {
  tab: RoadmapTab;
  onTab: (t: RoadmapTab) => void;
  grammarLevel: CefrLevel;
  onGrammarLevel: (l: CefrLevel) => void;
  cefrLevel: CefrLevel;
  onCefrLevel: (l: CefrLevel) => void;
  topicId: string;
  onTopic: (id: string) => void;
  statsMap: Map<string, LessonStats>;
  passed: (id: string) => boolean;
  grammarUnlocked: (level: CefrLevel, idx: number) => boolean;
  topicUnlocked: (tid: string, idx: number) => boolean;
  levelUnlocked: (lv: CefrLevel) => boolean;
  topicPlacementUnlocked: (tid: string) => boolean;
  onOpenGrammar: (id: string) => void;
  onOpenVocab: (id: string) => void;
  onPlacementGrammar: (lv: CefrLevel) => void;
  onPlacementTopic: (tid: string) => void;
  onLocked: () => void;
}) {
  const [guide, setGuide] = useState(false);
  const tabs: { key: RoadmapTab; label: string }[] = [
    { key: "grammar", label: "语法" },
    { key: "topic", label: "词汇主题" },
    { key: "cefr", label: "词汇 CEFR" },
  ];
  const guideText =
    props.tab === "grammar"
      ? "语法按 A1→C2 逐级推进：完成前一课（测验达到 80 分）才解锁下一课，高级别要等前一级学完。不想等？每个级别都有越级考试：60 题答对 48 题，直接解锁该级全部课程与难度（不点亮星级）。点任意已解锁节点打开课程面板，先看理论再做题。"
      : props.tab === "topic"
        ? "每个主题有 10 课，词数逐课递增。每课先学完词卡（学完即通过），再解锁练习、听写与发音。主题内逐课解锁；主题越级考试 30 题（25 道练习与填空 + 5 道听写），答对 25 题解锁本主题全部课程（不点亮星级）。"
        : "CEFR 词汇按 A1→C2 分级，各级之间不锁定，可直接切换到任意级别。每课先学完词卡，再做练习与听写。适合按自己的水平挑着学。";

  return (
    <div>
      {props.tab === "grammar" ? (
        <div className="ff-map-top">
          <div>
            <p className="ff-map-eyebrow">语法学习路径</p>
            <h1 className="font-display">{props.grammarLevel} 语法</h1>
            <p>{GRAMMAR_LEVEL_INTROS[props.grammarLevel].summary}</p>
          </div>
          <div className="ff-map-top-actions">
            <div className="ff-map-tabs" role="tablist" aria-label="学习路径切换">
              {tabs.map((t) => <button key={t.key} type="button" role="tab" aria-selected={props.tab === t.key} onClick={() => props.onTab(t.key)}>{t.label}</button>)}
            </div>
            <button type="button" className="ff-map-guide" onClick={() => setGuide(true)}>使用指南</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display mt-2 text-3xl text-[var(--ink)] sm:text-4xl">学习路径</h1>
            <button type="button" onClick={() => setGuide(true)} className="min-h-10 rounded-full bg-[var(--mint)] px-4 py-1.5 font-bold text-[var(--teal-dark)]">使用指南</button>
          </div>
          <div className="mt-4 flex gap-2" role="tablist" aria-label="学习路径切换">
            {tabs.map((t) => <button key={t.key} type="button" role="tab" aria-selected={props.tab === t.key} onClick={() => props.onTab(t.key)} className={`min-h-11 flex-1 rounded-full px-4 py-2 font-bold sm:flex-none sm:px-6 ${props.tab === t.key ? "bg-[var(--ink)] text-white" : "border-2 border-[var(--border)] bg-white text-[var(--dim)]"}`}>{t.label}</button>)}
          </div>
        </>
      )}

      {props.tab === "grammar" && (
        <div className="ff-map-layout">
          <aside className="ff-world-sidebar" aria-label="选择学习阶段">
            <div className="ff-world-head">
              <span>CEFR 学习路径</span>
              <h2 className="font-display">选择学习阶段</h2>
              <p>从 A1 到 C2 的六个等级</p>
            </div>
            <div className="ff-world-list" role="tablist" aria-label="语法级别">
              {CEFR_LEVELS.map((lv, index) => {
                const lessons = grammarByLevel101(lv);
                const done = lessons.filter((lesson) => props.passed(lesson.id)).length;
                const accessible = props.grammarUnlocked(lv, 0) || props.grammarLevel === lv;
                return (
                  <button key={lv} type="button" role="tab" aria-selected={props.grammarLevel === lv} disabled={!accessible} onClick={() => props.onGrammarLevel(lv)} className={props.grammarLevel === lv ? "ff-world-active" : ""}>
                    <span className={`ff-world-badge ff-world-badge-${lv.toLowerCase()}`}>{lv}</span>
                    <span className="ff-world-copy"><strong>{GRAMMAR_LEVEL_NAMES[lv]}</strong><small>{done}/{lessons.length} 课已完成</small><i style={{ width: `${Math.round(done / lessons.length * 100)}%` }} /></span>
                    <span className="ff-world-end">{accessible ? props.grammarLevel === lv ? "→" : String(index + 1).padStart(2, "0") : "锁定"}</span>
                  </button>
                );
              })}
            </div>
          </aside>
          <section className="ff-level-map" aria-label={`${props.grammarLevel} 语法课程地图`}>
            <div className="ff-level-heading">
              <span>{props.grammarLevel}</span>
              <div><h2 className="font-display">{GRAMMAR_LEVEL_INTROS[props.grammarLevel].heading}</h2><p>本阶段有 {grammarByLevel101(props.grammarLevel).length} 个语法主题</p></div>
            </div>
            <div className="ff-level-exam">
              <div><h3 className="font-display">{props.grammarLevel} 知识测验</h3><p>{GRAMMAR_LEVEL_INTROS[props.grammarLevel].exam}</p></div>
              <button type="button" onClick={() => props.onPlacementGrammar(props.grammarLevel)}>参加越级测验 <span>→</span></button>
            </div>
            <GrammarRoadPath
              level={props.grammarLevel}
              lessons={grammarByLevel101(props.grammarLevel)}
              statsMap={props.statsMap}
              passed={props.passed}
              unlocked={(index) => props.grammarUnlocked(props.grammarLevel, index)}
              onOpen={props.onOpenGrammar}
              onLocked={props.onLocked}
            />
          </section>
        </div>
      )}

      {props.tab === "topic" && (
        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="词汇主题">
            {TOPIC_DEFS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={props.topicId === t.id}
                onClick={() => props.onTopic(t.id)}
                className={`min-h-11 shrink-0 rounded-full px-4 py-2 font-bold ${props.topicId === t.id ? "bg-[var(--ink)] text-white" : "border-2 border-[var(--border)] bg-white text-[var(--ink)]"}`}
              >
                {t.emoji} {t.cn}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[var(--mint)] p-4">
            <p className="font-medium text-[var(--ink)]">
              {TOPIC_DEFS.find((t) => t.id === props.topicId)?.cn} · 10 课 · 词数逐课递增
              {props.topicPlacementUnlocked(props.topicId) ? " · 已通过越级考试解锁" : ""}
            </p>
            <button
              type="button"
              onClick={() => props.onPlacementTopic(props.topicId)}
              className="min-h-10 rounded-full bg-[var(--ink)] px-4 py-1.5 font-bold text-white"
            >
              主题越级考试（30 题）
            </button>
          </div>
          <div className="mt-8">
            <SnakePath
              nodes={topicLessons(props.topicId).map((s) => ({ id: s.id, title: s.titleCn, sub: `${s.words.length} 个词` }))}
              statsMap={props.statsMap}
              passed={props.passed}
              unlocked={(idx) => props.topicUnlocked(props.topicId, idx)}
              onOpen={props.onOpenVocab}
              onLocked={props.onLocked}
            />
          </div>
        </div>
      )}

      {props.tab === "cefr" && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="CEFR 级别">
            {CEFR_LEVELS.map((lv) => {
              const lessons = cefrLessons(lv);
              const done = lessons.filter((l) => props.passed(l.id)).length;
              return (
                <button
                  key={lv}
                  type="button"
                  role="tab"
                  aria-selected={props.cefrLevel === lv}
                  onClick={() => props.onCefrLevel(lv)}
                  className={`min-h-11 rounded-2xl px-4 py-2 font-bold ${props.cefrLevel === lv ? "bg-[var(--ink)] text-white" : "border-2 border-[var(--border)] bg-white text-[var(--ink)]"}`}
                >
                  {lv} <span className="text-sm font-medium opacity-80">{done}/{lessons.length} 课</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[var(--dim)]">
            {props.cefrLevel === "A1"
              ? "各级之间不锁定，点任意级别直接切换。A1 内部按顺序推进：完成前一课解锁下一课；每课先学完词卡解锁练习，做完练习解锁听写。"
              : "各级之间不锁定，点任意级别直接切换。每课先学完词卡，再解锁练习与听写。"}
          </p>
          <div className="mt-6">
            <SnakePath
              nodes={cefrLessons(props.cefrLevel).map((s) => ({ id: s.id, title: s.titleCn, sub: `${s.words.length} 个词` }))}
              statsMap={props.statsMap}
              passed={props.passed}
              unlocked={(idx) => {
                if (props.cefrLevel !== "A1" || idx === 0) return true;
                const prev = cefrLessons("A1")[idx - 1];
                return prev ? props.passed(prev.id) : false;
              }}
              onOpen={props.onOpenVocab}
              onLocked={props.onLocked}
            />
          </div>
        </div>
      )}

      {guide ? (
        <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="学习路径使用指南">
          <div className="animate-modal-in w-full max-w-md rounded-[2rem] bg-[var(--surface)] p-6">
            <h2 className="font-display text-2xl text-[var(--ink)]">使用指南</h2>
            <p className="mt-3 leading-relaxed text-[var(--dim)]">{guideText}</p>
            <button type="button" onClick={() => setGuide(false)} className="mt-5 min-h-11 w-full rounded-full bg-[var(--ink)] px-5 py-2 font-bold text-white">
              知道了
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
