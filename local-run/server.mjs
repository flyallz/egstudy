import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { Actions, schema } from "./backend/backend.bundle.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

// 使用 Node 22 内置的 SQLite（无需原生编译），通过 drizzle sqlite-proxy 桥接。
const sqlite = new DatabaseSync(path.join(here, "app.db"));
sqlite.exec("PRAGMA journal_mode = WAL;");
sqlite.exec(`
CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY, xp INTEGER NOT NULL DEFAULT 0, streak INTEGER NOT NULL DEFAULT 0, last_study_date TEXT);
CREATE TABLE IF NOT EXISTS study_days (date TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS lesson_progress (lesson_id TEXT PRIMARY KEY, kind TEXT NOT NULL, best_score INTEGER NOT NULL DEFAULT 0, xp_earned INTEGER NOT NULL DEFAULT 0, completed_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS review_marks (word_key TEXT PRIMARY KEY, status TEXT NOT NULL, updated_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, lesson_id TEXT NOT NULL, kind TEXT NOT NULL, title TEXT NOT NULL, difficulty TEXT NOT NULL DEFAULT '', total INTEGER NOT NULL DEFAULT 0, answered INTEGER NOT NULL DEFAULT 0, correct INTEGER NOT NULL DEFAULT 0, score INTEGER NOT NULL DEFAULT 0, stars INTEGER NOT NULL DEFAULT 0, interrupted INTEGER NOT NULL DEFAULT 0, detail TEXT NOT NULL DEFAULT '[]', created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS unlocks (key TEXT PRIMARY KEY, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS review_deck (word_key TEXT PRIMARY KEY, word TEXT NOT NULL, phonetic TEXT NOT NULL DEFAULT '', pos TEXT NOT NULL DEFAULT '', meaning TEXT NOT NULL DEFAULT '', example TEXT NOT NULL DEFAULT '', example_cn TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT 'added', created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS activity_events (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, type TEXT NOT NULL, amount INTEGER NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS chest_claims (key TEXT PRIMARY KEY, xp_awarded INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY, name TEXT NOT NULL DEFAULT '学习者', email TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS badge_unlocks (key TEXT PRIMARY KEY, unlocked_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS inventory (item_key TEXT PRIMARY KEY, quantity INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS pet_state (id INTEGER PRIMARY KEY, feeds INTEGER NOT NULL DEFAULT 0, last_fed_date TEXT, seen_level INTEGER NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS writing_history (id INTEGER PRIMARY KEY AUTOINCREMENT, prompt TEXT NOT NULL, essay TEXT NOT NULL, overall_band REAL NOT NULL, summary TEXT NOT NULL, created_at INTEGER NOT NULL);
`);

// sqlite-proxy 回调：method 为 run 时返回空 rows，其余返回查询结果行。
const db = drizzle(async (sql, params, method) => {
  const stmt = sqlite.prepare(sql);
  if (method === "run") {
    stmt.run(...params);
    return { rows: [] };
  }
  // node:sqlite 的 .all() 返回对象数组，而 drizzle sqlite-proxy 期望按列顺序的数组。
  // 键顺序与 SELECT 列顺序一致，转成 Object.values() 数组。
  const objects = stmt.all(...params);
  const asArrays = objects.map((row) => Object.values(row));
  // 'get' 期望单行的值数组；'all'/'values' 期望行数组。
  const rows = method === "get" ? (asArrays[0] ?? []) : asArrays;
  return { rows };
}, { schema });

// 平台上下文的本地实现。
// gradeWriting 需要 inference.complete；这里给出结构完整的本地启发式评分，
// 保证功能链路可跑通（不联网、不调用外部模型）。
function localInference(prompt) {
  const essayMatch = prompt.match(/考生作文：\s*([\s\S]*?)\s*评分要求：/);
  const essay = (essayMatch?.[1] ?? "").trim();
  const words = essay ? essay.split(/\s+/).length : 0;
  const sentences = (essay.match(/[.!?]+/g) ?? []).length || 1;
  const avgLen = words / sentences;
  const band = Math.max(4, Math.min(8.5, 5 + avgLen / 12 + Math.min(words, 320) / 400));
  const round05 = (n) => Math.round(n * 2) / 2;
  const overall = round05(band);
  return {
    overallBand: overall,
    taskResponse: round05(band - 0.5),
    coherenceCohesion: round05(band),
    lexicalResource: round05(band - 0.5),
    grammarAccuracy: round05(band - 1),
    summary: `本地启发式批改：作文约 ${words} 词、${sentences} 句，平均句长 ${avgLen.toFixed(1)} 词。预估 Band ${overall}。这是离线占位评分，结构与线上一致；如需真实的雅思评分，请接入模型服务。`,
    strengths: ["观点表达完整", "段落结构清晰", "使用了较多连接词"],
    improvements: ["可增加复杂句式", "注意冠词与介词搭配", "举例可以更具体"],
    corrections: essay
      ? [{ original: essay.split(/(?<=[.!?])\s+/)[0]?.slice(0, 160) ?? "", corrected: "建议：简化主干、确保主谓一致并补充支撑细节。", note: "句首过长时先拆分，再逐步合并。" }]
      : [],
    rewrite: essay || "（本地占位）请提交 250 词以上的作文以获得改写示例。",
  };
}

const ctx = {
  db: () => db,
  invalidateQueries: () => {},
  inference: { complete: async (prompt) => localInference(prompt) },
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  const urlPath = (req.url || "/").split("?")[0];

  // 静态资源：由 Vite 构建出的最新前端产物。
  if (req.method === "GET" && urlPath !== "/actions") {
    const dist = path.join(here, "dist-client");
    const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const target = path.resolve(dist, rel);
    if (!target.startsWith(dist) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      // SPA 回退到 index.html。
      const fallback = path.join(dist, "index.html");
      if (fs.existsSync(fallback)) {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end(fs.readFileSync(fallback));
      } else {
        res.writeHead(404);
        res.end("not found");
      }
      return;
    }
    const ext = path.extname(target).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".webp": "image/webp",
      ".png": "image/png",
      ".woff2": "font/woff2",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml",
    };
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    res.end(fs.readFileSync(target));
    return;
  }

  if (urlPath !== "/actions" || req.method !== "POST") {
    res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "not found" }));
    return;
  }
  let raw = "";
  for await (const chunk of req) raw += chunk;
  try {
    const { action, args } = JSON.parse(raw || "{}");
    const definition = Actions[action];
    if (!definition) throw new Error(`未知接口: ${action}`);
    const parsed = definition.request ? definition.request.parse(args ?? {}) : args ?? {};
    const data = await definition.handler(ctx, parsed);
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ data }));
  } catch (err) {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: err?.message ?? String(err) }));
  }
});

const PORT = Number(process.env.PORT ?? 60002);
server.listen(PORT, "127.0.0.1", () => {
  console.log(`ForumFlash 最新源码站点已启动: http://127.0.0.1:${PORT}/`);
  console.log(`后端接口: http://127.0.0.1:${PORT}/actions`);
});
