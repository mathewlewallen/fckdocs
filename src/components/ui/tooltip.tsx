'use client';

import { cn } from '@fck/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import type React from 'react';
import { type ReactNode, forwardRef } from 'react';
import { Icon } from '.';
import { Flex } from './Flex';

type TooltipProps = {
  label: ReactNode;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
  style?: React.CSSProperties;
};

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit animate-in text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ label, prefixIcon, suffixIcon, className, style }, ref) => {
    return (
      <Flex
        hide="m"
        ref={ref}
        style={{
          whiteSpace: 'nowrap',
          userSelect: 'none',
          ...style,
        }}
        vertical="center"
        gap="4"
        zIndex={1}
        background="surface"
        paddingY="4"
        paddingX="8"
        radius="s"
        border="neutral-medium"
        role="tooltip"
        className={clsx(className)}
      >
        {prefixIcon && <Icon name={prefixIcon} size="xs" />}
        <Flex
          paddingX="2"
          vertical="center"
          textVariant="body-default-xs"
          onBackground="neutral-strong"
        >
          {label}
        </Flex>
        {suffixIcon && <Icon name={suffixIcon} size="xs" />}
      </Flex>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip
export { TooltipProvider, TooltipTrigger, TooltipContent };
