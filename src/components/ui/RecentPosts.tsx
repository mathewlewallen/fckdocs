'use client';

import { Button } from '@fck/components/ui/Button';
import type { IconNames } from '@fck/components/ui/Icon';
import { ScrollArea, ScrollBar } from '@fck/components/ui/scroll-area';
import { cn } from '@fck/lib/utils';
import type { RouterOutputs } from '@fck/server/trpc/shared';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { ModuleCard } from './module-card';

interface RecentPostsProps {
  posts: RouterOutputs['post']['getPostsByUser'];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="mt-6 overflow-hidden rounded-xl border px-4 py-3">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Recent Posts</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          aria-expanded={isExpanded}
          aria-controls="recent-posts-list"
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      <AnimateHeight id="recent-posts-list" height={isExpanded ? 'auto' : 0}>
        <ScrollArea>
          <ul
            className={cn(
              'relative mt-4 flex gap-4',
              posts.length === 0 && 'overflow-hidden'
            )}
          >
            {posts.length === 0 && (
              <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <p className="max-w-[40ch] text-center text-gray-foreground-muted text-sm">
                    When you decide to become a good student and create modules,
                    your recent ones will show up here.
                  </p>
                </div>
                {new Array(8).fill(0).map((_, i) => (
                  <ModuleCard.Skeleton key={i} opacity={50} animate={false} />
                ))}
              </>
            )}

            {posts.length > 0 &&
              posts.map((post) => (
                <ModuleCard
                  key={post.id}
                  {...post}
                  icon={
                    post.icon === 'default'
                      ? 'Folder'
                      : (post.icon as IconNames)
                  }
                />
              ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </AnimateHeight>
    </div>
  );
}
