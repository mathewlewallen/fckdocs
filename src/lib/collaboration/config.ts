import type { LiveList } from "@liveblocks/client";

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
    };

    Storage: {
      images: LiveList<{
        id: string;
        url: string;
        title?: string;
        description?: string;
        uploadedBy: string;
        timestamp: number;
      }>;
    };

    UserMeta: {
      id: string;
      info: {
        name?: string;
        avatar?: string;
        color: string;
        role?: "photographer" | "client";
      };
    };

    RoomEvent: {
      highlight: { imageId: string };
    };

    ThreadMetadata: {
      x: number;
      y: number;
    };

    RoomInfo: {
      title: string;
      url: string;
    };
  }
}