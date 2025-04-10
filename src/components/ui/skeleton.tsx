'use client';

import type * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@fck/lib/utils';
import { Flex } from './Flex';

interface SkeletonProps extends React.ComponentProps<typeof Flex> {
  shape: 'line' | 'circle' | 'block';
  width?: 'xl' | 'l' | 'm' | 's' | 'xs';
  height?: 'xl' | 'l' | 'm' | 's' | 'xs';
  delay?: '1' | '2' | '3' | '4' | '5' | '6';
  style?: React.CSSProperties;
  className?: string;
}

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
