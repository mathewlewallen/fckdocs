import { forwardRef } from 'react';
import { cn } from '@fck/lib/utils';
import Flex from '@fck/components/ui/Flex';
import type { SpinnerProps } from '@fck/components/interfaces';

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
