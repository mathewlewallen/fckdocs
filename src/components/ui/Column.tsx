'use client';

import { Flex } from '@fck/components/ui/Flex';
import { forwardRef } from 'react';

interface ColumnProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
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
