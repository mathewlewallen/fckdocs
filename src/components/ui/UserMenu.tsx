'use client';

import type React from 'react';
import { DropdownWrapper, User, type UserProps } from '.';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';
import type { DropdownWrapperProps } from './DropdownWrapper';
import { Flex } from './Flex';

interface UserMenuProps
  extends UserProps,
    Pick<DropdownWrapperProps, 'minHeight' | 'minWidth' | 'maxWidth'> {
  selected?: boolean;
  dropdown?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UserMenu: React.FC<UserMenuProps> = ({
  selected = false,
  dropdown,
  minWidth,
  maxWidth,
  minHeight,
  className,
  style,
  ...userProps
}) => {
  return (
    <DropdownWrapper
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      style={{
        borderRadius: 'var(--radius-full)',
      }}
      trigger={
        <Flex
          tabIndex={0}
          direction="column"
          padding="4"
          radius="full"
          cursor="interactive"
          border={selected ? 'neutral-medium' : 'transparent'}
          background={selected ? 'neutral-strong' : 'transparent'}
          className={clsx(
            className || '',
            selected ? 'selected' : '',
            'wrapper'
          )}
          style={style}
        >
          <User {...userProps} />
        </Flex>
      }
      dropdown={<>{dropdown}</>}
    />
  );
};

UserMenu.displayName = 'UserMenu';
export default UserMenu
