'use client';

import type * as React from 'react';
import { cn } from '@fck/lib/utils';
import { useEffect, useRef } from 'react';

import { Flex } from '@fck/components/ui';

interface ArrowProps {
  trigger: string;
  scale?: number;
  color?: 'onBackground' | 'onSolid';
  style?: React.CSSProperties;
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  trigger,
  scale = 0.8,
  color = 'onBackground',
  style,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerElement = document.querySelector(trigger);

    if (triggerElement && ref.current) {
      const handleMouseOver = () => {
        ref.current?.classList.add('active');
      };

      const handleMouseOut = () => {
        ref.current?.classList.remove('active');
      };

      triggerElement.addEventListener('mouseenter', handleMouseOver);
      triggerElement.addEventListener('mouseleave', handleMouseOut);

      return () => {
        triggerElement.removeEventListener('mouseenter', handleMouseOver);
        triggerElement.removeEventListener('mouseleave', handleMouseOut);
      };
    }
  }, [trigger]);

  return (
    <Flex
      ref={ref}
      position="relative"
      vertical="center"
      horizontal="center"
      className={cn('arrow-container', className)}
      style={{
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <Flex className={cn('arrow', color)} height={0.1} />
      <Flex className={cn('arrow-head', color)} height={0.0875} />
      <Flex className={cn('arrow-head', color)} height={0.0875} />
    </Flex>
  );
};

Arrow.displayName = 'Arrow';
export default Arrow
