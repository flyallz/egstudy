import { useEffect, useState } from "react";

export type FontSize = "小" | "中" | "大";
export type ThemeMode = "浅色" | "深色" | "跟随系统";
export type Lang = "中文" | "英文";

export interface Settings {
  fontSize: FontSize;
  theme: ThemeMode;
  lang: Lang;
}

const KEY = "flash-english-settings";
const DEFAULTS: Settings = { fontSize: "中", theme: "跟随系统", lang: "中文" };

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      fontSize: parsed.fontSize === "小" || parsed.fontSize === "大" ? parsed.fontSize : "中",
      theme: parsed.theme === "浅色" || parsed.theme === "深色" ? parsed.theme : "跟随系统",
      lang: parsed.lang === "英文" ? "英文" : "中文",
    };
  } catch {
    return DEFAULTS;
  }
}

export function applySettings(s: Settings) {
  const root = document.documentElement;
  root.style.fontSize = s.fontSize === "小" ? "15px" : s.fontSize === "大" ? "18px" : "16px";
  const dark =
    s.theme === "深色" ||
    (s.theme === "跟随系统" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "dark" : "light";
}

export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);
  useEffect(() => {
    if (settings.theme !== "跟随系统") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applySettings(settings);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [settings]);
  return [settings, (patch) => setSettings((s) => ({ ...s, ...patch }))];
}

/** 界面文案双语切换：中文界面返回 zh，英文界面返回 en。 */
export function tx(lang: Lang, zh: string, en: string): string {
  return lang === "英文" ? en : zh;
}
