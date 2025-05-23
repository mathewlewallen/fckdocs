import {
  LiveList,
  type ResolveMentionSuggestionsArgs,
} from '@liveblocks/client';
import type { ResolveUsersArgs } from '@liveblocks/node';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import type * as React from 'react';

type Image = {
  id: string;
  url: string;
  title?: string;
  description?: string;
  uploadedBy: string;
  timestamp: number;
};

export type RoomProps = React.ComponentProps<typeof LiveblocksProvider> & {
  id: string;
  children: React.ReactNode;
  authEndpoint: string;
  fallback: React.ReactNode;
  resolveUsers?: (
    args: ResolveUsersArgs
  ) => Promise<Liveblocks['UserMeta']['info'][]>;
  resolveMentionSuggestions?: (
    args: ResolveMentionSuggestionsArgs
  ) => Promise<string[]>;
};

export const Room = ({
  id,
  children,
  authEndpoint,
  fallback,
  ...props
}: RoomProps) => (
  <LiveblocksProvider authEndpoint={authEndpoint} {...props}>
    <RoomProvider
      id={id}
      initialPresence={{ cursor: null }}
      initialStorage={{
        images: new LiveList<Image>([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
