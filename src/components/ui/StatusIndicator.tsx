'use client';

import * as React from 'react';
import { cn } from '@fck/lib/utils';
import { Flex } from '@fck/components/ui';

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

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
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
        className={cn('status-indicator', size, color, className)}
        aria-label={ariaLabel}
        radius="full"
        {...rest}
      />
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export default StatusIndicator
