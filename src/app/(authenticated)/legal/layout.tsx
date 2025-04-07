import type { ReactNode } from 'react';

type LegalLayoutProps = {
  children: ReactNode;
};

const LegalLayout = ({ children }: LegalLayoutProps) => (
  <div className="container mx-auto max-w-5xl py-16">{children}</div>
);

export default LegalLayout;
