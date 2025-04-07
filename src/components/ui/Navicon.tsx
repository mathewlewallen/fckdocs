import type * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@fck/lib/utils';
import { Flex } from './Flex';

interface NavIconProps extends React.ComponentProps<typeof Flex> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive: boolean;
}

const NavIcon = forwardRef<HTMLDivElement, Partial<NavIconProps>>(
  ({ className, isActive, style, onClick, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        tabIndex={0}
        radius="m"
        position="relative"
        cursor="interactive"
        width="40"
        height="40"
        minHeight="40"
        minWidth="40"
        className={className}
        style={style}
        onClick={onClick}
        {...rest}
      >
        <div className={cn('line', isActive && 'active')} />
        <div className={cn('line', isActive && 'active')} />
      </Flex>
    );
  }
);

NavIcon.displayName = 'NavIcon';

export default NavIcon
