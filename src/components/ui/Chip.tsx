'use client';

import { cn } from '@fck/lib/utils';
import * as React from 'react';
import { Icon, IconButton, Flex, Text } from '@fck/components/ui';
import type { IconButtonProps } from '@fck/components/ui/IconButton';


interface ChipProps extends React.ComponentProps<typeof Flex> {
  label: string;
  selected?: boolean;
  prefixIcon?: string;
  onRemove?: () => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
  style?: React.CSSProperties;
  className?: string;
}

const Chip: React.FC<ChipProps> = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      selected = true,
      prefixIcon,
      onRemove,
      onClick,
      children,
      iconButtonProps = {},
      ...rest
    },
    ref
  ) => {
    const defaultIconButtonProps: IconButtonProps = {
      icon: 'close',
      variant: 'ghost',
      size: 's',
      tooltip: 'Remove',
      onClick: (e) => {
        e.stopPropagation();
        if (onRemove) onRemove();
      },
    };

    const combinedIconButtonProps = {
      ...defaultIconButtonProps,
      ...iconButtonProps,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        defaultIconButtonProps.onClick?.(e);
        iconButtonProps.onClick?.(e);
      },
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick) onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <Flex
        ref={ref}
        fit
        vertical="center"
        radius="full"
        paddingX="8"
        paddingY="4"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-pressed={selected}
        cursor="interactive"
        transition="micro-medium"
        className={cn('chip', {
          selected: selected,
          unselected: !selected,
        })}
        {...rest}
      >
        {prefixIcon && <Icon name={prefixIcon} size="s" />}
        <Flex paddingX="8" paddingY="2">
          <Text variant="body-default-s">{label || children}</Text>
        </Flex>
        {onRemove && (
          <IconButton
            style={{
              color: 'inherit',
            }}
            {...combinedIconButtonProps}
          />
        )}
      </Flex>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip
