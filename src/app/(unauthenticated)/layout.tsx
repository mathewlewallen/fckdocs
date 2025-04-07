import { ModeToggle } from '@fck/components/ui/mode-toggle';
import Icon from '@fck/public/favicon.ico';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-foreground dark:bg-sidebar-ring" />
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
        }}
      />
      <div className="relative z-20 flex items-center font-medium text-lg">
        <Link href="/" className="flex items-center">
          <Image src={Icon} alt="logo" className="mr-5 h-6 w-6" />
          <span>F*ck Documentation</span>
        </Link>
      </div>
      <div className="absolute top-8 right-6 z-30">
        <div className="[&_button]:h-12 [&_button]:w-12 [&_button]:text-white [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-white">
          <ModeToggle />
        </div>
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;This library has saved me countless hours of work and helped
            me deliver stunning designs to my clients faster than ever
            before.&rdquo;
          </p>
          <footer className="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
