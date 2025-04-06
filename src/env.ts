import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z
		.string()
		.url()
		.refine(
		  (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
		  "You forgot to change the default URL",
		),
	  NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	  CLERK_SECRET_KEY: z.string(),
	  STRIPE_SECRET_KEY: z.string(),
	  STRIPE_WEBHOOK_SECRET: z.string(),
	  CLERK_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
	  KNOCK_SECRET_API_KEY: z.string().min(1).optional(),
	  BETTERSTACK_API_KEY: z.string().min(1).optional(),
      BETTERSTACK_URL: z.string().min(1).url().optional(),
      SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
      SENTRY_ORG: z.string().min(1).optional(),
      SENTRY_PROJECT: z.string().min(1).optional(),
	  LIVEBLOCKS_SECRET: z.string().min(1).startsWith('sk_').optional(),
	  OPENAI_API_KEY: z.string().min(1).startsWith('sk-').optional(),
	  KV_REST_API_URL: z.string(),
	  KV_REST_API_TOKEN: z.string(),
	  REDIS_URL: z.string(),
	  KV_REST_API_READ_ONLY_TOKEN: z.string(),
	  KV_URL: z.string(),
	  RESEND_TOKEN: z.string(),
	  RESEND_FROM: z.string(),
      FLAGS_SECRET: z.string().min(1).optional(),
	  SVIX_TOKEN: z
	  .union([
		z.string().min(1).startsWith('sk_'),
		z.string().min(1).startsWith('testsk_'),
	  ])
	  .optional(),
	  ARCJET_KEY: z.string().min(1).startsWith('ajkey_').optional(),
	  PAGE_ACCESS_PASSWORD: z.string().min(1).optional(),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
		NEXT_PUBLIC_KNOCK_API_KEY: z.string().min(1).optional(),
		NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID: z.string().min(1).optional(),  
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_CLERK_WAITLIST_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_CLERK_AFTER_WAITLIST_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_').optional(),
		NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).url().optional(),
		NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
		NEXT_PUBLIC_GA_MEASUREMENT_ID: z
		  .string()
		  .min(1)
		  .startsWith('G-')
		  .optional(),
	},
	runtimeEnv: {
		PAGE_ACCESS_PASSWORD: process.env.PAGE_ACCESS_PASSWORD,
		ARCJET_KEY: process.env.ARCJET_KEY,
		SVIX_TOKEN: process.env.SVIX_TOKEN,
		FLAGS_SECRET: process.env.FLAGS_SECRET,
		REDIS_URL: process.env.REDIS_URL,
		KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
		KV_URL: process.env.KV_URL,
		KV_REST_API_URL: process.env.KV_REST_API_URL,
		KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
		RESEND_FROM: process.env.RESEND_FROM,
		RESEND_TOKEN: process.env.RESEND_TOKEN,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
		BETTERSTACK_URL: process.env.BETTERSTACK_URL,
		SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
		SENTRY_ORG: process.env.SENTRY_ORG,
		SENTRY_PROJECT: process.env.SENTRY_PROJECT,
		NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
		  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
		  process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
		  process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_WAITLIST_URL: process.env.NEXT_PUBLIC_CLERK_WAITLIST_URL,
		NEXT_PUBLIC_CLERK_AFTER_WAITLIST_URL:
		  process.env.NEXT_PUBLIC_CLERK_AFTER_WAITLIST_URL,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
		  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
		NEXT_PUBLIC_KNOCK_API_KEY: process.env.NEXT_PUBLIC_KNOCK_API_KEY,
		NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID:
			process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
		KNOCK_SECRET_API_KEY: process.env.KNOCK_SECRET_API_KEY,
		LIVEBLOCKS_SECRET: process.env.LIVEBLOCKS_SECRET,
	},
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
	 * `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
