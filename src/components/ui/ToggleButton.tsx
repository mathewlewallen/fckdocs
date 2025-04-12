'use client';

import * as React from 'react';
import { Icon, Flex, ElementType } from '@fck/components/ui';
import type { ToggleButtonProps } from '@fck/components/interfaces';
import { cn } from '@fck/lib/utils';

const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>(
  (
    {
      label,
      selected,
      variant = 'ghost',
      size = 'm',
      radius,
      justifyContent = 'center',
      fillWidth = false,
      weight = 'default',
      truncate = false,
      prefixIcon,
      suffixIcon,
      className,
      style,
      children,
      href,
      ...props
    },
    ref
  ) => {
    return (
      <ElementType
        ref={ref}
        href={href}
        className={cn(
          'button',
          variant,
          size,
          selected && 'selected',
          radius === 'none'
            ? 'radius-none'
            : radius
              ? `radius-${size}-${radius}`
              : `radius-${size}`,
          'text-decoration-none',
          'button',
          'cursor-interactive',
          {
            'fill-width': fillWidth,
            'fit-width': !fillWidth,
            [`justify-${justifyContent}`]: justifyContent,
          },
          className
        )}
        style={style}
        {...props}
      >
        {prefixIcon && (
          <Icon name={prefixIcon} size={size === 'l' ? 'm' : 's'} />
        )}
        {(label || children) && (
          <Flex
            padding={size === 's' ? '2' : '4'}
            textWeight={weight}
            textSize={size === 'l' ? 'm' : 's'}
            className="font-label"
          >
            {label || children}
          </Flex>
        )}
        {suffixIcon && (
          <Icon name={suffixIcon} size={size === 'l' ? 'm' : 's'} />
        )}
      </ElementType>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';
export default ToggleButton
