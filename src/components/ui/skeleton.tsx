'use client';

import type * as React from 'react';
import { forwardRef } from 'react';
import { cn } from '@fck/lib/utils';
import { Flex } from '@fck/components/ui';
import type { SkeletonProps } from '@fck/components/interfaces';

const Skeleton: React.FC<SkeletonProps> = forwardRef<
  HTMLDivElement,
  SkeletonProps
>(
  (
    { shape = 'line', width, height, delay, style, className, ...props },
    ref
  ) => {
    return (
      <Flex
        {...props}
        ref={ref}
        style={style}
        radius={shape === 'line' || shape === 'circle' ? 'full' : undefined}
        inline
        className={cn(
          'skeleton',
          shape,
          width && `w-${width}`,
          height && `h-${height}`,
          delay && `delay-${delay}`,
          className
        )}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton
