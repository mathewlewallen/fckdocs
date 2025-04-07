'use client';

import type React from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { Icon, Iconbutton, Flex, Text } from '.';
import '@fck/styles/globals.css';
import { clsx } from 'clsx';

interface ToastProps {
  className?: string;
  variant: 'success' | 'danger';
  icon?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const iconMap = {
  success: 'checkCircle',
  danger: 'errorCircle',
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant, className, icon = true, onClose, action, children }, ref) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setVisible(false), 6000);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (!visible && onClose) {
        onClose();  
      }
    }, [visible, onClose]);

    return (
      <Flex
        ref={ref}
        fillWidth
        background="surface"
        radius="l"
        paddingY="12"
        paddingX="20"
        border="neutral-medium"
        role="alert"
        aria-live="assertive"
        className={clsx(className, 'toast', variant, {
          visible: visible,
          hidden: !visible,
        })}
      >
        <Flex fillWidth vertical="center" gap="8">
          {icon && (
            <Icon
              size="l"
              onBackground={`${variant}-medium`}
              name={iconMap[variant]}
            />
          )}
          <Text variant="body-default-s" style={{ width: '100%' }} as="div">
            {children}
          </Text>
          {action && <div>{action}</div>}
          {onClose && (
            <Iconbutton
              variant="ghost"
              icon="close"
              size="m"
              tooltip="Hide"
              tooltipPosition="top"
              onClick={() => setVisible(false)}
            />
          )}
        </Flex>
      </Flex>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast
