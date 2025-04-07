'use client';

import { Flex } from '@fck/components/ui';
import * as React from 'react';


interface CardProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
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
