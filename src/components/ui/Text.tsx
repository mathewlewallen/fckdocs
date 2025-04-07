'use client';

import type {
  CommonProps,
  SpacingProps,
  TextProps,
} from '@fck/components/interfaces';
import type {
  ColorScheme,
  ColorWeight,
  SpacingToken,
  TextVariant,
} from '@fck/components/types';
import { log } from '@fck/lib/observability/log';
import { cn } from '@fck/lib/utils';
import type * as React from 'react';

type TypeProps<T extends React.ElementType> = TextProps<T> &
  CommonProps &
  SpacingProps &
  React.ComponentPropsWithoutRef<T>;

const Text = <T extends React.ElementType = 'span'>({
  as,
  variant,
  size,
  weight,
  onBackground,
  onSolid,
  align,
  wrap,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingX,
  paddingY,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  marginX,
  marginY,
  children,
  style,
  className,
  ...props
}: TypeProps<T>) => {
  const Component = as || 'span';

  if (variant && (size || weight)) {
    log.warn("When 'variant' is set, 'size' and 'weight' are ignored.");
  }

  if (onBackground && onSolid) {
    log.warn(
      "You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied."
    );
  }

  const getVariantClasses = (variant: TextVariant) => {
    const [fontType, weight, size] = variant.split('-');
    return [`font-${fontType}`, `font-${weight}`, `font-${size}`];
  };

  const sizeClass = size ? `font-${size}` : '';
  const weightClass = weight ? `font-${weight}` : '';

  const classes = variant
    ? getVariantClasses(variant)
    : [sizeClass, weightClass];

  let colorClass = '';
  if (onBackground) {
    const [scheme, weight] = onBackground.split('-') as [
      ColorScheme,
      ColorWeight,
    ];
    colorClass = `${scheme}-on-background-${weight}`;
  } else if (onSolid) {
    const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
    colorClass = `${scheme}-on-solid-${weight}`;
  }

  const generateClassName = (
    prefix: string,
    token: SpacingToken | undefined
  ) => {
    return token ? `${prefix}-${token}` : undefined;
  };

  const combinedClasses = cn(
    ...classes,
    colorClass,
    className,
    generateClassName('p', padding),
    generateClassName('pl', paddingLeft),
    generateClassName('pr', paddingRight),
    generateClassName('pt', paddingTop),
    generateClassName('pb', paddingBottom),
    generateClassName('px', paddingX),
    generateClassName('py', paddingY),
    generateClassName('m', margin),
    generateClassName('ml', marginLeft),
    generateClassName('mr', marginRight),
    generateClassName('mt', marginTop),
    generateClassName('mb', marginBottom),
    generateClassName('mx', marginX),
    generateClassName('my', marginY)
  );

  return (
    <Component
      className={combinedClasses}
      style={{
        textAlign: align,
        textWrap: wrap,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';

export default Text
