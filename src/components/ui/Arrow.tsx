'use client';

import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import '@fck/styles/globals.css';
import { Flex } from '@fck/components/ui/Flex';

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
      className={clsx('arrow-container', className)}
      style={{
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <Flex className={clsx('arrow', color)} height={0.1} />
      <Flex className={clsx('arrow-head', color)} height={0.0875} />
      <Flex className={clsx('arrow-head', color)} height={0.0875} />
    </Flex>
  );
};

Arrow.displayName = 'Arrow';
export default Arrow
