"use client";

import * as React from "react";
import { cn } from "@fck/lib/utils";
import { Spinner, Icon, Arrow, Flex, ElementType } from "@fck/components/ui";
import type { ButtonProps, AnchorButtonProps } from '@fck/components/interfaces';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps | AnchorButtonProps>(
  (
    {
      variant = "primary",
      size = "m",
      radius,
      label,
      weight = "strong",
      children,
      prefixIcon,
      suffixIcon,
      loading = false,
      fillWidth = false,
      justifyContent = "center",
      href,
      id,
      arrowIcon = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const iconSize = size === "l" ? "s" : size === "m" ? "s" : "xs";
    const radiusSize = size === "s" || size === "m" ? "m" : "l";

    return (
      <ElementType
        id={id}
        href={href}
        ref={ref}
        className={cn(
          'button',
          variant,
          size,
          radius === 'none'
            ? "radius-none"
            : radius
            ? `radius-${radiusSize}-${radius}`
            : `radius-${radiusSize}`,
          "text-decoration-none",
          "button",
          "cursor-interactive",
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
        {loading && <Spinner size={size} />}
        {(label || children) && (
          <Flex
            paddingX="4"
            paddingY="0"
            textWeight={weight}
            textSize={size}
            className="font-label"
          >
            {label || children}
          </Flex>
        )}
        {arrowIcon && (
          <Arrow
            style={{
              marginLeft: "calc(-1 * var(--static-space-4))",
            }}
            trigger={`#${id}`}
            scale={size === "s" ? 0.8 : size === "m" ? 0.9 : 1}
            color={variant === "primary" ? "onSolid" : "onBackground"}
          />
        )}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </ElementType>
    );
  }
);

Button.displayName = "Button";
export default Button;