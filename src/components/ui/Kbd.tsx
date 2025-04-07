'use client';

import * as React from 'react';
import { Text, Flex } from '@fck/components/ui';

interface KbdProps extends React.ComponentProps<typeof Flex> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Kbd = React.forwardRef<HTMLDivElement, KbdProps>(
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
