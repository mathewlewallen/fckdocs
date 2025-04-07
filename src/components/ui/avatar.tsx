'use client';

import type * as React from 'react';
import { forwardRef } from 'react';

import { Flex, Icon, Skeleton, SmartImage, StatusIndicator, Text } from '@fck/components/ui';
import { cn } from '@fck/lib/utils';

interface AvatarProps extends React.ComponentProps<typeof Flex> {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  value?: string;
  src?: string;
  loading?: boolean;
  empty?: boolean;
  statusIndicator?: {
    color: 'green' | 'yellow' | 'red' | 'gray';
  };
  style?: React.CSSProperties;
  className?: string;
}

const sizeMapping: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
  xs: 20,
  s: 24,
  m: 32,
  l: 48,
  xl: 160,
};

const statusIndicatorSizeMapping: Record<
  'xs' | 's' | 'm' | 'l' | 'xl',
  's' | 'm' | 'l'
> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'm',
  xl: 'l',
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'm',
      value,
      src,
      loading,
      empty,
      statusIndicator,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isEmpty = empty || (!src && !value);

    if (value && src) {
      throw new Error("Avatar cannot have both 'value' and 'src' props.");
    }

    if (loading) {
      return (
        <Skeleton
          {...rest}
          border="neutral-medium"
          shape="circle"
          width={size}
          height={size}
          className={cn('avatar', className)}
          aria-busy="true"
          aria-label="Loading avatar"
        />
      );
    }

    const renderContent = () => {
      if (isEmpty) {
        return (
          <Icon
            onBackground="neutral-medium"
            name="person"
            size={size as 'xs' | 's' | 'm' | 'l' | 'xl'}
            className="icon"
            aria-label="Empty avatar"
          />
        );
      }

      if (src) {
        return (
          <SmartImage
            radius="full"
            src={src}
            fill
            alt="Avatar"
            sizes={`${sizeMapping[size]}px`}
            className="image"
          />
        );
      }

      if (value) {
        return (
          <Text
            as="span"
            onBackground="neutral-weak"
            variant={`body-default-${size}`}
            className="value"
            aria-label={`Avatar with initials ${value}`}
          >
            {value}
          </Text>
        );
      }

      return null;
    };

    return (
      <Flex
        ref={ref}
        role="img"
        position="relative"
        horizontal="center"
        vertical="center"
        radius="full"
        border="neutral-strong"
        background="surface"
        style={style}
        className={cn('avatar', size, className)}
        {...rest}
      >
        {renderContent()}
        {statusIndicator && (
          <StatusIndicator
            size={statusIndicatorSizeMapping[size]}
            color={statusIndicator.color}
            className={cn(
              className,
              'indicator',
              size === 'xl' ? 'position' : ''
            )}
            aria-label={`Status: ${statusIndicator.color}`}
          />
        )}
      </Flex>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar
export type { AvatarProps };
