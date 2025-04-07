'use client';

import type * as React from 'react';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Flex } from './Flex';

import { cn } from '@fck/lib/utils';
interface MaskOptions {
  maskPosition?: string;
}

interface HoloFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  light?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    mask?: MaskOptions;
  };
  burn?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    mask?: MaskOptions;
  };
  texture?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    image?: string;
    mask?: MaskOptions;
  };
}

const formatMask = (maskPosition = '100 200'): string => {
  const [x, y] = maskPosition.split(' ');
  const formattedX = `${x}%`;
  const formattedY = `${y ? y : x}%`;
  return `radial-gradient(ellipse ${formattedX} ${formattedY} at var(--gradient-pos-x, 50%) var(--gradient-pos-y, 50%), black 50%, transparent 100%)`;
};

const getMaskStyle = (mask?: MaskOptions): string => {
  return mask?.maskPosition ? formatMask(mask.maskPosition) : formatMask();
};

const HoloFx: React.FC<HoloFxProps> = ({
  children,
  light,
  burn,
  texture,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  let lastCall = 0;

  const lightDefaults = {
    opacity: 30,
    blending: 'color-dodge' as CSSProperties['mixBlendMode'],
    mask: getMaskStyle(light?.mask),
    ...light,
  };

  const burnDefaults = {
    opacity: 30,
    filter: 'brightness(0.2) contrast(2)',
    blending: 'color-dodge' as CSSProperties['mixBlendMode'],
    mask: getMaskStyle(burn?.mask),
    ...burn,
  };

  const textureDefaults = {
    opacity: 10,
    blending: 'color-dodge' as CSSProperties['mixBlendMode'],
    image:
      'repeating-linear-gradient(-45deg, var(--static-white) 0, var(--static-white) 1px, transparent 3px, transparent 2px)',
    mask: getMaskStyle(texture?.mask),
    ...texture,
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall < 16) return;
      lastCall = now;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = ((offsetX - centerX) / centerX) * 100;
      const deltaY = ((offsetY - centerY) / centerY) * 100;

      element.style.setProperty('--gradient-pos-x', `${deltaX}%`);
      element.style.setProperty('--gradient-pos-y', `${deltaY}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Flex
      position="relative"
      overflow="hidden"
      className="holo-fx"
      ref={ref}
      {...rest}
    >
      <Flex fill className="base">
        {children}
      </Flex>
      <Flex
        hide="m"
        position="absolute"
        fill
        pointerEvents="none"
        className={cn('overlay', 'burn')}
        style={{
          ['--burn-opacity' as any]: burnDefaults.opacity + '%',
          filter: burnDefaults.filter,
          mixBlendMode: burnDefaults.blending,
          maskImage: burnDefaults.mask as string,
        }}
      >
        {children}
      </Flex>
      <Flex
        hide="m"
        position="absolute"
        fill
        pointerEvents="none"
        className={cn('overlay', 'light')}
        style={{
          ['--light-opacity' as any]: lightDefaults.opacity + '%',
          filter: lightDefaults.filter,
          mixBlendMode: lightDefaults.blending,
          maskImage: lightDefaults.mask as string,
        }}
      >
        {children}
      </Flex>
      <Flex
        hide="m"
        position="absolute"
        fill
        pointerEvents="none"
        className={cn('overlay', 'texture')}
        style={{
          ['--texture-opacity' as any]: textureDefaults.opacity + '%',
          backgroundImage: textureDefaults.image,
          filter: textureDefaults.filter,
          mixBlendMode: textureDefaults.blending,
          maskImage: textureDefaults.mask as string,
        }}
      ></Flex>
    </Flex>
  );
};

HoloFx.displayName = 'HoloFx';
export default HoloFx
