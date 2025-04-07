'use client';

import type * as React from 'react';

import { cn } from '@fck/lib/utils';
import { Flex } from '@fck/components/ui';

interface InlineCodeProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
}

const InlineCode = React.forwardRef<HTMLDivElement, InlineCodeProps>(
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
        className={cn('inline-code')}
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

InlineCode.displayName = 'InlineCode';

export default InlineCode
