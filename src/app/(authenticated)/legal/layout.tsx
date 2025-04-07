import type * as React from 'react';
import '@fck/styles/globals.css';

type LegalLayoutProps = {
  children: React.ReactNode;
};

const LegalLayout = ({ children }: LegalLayoutProps) => (
  <div className="container mx-auto max-w-5xl py-16">{children}</div>
);

export default LegalLayout;
