'use client';

import { IconButton, SmartImage } from '@fck/components/ui';
import { useEffect, useRef, useState } from 'react';
import '@fck/styles/globals.css';
import { Flex } from '@fck/components/ui/Flex';
import { clsx } from 'clsx';

interface SideContent {
  src: string | React.ReactNode;
  alt?: string;
}

interface CompareImageProps extends React.ComponentProps<typeof Flex> {
  leftContent: SideContent;
  rightContent: SideContent;
}

const renderContent = (content: SideContent, clipPath: string) => {
  if (typeof content.src === 'string') {
    return (
      <SmartImage
        src={content.src}
        alt={content.alt || ''}
        fill
        position="absolute"
        style={{ clipPath }}
      />
    );
  }

  return (
    <Flex fill position="absolute" style={{ clipPath }}>
      {content.src}
    </Flex>
  );
};

export default function CompareImage({
  leftContent,
  rightContent,
  ...rest
}: CompareImageProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updatePosition = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const containerWidth = rect.width;

    // Calculate percentage (constrained between 0 and 100)
    const newPosition = Math.max(0, Math.min(100, (x / containerWidth) * 100));
    setPosition(newPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    updatePosition(e.touches[0]?.clientX || 0);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <Flex
      position="relative"
      ref={containerRef}
      aspectRatio="16/9"
      fillWidth
      style={{ touchAction: 'none' }}
      {...rest}
    >
      {renderContent(leftContent, `inset(0 ${100 - position}% 0 0)`)}
      {renderContent(rightContent, `inset(0 0 0 ${position}%)`)}

      {/* Hit area and visible line */}
      <Flex
        position="absolute"
        horizontal="center"
        width={3}
        className={clsx('hitArea')}
        top="0"
        bottom="0"
        style={{
          left: `${position}%`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <Flex width="1" fillHeight background="neutral-strong" zIndex={2} />
      </Flex>
      <IconButton
        icon="chevronsLeftRight"
        variant="secondary"
        className={clsx('dragIcon')}
        style={{
          left: `${position}%`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
    </Flex>
  );
};

CompareImage.displayName = 'CompareImage';
