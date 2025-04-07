'use client';

import { env } from '@fck/env';
import { KnockFeedProvider, KnockProvider } from '@knocklabs/react';
import type * as React from 'react';

const knockApiKey = env.NEXT_PUBLIC_KNOCK_API_KEY;
const knockFeedChannelId = env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID;

type NotificationsProviderProps = {
  children: React.ReactNode;
  userId: string;
};

export const NotificationsProvider = ({
  children,
  userId,
}: NotificationsProviderProps) => {
  if (!knockApiKey || !knockFeedChannelId) {
    return children;
  }

  return (
    <KnockProvider apiKey={knockApiKey} userId={userId}>
      <KnockFeedProvider feedId={knockFeedChannelId}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
