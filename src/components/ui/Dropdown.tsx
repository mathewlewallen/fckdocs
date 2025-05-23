'use client';

import { Flex } from '@fck/components/ui';
import type * as React from 'react';
import { forwardRef } from 'react';

interface DropdownProps
  extends Omit<React.ComponentProps<typeof Flex>, 'onSelect'> {
  selectedOption?: string;
  children?: React.ReactNode;
  onEscape?: () => void;
  onSelect?: (event: string) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    { selectedOption, className, children, onEscape, onSelect, ...rest },
    ref
  ) => {
    const handleSelect = (event: React.SyntheticEvent<HTMLDivElement>) => {
      const value = event.currentTarget.getAttribute('data-value');
      if (onSelect && value) {
        onSelect(value);
      }
    };

    return (
      <Flex
        ref={ref}
        role="listbox"
        onClick={handleSelect}
        flex={1}
        border="neutral-medium"
        background="surface"
        overflow="hidden"
        {...rest}
      >
        <Flex flex={1} overflowY="auto" direction="column" gap="2">
          {children}
        </Flex>
      </Flex>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown
export type { DropdownProps };
