'use client'

import { Flex } from '@fck/components/ui';
import { useEffect, useState } from 'react';
import type * as React from 'react';
import { cn } from '@fck/lib/utils';

interface ScrollToTopProps extends React.ComponentProps<typeof Flex> {
  offset?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  children,
  offset = 300,
  className,
  ...rest
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > offset);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Flex
      onClick={scrollToTop}
      aria-hidden={!isVisible}
      position="fixed"
      bottom="16"
      right="16"
      className={cn('scrollToTop', className)}
      data-visible={isVisible}
      tabIndex={isVisible ? 0 : -1}
      zIndex={isVisible ? 8 : 0}
      cursor="pointer"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default ScrollToTop;
