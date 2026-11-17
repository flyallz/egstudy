# 闪记英语 — 当前源码快照

> 本地修订状态：请先看 [现有内容核对报告.md](./现有内容核对报告.md)。目前尚未达到与原网站 100% 一致；源码修订后尚未重新构建 `已构建成品-dist/`。

打包时间：2026-11-16（按站点最后更新 2026-11-15 18:17 的版本）
原站：ForumFlashStudy 中文版，站内 slug：ying-wen-xue-xi-wang-zhan

## 里面有什么

- `client/` — 前端源码（React + TypeScript）
  - `client/src/App.tsx` 主应用
  - `client/src/views/` 各页面：LessonViews、VocabViews、Quiz、Review、History、Materials、Tools、Profile
  - `client/src/components/` 组件：widgets、Rewards（徽章墙 / XP 商店 / 每周挑战 / 学习伙伴豆豆）
  - `client/src/data/catalog.ts` 课程目录与题库数据（当前最大文件，含 CEFR 词汇 A1 第 1–42 课）
  - `client/src/data/content.ts` 语法理论等内容
  - `client/src/data/rewards.ts` 奖励机制数据
  - `client/src/assets/` 图片素材（卡片图、主图、豆豆形象等）
  - `client/index.html`、`client/build.mjs`、`client/tsconfig.json`
- `server/` — 后端源码
  - `server/src/actions.ts`、`server/src/schema.ts`、`server/tsconfig.json`
- `drizzle/` — 数据库迁移（0001–0004，含奖励 / 徽章 / 商店 / 每周挑战 / 学习伙伴表）
- `package.json`、`bun.lock`、`bunfig.toml`、`tsconfig.base.json` — 依赖与构建配置
- `space.json`、`AGENTS.md`、`DATA-PLAN.md`、`icon.webp` — 站点配置、说明与数据计划
- `已构建成品-dist/` — 已构建好的前端成品（index.html + assets），可直接用静态服务器打开看效果；注意完整功能（进度、XP 等）需要配合后端与数据库运行，单独打开静态文件不等于线上完整站点。

## 当前进度（打包时）

- 语法 A1：19 课理论已翻进站内
- CEFR 词汇 A1：第 1–42 课已翻进站内（每课简单档练习 16 题、听写 10 词）；第 43–45 课未做
- 语法 A2–C2 共 82 课理论仍为模板内容，未从原站逐课提取
- CEFR 词汇中等 / 困难档、发音部分未补；部分语法练习题有缺口，已在站内标待补
- 理论页版式尚未按原站双栏版式还原（已约定额度刷新后再改）

## 没打包进去的（不是源码）

- `node_modules/`、`.bun-cache/` — 依赖缓存，可按 `package.json` / `bun.lock` 重新安装
- `app.db` 及 `-shm` / `-wal` — 运行时学习进度数据库，属于个人学习数据，不算源码
- 构建缓存 `.tsbuildinfo`、`audits/`、`.harness/`、`.space-build*/` — 平台运行 / 审计文件

## 怎么跑

在本目录执行：先按 `package.json` 用 Bun 安装依赖，再 `bun run build` 构建（`build:client` 构建前端、`build:server` 构建后端）。本站原本运行在 Muse Spaces 的 TypeScript 运行时上，脱离该环境单独部署时，后端接口与数据库需要按 `server/` 与 `drizzle/` 自行接好。
