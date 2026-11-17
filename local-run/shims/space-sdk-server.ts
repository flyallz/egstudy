// 本地等价替换 @hatch/space-sdk（server 端）。
// actions.ts 只用 defineAction、z 以及两个纯类型，因此这里保持接口形状即可。
import { z } from "zod";

export { z };

export type Ctx = {
  db: <T>() => any;
};

export type ActionsModule = Record<string, any>;

export function defineAction<T>(definition: T): T {
  return definition;
}
