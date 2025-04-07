'use client';

import Link from 'next/link';
import type * as React from 'react';
import { useEffect } from 'react';

import type { SpacingToken } from '@fck/components/types';
import { Flex } from '@fck/components/ui';
import { cn } from '@fck/lib/utils';

const sizeMap: Record<string, SpacingToken> = {
  xs: '20',
  s: '24',
  m: '32',
  l: '40',
  xl: '48',
};

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
  wordmark?: boolean;
  icon?: boolean;
  iconSrc?: string;
  wordmarkSrc?: string;
  href?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'm',
  wordmark = true,
  icon = true,
  href,
  iconSrc,
  wordmarkSrc,
  className,
  style,
  ...props
}) => {
  useEffect(() => {
    if (!icon && !wordmark) {
      console.warn(
        "Both 'icon' and 'wordmark' props are set to false. The logo will not render any content."
      );
    }
  }, [icon, wordmark]);

  const content = (
    <>
      {icon && !iconSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className="icon"
        />
      )}
      {iconSrc && (
        <img
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
            width: 'auto',
          }}
          alt="Trademark"
          src={iconSrc}
        />
      )}
      {wordmark && !wordmarkSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className="type"
        />
      )}
      {wordmarkSrc && (
        <img
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
            width: 'auto',
          }}
          alt="Trademark"
          src={wordmarkSrc}
        />
      )}
    </>
  );

  return href ? (
    <Link
      className={cn('radius-l', 'display-flex', 'fit-height', className)}
      style={style}
      href={href}
      aria-label="Trademark"
      {...props}
    >
      {content}
    </Link>
  ) : (
    <Flex
      className={cn(className)}
      radius="l"
      fitHeight
      style={style}
      aria-label="Trademark"
    >
      {content}
    </Flex>
  );
};

Logo.displayName = 'Logo';
export default Logo
