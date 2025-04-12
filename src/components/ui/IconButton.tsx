'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Icon, Flex, Tooltip, ElementType } from '@fck/components/ui';
import type { IconButtonProps, AnchorIconButtonProps } from '@fck/components/interfaces';
import { cn } from '@fck/lib/utils';

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps | AnchorIconButtonProps>(
  (
    {
      icon = 'refresh',
      size = 'm',
      id,
      radius,
      tooltip,
      tooltipPosition = 'top',
      variant = 'primary',
      href,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isHover) {
        timer = setTimeout(() => {
          setTooltipVisible(true);
        }, 400);
      } else {
        setTooltipVisible(false);
      }

      return () => clearTimeout(timer);
    }, [isHover]);

    const content = (
      <>
        {children ? children : <Icon name={icon} size="s" />}
        {tooltip && isTooltipVisible && (
          <Flex position="absolute" zIndex={1} className={tooltipPosition}>
            <Tooltip label={tooltip} />
          </Flex>
        )}
      </>
    );

    const radiusSize = size === 's' || size === 'm' ? 'm' : 'l';

    return (
      <ElementType
        id={id}
        href={href}
        ref={ref}
        className={cn(
          'button',
          variant,
          size,
          className,
          radius === 'none'
            ? 'radius-none'
            : radius
              ? `radius-${radiusSize}-${radius}`
              : `radius-${radiusSize}`,
          'text-decoration-none',
          'button',
          'cursor-interactive',
          className
        )}
        style={style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label={tooltip || icon}
        {...props}
      >
        <Flex fill center>
          {content}
        </Flex>
      </ElementType>
    );
  }
);

IconButton.displayName = 'IconButton';
export default IconButton;
