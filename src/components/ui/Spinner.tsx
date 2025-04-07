import type * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@fck/lib/utils';
import { Flex } from './Flex';

interface SpinnerProps extends React.ComponentProps<typeof Flex> {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'm', ariaLabel = 'Loading', className, style, ...rest }, ref) => {
    return (
      <Flex
        horizontal="center"
        vertical="center"
        style={style}
        className={className}
        {...rest}
      >
        <Flex
          ref={ref}
          horizontal="center"
          vertical="center"
          className={cn(size)}
          role="status"
          aria-label={ariaLabel}
        >
          <div className="spinner" />
        </Flex>
      </Flex>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner
