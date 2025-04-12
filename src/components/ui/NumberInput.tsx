'use client';

import type * as React from 'react';
import { forwardRef, useState } from 'react';
import { Input, IconButton, Flex } from '@fck/components/ui';
import { cn } from '@fck/lib/utils';
import type { NumberInputProps } from '@fck/components/interfaces';

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step = 1, padStart, ...props }, ref) => {
    const [localValue, setLocalValue] = useState<string>(
      padStart && value !== undefined
        ? value.toString().padStart(padStart, '0')
        : (value?.toString() ?? '')
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      const numValue = Number.parseFloat(newValue);
      if (!Number.isNaN(numValue) && onChange) {
        onChange(numValue);
      }
    };

    const updateValue = (newValue: number) => {
      const formattedValue = padStart
        ? newValue.toString().padStart(padStart, '0')
        : newValue.toString();
      setLocalValue(formattedValue);
      onChange?.(newValue);
    };

    const increment = () => {
      const currentValue = Number.parseFloat(localValue) || 0;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        updateValue(newValue);
      }
    };

    const decrement = () => {
      const currentValue = Number.parseFloat(localValue) || 0;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        updateValue(newValue);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        value={localValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        hasSuffix={
          <>
            <Flex minWidth={1.25} />
            <Flex
              position="absolute"
              right="0"
              top="0"
              direction="column"
              borderLeft="neutral-medium"
              fillHeight
              background="neutral-alpha-weak"
            >
              <Flex
                fillHeight
                borderBottom="neutral-medium"
                paddingX="4"
                className={cn('stepper', 'transition-micro-medium')}
              >
                <IconButton
                  icon="chevronUp"
                  variant="ghost"
                  size="s"
                  onClick={increment}
                  aria-label="Increment value"
                />
              </Flex>
              <Flex
                fillHeight
                paddingX="4"
                className={cn('stepper', 'transition-micro-medium')}
              >
                <IconButton
                  icon="chevronDown"
                  variant="ghost"
                  size="s"
                  onClick={decrement}
                  aria-label="Decrement value"
                />
              </Flex>
            </Flex>
          </>
        }
        className="number-input"
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';
export default NumberInput
