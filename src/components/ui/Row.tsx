'use client';

import { Flex } from '@fck/components/ui';
import type { DisplayProps, CommonProps, SizeProps, FlexProps, SpacingProps, StyleProps } from '@fck/components/interfaces';
import * as React from 'react';

interface RowProps
 extends FlexProps,
  SpacingProps,
  SizeProps,
  StyleProps,
  CommonProps,
  DisplayProps {
  children?: React.ReactNode;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Flex ref={ref} {...rest}>
        {children}
      </Flex>
    );
  }
);

Row.displayName = 'Row';
export default Row
