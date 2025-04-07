'use client';

import {
  Flex,
  ElementType,
  Arrow,
  Icon,
  Spinner,
} from '@fck/components/ui';
import { cn } from '@fck/lib/utils';
import type * as React from 'react';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';


function getIconSize(size: ButtonSize): 'xs' | 's' {
  switch (size) {
    case 'lg':
    case 'default':
      return 's';
    default:
      return 'xs';
  }
}

function getTextSize(size: ButtonSize): 's' | 'm' | 'l' {
  switch (size) {
    case 'sm':
      return 's';
    case 'lg':
      return 'l';
    default:
      return 'm';
  }
}

function getRadiusClass(radius: Radius | undefined, size: ButtonSize): string {
  const radiusSize = size === 'sm' || size === 'default' ? 'm' : 'l';
  if (radius === 'none') { return 'radius-none'; }
  return radius ? `radius-${radiusSize}-${radius}` : `radius-${radiusSize}`;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-subtle-border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-salmon to-pink text-white hover:opacity-90 dark:text-black',
        destructive: 'bg-red text-white hover:bg-red-solid-hover',
        outline: 'border border-gray-subtle-border bg-gray-element text-foreground-muted hover:bg-gray-element-hover hover:text-foreground',
        ghost: 'text-foreground-muted hover:bg-gray-element hover:text-foreground',
        link: 'relative bg-gradient-to-br from-salmon to-pink bg-clip-text text-transparent before:absolute before:bottom-0 before:h-px before:w-[calc(100%-24px)] before:rounded-full before:bg-gradient-to-br before:from-salmon before:to-pink hover:opacity-90',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1.5',
        lg: 'px-3 py-1.5 lg:px-4 lg:py-2 lg:text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
type Radius =
  | 'none'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left';

interface CommonProps {
  label?: string;
  weight?: 'default' | 'strong';
  prefixIcon?: string;
  suffixIcon?: string;
  loading?: boolean;
  fillWidth?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  children?: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  arrowIcon?: boolean;
  radius?: Radius;
  asChild?: boolean;
}

export type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      radius,
      label,
      weight = 'strong',
      children,
      prefixIcon,
      suffixIcon,
      loading = false,
      fillWidth = false,
      justifyContent = 'center',
      href,
      id,
      arrowIcon = false,
      className,
      style,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? 'a' : 'button';
    const iconSize = getIconSize(size);
    const textSize = getTextSize(size);
    const radiusClass = getRadiusClass(radius, size);

    return (
      <ElementType
        as={Comp}
        id={id}
        href={href}
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          'button',
          radiusClass,
          'cursor-interactive text-decoration-none',
          {
            'fill-width': fillWidth,
            'fit-width': !fillWidth,
            [`justify-${justifyContent}`]: justifyContent,
          },
          className
        )}
        style={style}
        {...props}
      >
        {prefixIcon && !loading && <Icon name={prefixIcon} size={iconSize} />}
        {loading && <Spinner size={size === 'sm' ? 's' : size === 'default' ? 'm' : 'l'} />}
        {(label || children) && (
          <Flex
            paddingX="4"
            paddingY="0"
            textWeight={weight}
            textSize={textSize}
            className="font-label"
          >
            {label || children}
          </Flex>
        )}
        {arrowIcon && (
          <Arrow
            style={{ marginLeft: 'calc(-1 * var(--static-space-4))' }}
            trigger={`#${id}`}
            scale={size === 'sm' ? 0.8 : size === 'default' ? 0.9 : 1}
            color={variant === 'default' ? 'onSolid' : 'onBackground'}
          />
        )}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </ElementType>
    );
  }
);

Button.displayName = 'Button';
export default Button;
export { buttonVariants };
