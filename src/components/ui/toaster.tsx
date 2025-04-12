'use client';

import type * as React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast, Flex } from '@fck/components/ui';
import type { ToasterProps } from '@fck/components/interfaces';

const Toaster: React.FC<ToasterProps> = ({ toasts, removeToast }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <Flex
      zIndex={10}
      fillWidth
      direction="column"
      maxWidth={32}
      className="toast-container"
    >
      {toasts.map((toast, index, array) => (
        <Flex
          padding="4"
          fillWidth
          position="absolute"
          key={toast.id}
          className="toast-wrapper"
          style={{
            transformOrigin: 'bottom center',
            transform: `scale(${1 - (array.length - 1 - index) * 0.05}) translateY(${1 - (array.length - 1 - index) * 10}%)`,
            opacity: array.length - 1 - index === 0 ? 1 : 0.9,
          }}
        >
          <Toast
            className="toast-animation"
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
            action={toast.action}
          >
            {toast.message}
          </Toast>
        </Flex>
      ))}
    </Flex>,
    document.body
  );
};

Toaster.displayName = 'Toaster';
export default Toaster
