'use client';

import { forwardRef } from 'react';
import type { LineProps } from '@fck/components/interfaces';
import { Flex } from '@fck/components/ui';

const Line = forwardRef<HTMLDivElement, LineProps>(
  ({ vert, className, style, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        minWidth={(vert && '1') || undefined}
        minHeight={(!vert && '1') || undefined}
        width={(vert && '1') || undefined}
        height={(!vert && '1') || undefined}
        fillWidth={!vert}
        fillHeight={vert}
        background="neutral-strong"
        direction={vert ? 'column' : 'row'}
        className={className}
        style={style}
        {...rest}
      />
    );
  }
);

Line.displayName = 'Line';
export default Line
