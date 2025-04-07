'use client';

import type React from 'react';
import { forwardRef } from 'react';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';
import { Flex } from './Flex';

interface StatusIndicatorProps extends React.ComponentProps<typeof Flex> {
  size: 's' | 'm' | 'l';
  color:
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'magenta'
    | 'pink'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'moss'
    | 'green'
    | 'emerald'
    | 'aqua'
    | 'cyan'
    | 'gray';
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      size,
      color,
      ariaLabel = `${color} status indicator`,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    return (
      <Flex
        ref={ref}
        style={style}
        className={clsx('status-indicator', size, color, className)}
        aria-label={ariaLabel}
        radius="full"
        {...rest}
      />
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export default StatusIndicator
