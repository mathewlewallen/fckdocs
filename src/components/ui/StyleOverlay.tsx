'use client';

import { forwardRef, useState } from 'react';
import { Background, IconButton, StylePanel, Flex } from '@fck/components/ui';
import type { StyleOverlayProps } from '@fck/components/interfaces';
import { cn } from '@fck/lib/utils';

const StyleOverlay = forwardRef<HTMLDivElement, StyleOverlayProps>(
  ({ iconButtonProps, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Flex ref={ref}>
        <IconButton
          variant="primary"
          onClick={togglePanel}
          icon="sparkle"
          {...iconButtonProps}
        />
        <Flex
          as="aside"
          zIndex={3}
          className={cn('panel', isOpen && 'open')}
          maxWidth={28}
          style={{
            maxHeight: 'calc(100% - var(--static-space-4))',
          }}
          fillHeight
          position="absolute"
          shadow="xl"
          top="2"
          right="2"
          transition="macro-medium"
          background="page"
          overflow="hidden"
          radius="xl"
          border="neutral-medium"
          {...rest}
        >
          <StylePanel fill overflowY="scroll" padding="8" />
          <Flex
            position="absolute"
            paddingTop="8"
            paddingRight="12"
            top="0"
            right="0"
          >
            <Background
              position="absolute"
              top="0"
              right="8"
              left={undefined}
              width={8}
              height={4}
              mask={{ x: 100, y: 0, radius: 7 }}
              dots={{ display: true, size: '2', color: 'page-background' }}
            />
            <IconButton
              variant="secondary"
              onClick={togglePanel}
              icon="close"
              {...iconButtonProps}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

StyleOverlay.displayName = 'StyleOverlay';
export default StyleOverlay
