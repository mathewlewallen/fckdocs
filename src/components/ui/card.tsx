'use client';

import { Flex } from '@fck/components/ui/Flex';
import type React from 'react';
import { forwardRef } from 'react';
import '@fck/styles/globals.css';
interface CardProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, style, className, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        background="surface"
        transition="macro-medium"
        border="neutral-medium"
        cursor="interactive"
        className="card"
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

Card.displayName = 'Card';
export default Card
