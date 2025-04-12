import { forwardRef } from 'react';
import { cn } from '@fck/lib/utils';
import { Flex } from '@fck/components/ui';
import type { NavIconProps } from '@fck/components/interfaces';

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
