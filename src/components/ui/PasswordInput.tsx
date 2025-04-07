'use client';

import { forwardRef, useState } from 'react';
import { IconButton, Input, type InputProps } from '.';

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        hasSuffix={
          <IconButton
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            variant="ghost"
            icon={showPassword ? 'eyeOff' : 'eye'}
            size="s"
            type="button"
          />
        }
      />
    );
  }

PasswordInput.displayName = 'PasswordInput';
