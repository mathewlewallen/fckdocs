'use client';

import type React from 'react';
import { type ReactNode, forwardRef } from 'react';
import { Icon, Text } from '.';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';
import { Flex } from './Flex';

interface TagProps extends React.ComponentProps<typeof Flex> {
  variant?:
    | 'brand'
    | 'accent'
    | 'warning'
    | 'success'
    | 'danger'
    | 'neutral'
    | 'info'
    | 'gradient';
  size?: 's' | 'm' | 'l';
  label?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  children?: ReactNode;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      variant = 'neutral',
      size = 'm',
      label = '',
      prefixIcon,
      suffixIcon,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const paddingSize = size === 's' ? '2' : '4';

    return (
      <Flex
        fitWidth
        borderWidth={1}
        borderStyle="solid"
        vertical="center"
        radius="l"
        gap="4"
        ref={ref}
        className={clsx('tag', variant, size, className)}
        {...rest}
      >
        {prefixIcon && <Icon name={prefixIcon} size="xs" />}
        <Flex
          style={{ userSelect: 'none' }}
          paddingX={paddingSize}
          vertical="center"
        >
          <Text as="span" variant="label-default-s">
            {label || children}
          </Text>
        </Flex>
        {suffixIcon && <Icon name={suffixIcon} size="xs" />}
      </Flex>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag
export type { TagProps };
