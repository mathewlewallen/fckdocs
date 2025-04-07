import { env } from '@fck/env';
import type * as React from 'react';
import { GoogleAnalytics } from '@fck/lib/analytics/google';
import { VercelAnalytics } from '@fck/lib/analytics/vercel';
import { PostHogProvider } from '@fck/lib/analytics/posthog/client';

type AnalyticsProviderProps = {
  readonly children: React.ReactNode;
};

const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = env;

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    <VercelAnalytics />
    {NEXT_PUBLIC_GA_MEASUREMENT_ID && (
      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )}
  </PostHogProvider>
);
