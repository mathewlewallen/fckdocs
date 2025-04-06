import { Redis } from '@upstash/redis';
import { Ratelimit, type RatelimitConfig } from '@upstash/ratelimit';
import { env } from '@fck/env';

export const redis = new Redis({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

export const createRateLimiter = (props: Omit<RatelimitConfig, 'redis'>) =>
  new Ratelimit({
    redis,
    limiter: props.limiter ?? Ratelimit.slidingWindow(10, '10 s'),
    prefix: props.prefix ?? 'cloudcontext',
  });

export const { slidingWindow } = Ratelimit;