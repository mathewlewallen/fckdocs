'use client';

import { iconLibrary } from '@fck/components/icons';
import type { ColorScheme, ColorWeight } from '@fck/components/types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { Tooltip, Flex } from '@fck/components/ui';

import { cn } from '@fck/lib/utils';

interface IconProps extends React.ComponentProps<typeof Flex> {
  name: string;
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  decorative?: boolean;
  tooltip?: React.ReactNode;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  (
    {
      name,
      onBackground,
      onSolid,
      size = 'm',
      decorative = true,
      tooltip,
      tooltipPosition = 'top',
      ...rest
    },
    ref
  ) => {
    const IconComponent: IconType | undefined = iconLibrary[name];

    if (!IconComponent) {
      console.warn(`Icon "${name}" does not exist in the library.`);
      return null;
    }

    if (onBackground && onSolid) {
      console.warn(
        "You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied."
      );
    }

    let colorClass = 'color-inherit';

    if (onBackground) {
      const [scheme, weight] = onBackground.split('-') as [
        ColorScheme,
        ColorWeight,
      ];
      colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
      const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
      colorClass = `${scheme}-on-solid-${weight}`;
    }

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

    return (
      <Flex
        inline
        fit
        position="relative"
        as="div"
        ref={ref}
        className={cn(colorClass, 'icon', size)}
        role={decorative ? 'presentation' : undefined}
        aria-hidden={decorative ? 'true' : undefined}
        aria-label={decorative ? undefined : name}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        {...rest}
      >
        <IconComponent />
        {tooltip && isTooltipVisible && (
          <Flex position="absolute" zIndex={1} className={tooltipPosition}>
            <Tooltip label={tooltip} />
          </Flex>
        )}
      </Flex>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon
