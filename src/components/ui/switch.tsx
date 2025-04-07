'use client';

import type * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@fck/lib/utils';
import { InteractiveDetails, type InteractiveDetailsProps } from '.';
import { Flex } from './Flex';
interface SwitchProps
  extends Omit<InteractiveDetailsProps, 'onClick'>,
    React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
  className?: string;
  isChecked: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  reverse?: boolean;
  ariaLabel?: string;
  onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      isChecked,
      reverse = false,
      onToggle,
      ariaLabel = 'Toggle switch',
      disabled,
      name,
      value,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onToggle();
      }
    };

    const handleClick = () => {
      if (!disabled) {
        onToggle();
      }
    };

    return (
      <Flex
        gap="16"
        vertical="center"
        horizontal={reverse ? 'space-between' : undefined}
        fillWidth={reverse}
        className={cn('container', className, {
          reverse: reverse,
          disabled: disabled,
        })}
        onClick={handleClick}
        role="switch"
        aria-checked={isChecked}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        tabIndex={-1}
      >
        <input
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={onToggle}
          className="hidden"
          tabIndex={-1}
          {...props}
        />
        <div
          className={cn('switch', {
            checked: isChecked,
            disabled: disabled,
          })}
        >
          <div
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            className={cn('element', {
              checked: isChecked,
              disabled: disabled,
            })}
          />
        </div>
        {props.label && <InteractiveDetails {...props} onClick={() => {}} />}
      </Flex>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch
