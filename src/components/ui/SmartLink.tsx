'use client';

import { clsx } from 'clsx';
import type React from 'react';
import { type ReactNode, forwardRef } from 'react';
import { Icon } from '.';
import { ElementType } from './ElementType';

interface CommonProps {
  prefixIcon?: string;
  suffixIcon?: string;
  fillWidth?: boolean;
  iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
  selected?: boolean;
  unstyled?: boolean;
  children: ReactNode;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}

export type SmartLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  (
    {
      href,
      prefixIcon,
      suffixIcon,
      fillWidth = false,
      iconSize = 'xs',
      style,
      className,
      selected,
      unstyled = false,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </>
    );

    const commonProps = {
      ref,
      className: clsx(
        className,
        'display-inline-flex g-8 radius-s align-items-center',
        {
          'fill-width': fillWidth,
          'fit-width': !fillWidth,
          'mx-4 px-4': !unstyled,
        }
      ),
      style: unstyled
        ? {
            textDecoration: 'none',
            ...style,
          }
        : {
            ...(selected && {
              textDecoration: 'underline',
            }),
            ...style,
          },
      ...props,
    };

    return (
      <ElementType href={href} {...commonProps}>
        {content}
      </ElementType>
    );
  }
);

SmartLink.displayName = 'SmartLink';

export default SmartLink
