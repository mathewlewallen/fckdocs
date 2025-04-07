'use client';

import type React from 'react';
import { forwardRef, useEffect, useState } from 'react';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';
import { Flex } from './Flex';

interface GlitchFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  interval?: number;
  trigger?: 'instant' | 'hover' | 'custom';
  continuous?: boolean;
}

const GlitchFx = forwardRef<HTMLDivElement, GlitchFxProps>(
  (
    {
      children,
      speed = 'medium',
      interval = 2500,
      trigger = 'instant',
      continuous = true,
      ...rest
    },
    ref
  ) => {
    const [isGlitching, setIsGlitching] = useState(
      continuous || trigger === 'instant'
    );

    useEffect(() => {
      if (continuous || trigger === 'instant') {
        setIsGlitching(true);
      }
    }, [continuous, trigger]);

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        setIsGlitching(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        setIsGlitching(false);
      }
    };

    const triggerGlitch = () => {
      if (trigger === 'custom') {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }
    };

    useEffect(() => {
      if (trigger === 'custom') {
        const glitchInterval = setInterval(triggerGlitch, interval);
        return () => clearInterval(glitchInterval);
      }
    }, [trigger, interval]);

    const speedClass = speed;

    return (
      <Flex
        ref={ref}
        position="relative"
        inline
        zIndex={0}
        className={clsx(speedClass, isGlitching && 'active')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <Flex fillWidth inline position="relative" zIndex={1}>
          {children}
        </Flex>

        <Flex
          inline
          position="absolute"
          top="0"
          left="0"
          fill
          zIndex={0}
          opacity={50}
          className={clsx('glitch-layer', 'blue-shift')}
        >
          {children}
        </Flex>

        <Flex
          inline
          position="absolute"
          top="0"
          left="0"
          fill
          zIndex={0}
          opacity={50}
          className={clsx('glitch-layer', 'red-shift')}
        >
          {children}
        </Flex>
      </Flex>
    );
  }
);

GlitchFx.displayName = 'GlitchFx';
export default GlitchFx
