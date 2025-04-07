'use client';

import { useState } from 'react';
import * as React from 'react';
import { Chip, Input, Flex } from '@fck/components/ui';
import type { InputProps } from '@fck/components/ui/Input';

interface TagInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: string[];
  onChange: (value: string[]) => void;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, label, placeholder, ...inputProps }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputValue(e.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        if (inputValue.trim()) {
          onChange([...value, inputValue.trim()]);
          setInputValue('');
        }
      }
    };

    const handleRemoveTag = (index: number) => {
      const newValue = value.filter((_, i) => i !== index);
      onChange(newValue);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
      setIsFocused(true);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false);
    };

    return (
      <Input
        ref={ref}
        label={label}
        placeholder={placeholder}
        labelAsPlaceholder
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-haspopup="listbox"
        aria-expanded={isFocused}
        {...inputProps}
      >
        {value.length > 0 && (
          <Flex
            style={{
              margin: 'calc(-1 * var(--static-space-8)) var(--static-space-8)',
            }}
            direction="row"
            gap="4"
            vertical="center"
            wrap
            paddingY="16"
          >
            {value.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onRemove={() => handleRemoveTag(index)}
                aria-label={`Remove tag ${tag}`}
              />
            ))}
          </Flex>
        )}
      </Input>
    );
  }
);

TagInput.displayName = 'TagInput';

export default TagInput
export type { TagInputProps };
