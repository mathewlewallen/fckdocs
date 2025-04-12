import { Text, Flex, ElementType } from '@fck/components/ui';
import '@fck/styles/globals.css';
import { cn } from '@fck/lib/utils';
import { forwardRef } from 'react';
import type { OptionProps } from '@fck/components/interfaces';
import { log } from '@fck/lib/observability/log';

const Option = forwardRef<HTMLDivElement, OptionProps>(
  (
    {
      label,
      value,
      href,
      hasPrefix,
      hasSuffix,
      description,
      danger,
      selected,
      highlighted,
      tabIndex,
      onClick,
      ...props
    },
    ref
  ) => {
    if (href && onClick) {
      log.warn('Option should not have both `href` and `onClick` props.');
    }

    return (
      <ElementType
        tabIndex={tabIndex}
        ref={ref}
        href={href}
        className="reset-button-styles"
        style={{ width: '100%' }}
      >
        <Flex
          {...props}
          fillWidth
          vertical="center"
          paddingX="12"
          paddingY="8"
          gap="12"
          radius="m"
          role="option"
          aria-selected={selected}
          tabIndex={-1}
          borderWidth={1}
          borderStyle="solid"
          cursor="interactive"
          transition="micro-medium"
          onClick={() => onClick?.(value)}
          className={cn('option', {
            danger: danger,
            selected: selected,
            highlighted: highlighted,
          })}
          data-value={value}
        >
          {hasPrefix && <Flex className="prefix">{hasPrefix}</Flex>}
          <Flex
            horizontal="start"
            style={{
              whiteSpace: 'nowrap',
            }}
            fillWidth
            direction="column"
          >
            <Text onBackground="neutral-strong" variant="label-default-s">
              {label}
            </Text>
            {description && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {description}
              </Text>
            )}
          </Flex>
          {hasSuffix && <Flex className="suffix">{hasSuffix}</Flex>}
        </Flex>
      </ElementType>
    );
  }
);

Option.displayName = 'Option';
export default Option
