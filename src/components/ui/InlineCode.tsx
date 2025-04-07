'use client';

import type React from 'react';
import { type ReactNode, forwardRef } from 'react';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';
import { Flex } from './Flex';

interface InlineCodeProps extends React.ComponentProps<typeof Flex> {
  children: ReactNode;
}

const InlineCode = forwardRef<HTMLDivElement, InlineCodeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Flex
        as="span"
        inline
        fit
        ref={ref}
        radius="s"
        vertical="center"
        paddingX="4"
        paddingY="1"
        textType="code"
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        className={clsx('inline-code')}
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

InlineCode.displayName = 'InlineCode';

export default InlineCode
