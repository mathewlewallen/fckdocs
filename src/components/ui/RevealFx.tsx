'use client';

import type { SpacingToken } from '@fck/components/types';
import type * as React from 'react';
import { forwardRef, useEffect, useState } from 'react';

import { Flex } from '@fck/components/ui';
import { cn } from '@fck/lib/utils';

interface RevealFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  delay?: number;
  revealedByDefault?: boolean;
  translateY?: number | SpacingToken;
  trigger?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(
  (
    {
      children,
      speed = 'medium',
      delay = 0,
      revealedByDefault = false,
      translateY,
      trigger,
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const [isRevealed, setIsRevealed] = useState(revealedByDefault);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (trigger !== undefined) {
        setIsRevealed(trigger);
      }
    }, [trigger]);

    const getSpeedDuration = () => {
      switch (speed) {
        case 'fast':
          return '1s';
        case 'medium':
          return '2s';
        case 'slow':
          return '3s';
        default:
          return '2s';
      }
    };

    const getTranslateYValue = () => {
      if (typeof translateY === 'number') {
        return `${translateY}rem`;
      } else if (typeof translateY === 'string') {
        return `var(--static-space-${translateY})`;
      }
      return undefined;
    };

    const translateValue = getTranslateYValue();

    const revealStyle: React.CSSProperties = {
      transitionDuration: getSpeedDuration(),
      transform: isRevealed ? 'translateY(0)' : `translateY(${translateValue})`,
      ...style,
    };

    return (
      <Flex
        fillWidth
        position="relative"
        horizontal="center"
        ref={ref}
        style={revealStyle}
        className={cn(
          'reveal-fx',
          isRevealed ? 'revealed' : 'hidden',
          className
        )}
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

RevealFx.displayName = 'RevealFx';
export default RevealFx
