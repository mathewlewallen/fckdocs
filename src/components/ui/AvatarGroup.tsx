'use client';

import type * as React from 'react';
import { forwardRef } from 'react';
import type { AvatarProps } from '@fck/components/ui/Avatar';

import { Flex, Avatar } from '@fck/components/ui';
import { cn } from '@fck/lib/utils';

interface AvatarGroupProps extends React.ComponentProps<typeof Flex> {
  avatars: AvatarProps[];
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  reverse?: boolean;
  limit?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { avatars, size = 'm', reverse = false, limit, className, style, ...rest },
    ref
  ) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount =
      limit && avatars.length > limit ? avatars.length - limit : 0;

    return (
      <Flex
        position="relative"
        vertical="center"
        ref={ref}
        className={cn('avatar-group', className)}
        style={style}
        zIndex={0}
        {...rest}
      >
        {displayedAvatars.map((avatarProps, index) => (
          <Avatar
            position="relative"
            key={index}
            size={size}
            {...avatarProps}
            className="avatar"
            style={{
              ...avatarProps.style,
              zIndex: reverse ? displayedAvatars.length - index : index + 1,
            }}
          />
        ))}
        {remainingCount > 0 && (
          <Avatar
            value={`+${remainingCount}`}
            className="avatar"
            size={size}
            style={{
              ...style,
              zIndex: reverse ? -1 : displayedAvatars.length + 1,
            }}
          />
        )}
      </Flex>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup
export type { AvatarGroupProps };
