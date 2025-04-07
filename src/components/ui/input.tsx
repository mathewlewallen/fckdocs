'use client';

import * as React from 'react';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Text, Flex } from '@fck/components/ui';

import useDebounce from '@fck/hooks/useDebounce';
import { cn } from '@fck/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  height?: 's' | 'm';
  error?: boolean;
  errorMessage?: React.ReactNode;
  description?: React.ReactNode;
  radius?:
    | 'none'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'bottom-left';
  className?: string;
  style?: React.CSSProperties;
  hasPrefix?: React.ReactNode;
  hasSuffix?: React.ReactNode;
  labelAsPlaceholder?: boolean;
  validate?: (value: React.ReactNode) => React.ReactNode | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      height = 'm',
      error = false,
      errorMessage,
      description,
      radius,
      className,
      style,
      hasPrefix,
      hasSuffix,
      labelAsPlaceholder = false,
      children,
      onFocus,
      onBlur,
      validate,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);
    const [validationError, setValidationError] = useState<React.ReactNode | null>(
      null
    );
    const debouncedValue = useDebounce(props.value, 1000);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (event.target.value) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
      if (onBlur) onBlur(event);
    };

    useEffect(() => {
      setIsFilled(!!props.value);
    }, [props.value]);

    const validateInput = useCallback(() => {
      if (!debouncedValue) {
        setValidationError(null);
        return;
      }

      if (validate) {
        const error = validate(debouncedValue);
        if (error) {
          setValidationError(error);
        } else {
          setValidationError(errorMessage || null);
        }
      } else {
        setValidationError(null);
      }
    }, [debouncedValue, validate, errorMessage]);

    useEffect(() => {
      validateInput();
    }, [debouncedValue, validateInput]);

    const displayError = validationError || errorMessage;

    const inputClassNames = cn(
      'input', // replace styles.input
      'font-body font-default font-m', // global/tailwind font classes
      {
        filled: isFilled,
        focused: isFocused,
        'with-prefix': hasPrefix,
        'with-suffix': hasSuffix,
        'label-as-placeholder': labelAsPlaceholder,
        'has-children': children,
        error: displayError && debouncedValue !== '',
      }
    );

    return (
      <Flex
        position="relative"
        direction="column"
        gap="8"
        style={style}
        fillWidth
        fitHeight
        className={cn(className, {
          error:
            (error || (displayError && debouncedValue !== '')) &&
            props.value !== '',
        })}
      >
        <Flex
          transition="micro-medium"
          border="neutral-medium"
          background="neutral-alpha-weak"
          position="relative"
          overflow="hidden"
          vertical="stretch"
          className={cn(
            'input-base', // global base style
            height === 's' && 'input-s',
            height === 'm' && 'input-m',
            radius === 'none'
              ? 'radius-none'
              : radius
                ? `radius-l-${radius}`
                : 'radius-l'
          )}
        >
          {hasPrefix && (
            <Flex paddingLeft="12" className="input-prefix">
              {hasPrefix}
            </Flex>
          )}
          <Flex fillWidth direction="column" position="relative">
            <input
              {...props}
              ref={ref}
              id={id}
              placeholder={labelAsPlaceholder ? label : props.placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClassNames}
              aria-describedby={displayError ? `${id}-error` : undefined}
              aria-invalid={!!displayError}
            />
            {!labelAsPlaceholder && (
              <Text
                as="label"
                variant="label-default-m"
                htmlFor={id}
                className={cn('input-label', {
                  floating: isFocused || isFilled,
                })}
              >
                {label}
              </Text>
            )}
            {children}
          </Flex>
          {hasSuffix && (
            <Flex paddingRight="12" className="input-suffix">
              {hasSuffix}
            </Flex>
          )}
        </Flex>
        {displayError && errorMessage !== false && (
          <Flex paddingX="16">
            <Text
              as="span"
              id={`${id}-error`}
              variant="body-default-s"
              onBackground="danger-weak"
            >
              {validationError || errorMessage}
            </Text>
          </Flex>
        )}
        {description && (
          <Flex paddingX="16">
            <Text
              as="span"
              id={`${id}-description`}
              variant="body-default-s"
              onBackground="neutral-weak"
            >
              {description}
            </Text>
          </Flex>
        )}
      </Flex>
    );
  }
);

Input.displayName = 'Input';

export default Input
export type { InputProps };
