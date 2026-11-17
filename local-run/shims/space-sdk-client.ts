// 本地等价替换 @hatch/space-sdk/client。
// 原 SDK 仅提供两样东西：共享的 QueryClient，以及把方法调用转成 POST ./actions 的 RPC 代理。
import { QueryClient } from "@tanstack/react-query";

export const spaceQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export type ApiRequest<A, K extends keyof A> = A[K] extends { request: infer R } ? R : never;
export type ApiResponse<A, K extends keyof A> = A[K] extends { response: infer R } ? R : A[K] extends { handler: (...a: any[]) => Promise<infer R> } ? R : never;

export function createActionClient<T extends Record<string, any>>(): T {
  return new Proxy({} as T, {
    get(_target, action: string) {
      return async (args: unknown) => {
        const res = await fetch("./actions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action, args: args ?? {} }),
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok || payload.error) {
          throw new Error(payload.error || `action ${action} failed (HTTP ${res.status})`);
        }
        return payload.data;
      };
    },
  });
}
