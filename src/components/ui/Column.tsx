'use client';

import Flex from '@fck/components/ui/Flex';
import * as React from 'react';

interface ColumnProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Flex direction="column" ref={ref} {...rest}>
        {children}
      </Flex>
    );
  }
);

Column.displayName = 'Column';
export default Column
