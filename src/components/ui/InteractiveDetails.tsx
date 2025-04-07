'use client';

import * as React from 'react';
import { IconButton, Text, Flex } from '@fck/components/ui';
import type { IconButtonProps } from '@fck/components/ui/IconButton';

interface InteractiveDetailsProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  iconButtonProps?: IconButtonProps;
  onClick: () => void;
  className?: string;
  id?: string;
}

const InteractiveDetails: React.FC<InteractiveDetailsProps> = React.forwardRef<
  HTMLDivElement,
  InteractiveDetailsProps
>(({ label, description, iconButtonProps, onClick, className, id }, ref) => {
  return (
    <Flex
      ref={ref}
      direction="column"
      className={className}
      onClick={onClick}
      id={id}
    >
      <Flex gap="4" vertical="center">
        <Text as="span" variant="label-default-m" onBackground="neutral-strong">
          {label}
        </Text>
        {iconButtonProps?.tooltip && (
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              size="s"
              variant="ghost"
              icon="helpCircle"
              {...iconButtonProps}
            />
          </div>
        )}
      </Flex>
      {description && (
        <Text as="span" variant="body-default-s" onBackground="neutral-weak">
          {description}
        </Text>
      )}
    </Flex>
  );
});

InteractiveDetails.displayName = 'InteractiveDetails';

export default InteractiveDetails
export type { InteractiveDetailsProps };
