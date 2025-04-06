import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { appRouter } from "@fck/server/api/root";
import { createTRPCContext } from "@fck/server/trpc/trpc";
import { env } from "@fck/env";

const createContext = (req: NextRequest) => {
	return createTRPCContext({
	  headers: req.headers,
	});
  };

/**
 * Handles incoming tRPC requests
 * @param req The incoming request
 * @returns The response to the request
 */
const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req), // Pass the req object correctly
		onError:
			env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
						);
					}
				: undefined,
	});

export { handler as GET, handler as POST };
