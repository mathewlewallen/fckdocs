'use client';

import type * as React from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { Grid } from './grid';
import { Logo } from './logo';

import { cn } from '@fck/lib/utils';
import type { ComponentProps } from 'react';
import { Flex } from './Flex';

type LogoProps = ComponentProps<typeof Logo>;

interface LogoCloudProps extends React.ComponentProps<typeof Grid> {
  logos: LogoProps[];
  className?: string;
  style?: React.CSSProperties;
  limit?: number;
  rotationInterval?: number;
}

const ANIMATION_DURATION = 5000;
const STAGGER_DELAY = 25;

const LogoCloud = forwardRef<HTMLDivElement, LogoCloudProps>(
  (
    {
      logos,
      className,
      style,
      limit = 6,
      rotationInterval = ANIMATION_DURATION,
      ...rest
    },
    ref
  ) => {
    const [visibleLogos, setVisibleLogos] = useState<LogoProps[]>(() =>
      logos.slice(0, limit)
    );
    const [key, setKey] = useState(0);

    useEffect(() => {
      if (logos.length <= limit) {
        setVisibleLogos(logos);
        return;
      }

      const interval = setInterval(
        () => {
          setVisibleLogos((currentLogos) => {
            const currentIndices = currentLogos.map((logo) =>
              logos.findIndex((l) => l === logo)
            );

            const nextIndices = currentIndices
              .map((index) => (index + 1) % logos.length)
              .sort((a, b) => a - b);

            const nextLogos = nextIndices.map((index) => logos[index]);
            setKey((k) => k + 1);
            return nextLogos;
          });
        },
        rotationInterval + STAGGER_DELAY * limit
      );

      return () => clearInterval(interval);
    }, [logos, limit, rotationInterval]);

    return (
      <Grid
        ref={ref}
        className={cn('container', className)}
        style={style}
        {...rest}
      >
        {visibleLogos.map((logo, index) => (
          <Flex
            key={`${key}-${index}`}
            vertical="center"
            horizontal="center"
            paddingX="24"
            paddingY="20"
            radius="l"
          >
            <Logo
              className="logo"
              style={{
                ...logo.style,
                animationDelay: `${index * STAGGER_DELAY}ms`,
              }}
              {...logo}
            />
          </Flex>
        ))}
      </Grid>
    );
  }
);

LogoCloud.displayName = 'LogoCloud';
export default LogoCloud
