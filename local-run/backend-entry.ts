// 单一入口：把原始 server 业务代码与 schema 打进同一个 bundle，
// 确保 Drizzle 表对象只有一份实例。
export { Actions } from "../server/src/actions";
export * as schema from "../server/src/schema";
