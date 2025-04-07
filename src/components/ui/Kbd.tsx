'use client';

import type React from 'react';
import { type ReactNode, forwardRef } from 'react';

import { Text } from '.';
import { Flex } from './Flex';
interface KbdProps extends React.ComponentProps<typeof Flex> {
  label?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Kbd = forwardRef<HTMLDivElement, KbdProps>(
  ({ label, children, className, style, ...rest }, ref) => (
    <Flex
      as="kbd"
      ref={ref}
      horizontal="center"
      minWidth="32"
      background="neutral-strong"
      radius="s"
      paddingX="4"
      paddingY="2"
      onBackground="neutral-medium"
      border="neutral-strong"
      className={className}
      style={style}
      {...rest}
    >
      <Text as="span" variant="label-default-s">
        {label || children}
      </Text>
    </Flex>
  )
);

Kbd.displayName = 'Kbd';

export default Kbd
export type { KbdProps };
