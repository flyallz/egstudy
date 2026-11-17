import { useEffect, useState } from "react";
import type { FrameKey, SkinKey } from "./data/rewards";

// 已换上的种子树皮肤 / 头像框（装扮选择存在本机，拥有关系以服务端背包为准）。
export interface Appearance {
  skin: SkinKey | null;
  frame: FrameKey | null;
}

const KEY = "flash-english-appearance";
const SKINS: SkinKey[] = ["sunset", "forest", "grape"];
const FRAMES: FrameKey[] = ["gold", "leaf", "star"];

function loadAppearance(): Appearance {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { skin: null, frame: null };
    const parsed = JSON.parse(raw) as Partial<Appearance>;
    return {
      skin: parsed.skin && SKINS.includes(parsed.skin) ? parsed.skin : null,
      frame: parsed.frame && FRAMES.includes(parsed.frame) ? parsed.frame : null,
    };
  } catch {
    return { skin: null, frame: null };
  }
}

export function useAppearance(): [Appearance, (patch: Partial<Appearance>) => void] {
  const [appearance, setAppearance] = useState<Appearance>(() => loadAppearance());
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(appearance));
    } catch {
      /* ignore */
    }
  }, [appearance]);
  return [appearance, (patch) => setAppearance((a) => ({ ...a, ...patch }))];
}
