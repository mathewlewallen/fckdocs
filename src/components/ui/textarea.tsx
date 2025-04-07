'use client';

import * as React from 'react';
import {
  useState,
  useEffect,
  forwardRef,
  type TextareaHTMLAttributes,
  useCallback,
} from 'react';
import { Text, Flex } from '@fck/components/ui';

import useDebounce from '@fck/hooks/useDebounce';
import { cn } from '@fck/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  lines?: number | 'auto';
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
  hasPrefix?: React.ReactNode;
  hasSuffix?: React.ReactNode;
  labelAsPlaceholder?: boolean;
  resize?: 'horizontal' | 'vertical' | 'both' | 'none';
  validate?: (value: React.ReactNode) => React.ReactNode | null;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      lines = 3,
      error = false,
      errorMessage,
      description,
      radius,
      className,
      hasPrefix,
      hasSuffix,
      labelAsPlaceholder = false,
      resize = 'vertical',
      validate,
      children,
      onFocus,
      onBlur,
      onChange,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);
    const [validationError, setValidationError] = useState<React.ReactNode | null>(
      null
    );
    const [height, setHeight] = useState<number | undefined>(undefined);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const debouncedValue = useDebounce(props.value, 1000);

    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (lines === 'auto') {
        adjustHeight();
      }
      if (onChange) onChange(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setIsFilled(!!event.target.value);
      if (onBlur) onBlur(event);
    };

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

    useEffect(() => {
      if (lines === 'auto') {
        adjustHeight();
      }
    }, [props.value, lines]);

    const displayError = validationError || errorMessage;

    const textareaClassNames = cn(
      'input',
      'textarea',
      'font-body',
      'font-default',
      'font-m',
      {
        filled: isFilled,
        focused: isFocused,
        withPrefix: hasPrefix,
        withSuffix: hasSuffix,
        labelAsPlaceholder: labelAsPlaceholder,
        hasChildren: children,
      }
    );

    return (
      <Flex
        position="relative"
        direction="column"
        gap="8"
        fillWidth
        fitHeight
        className={cn(className, {
          error: displayError && debouncedValue !== '',
        })}
      >
        <Flex
          minHeight="56"
          transition="micro-medium"
          border="neutral-medium"
          background="neutral-alpha-weak"
          position="relative"
          overflow="hidden"
          vertical="stretch"
          className={cn(
            'base',
            lines !== 'auto' && 'textarea-base',
            radius === 'none'
              ? 'radius-none'
              : radius
                ? `radius-l-${radius}`
                : 'radius-l'
          )}
        >
          {hasPrefix && (
            <Flex paddingLeft="12" className="prefix">
              {hasPrefix}
            </Flex>
          )}
          <Flex fillWidth direction="column" position="relative">
            <textarea
              {...props}
              ref={(node) => {
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                //@ts-ignore
                textareaRef.current = node;
              }}
              id={id}
              rows={typeof lines === 'number' ? lines : 1}
              placeholder={labelAsPlaceholder ? label : props.placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={textareaClassNames}
              aria-describedby={displayError ? `${id}-error` : undefined}
              aria-invalid={!!displayError}
              style={{
                ...style,
                resize: lines === 'auto' ? 'none' : resize,
                height: height ? `${height}rem` : 'auto',
              }}
              onChange={handleChange}
            />
            {!labelAsPlaceholder && (
              <Text
                as="label"
                variant="label-default-m"
                htmlFor={id}
                className={cn('label', 'textarea-label', {
                  floating: isFocused || isFilled,
                })}
              >
                {label}
              </Text>
            )}
            {children && children}
          </Flex>
          {hasSuffix && (
            <Flex paddingRight="12" className="suffix">
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
              {displayError}
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

Textarea.displayName = 'Textarea';

export default Textarea
export type { TextareaProps };
