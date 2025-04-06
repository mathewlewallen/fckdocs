import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { inferReactQueryProcedureOptions } from '@trpc/react-query';
import superjson from "superjson";
import type { AppRouter } from "@fck/server/api/root";

export const transformer = superjson;

function getUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getBaseUrl() {
  return `${getUrl()}/api/trpc`;
}

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
