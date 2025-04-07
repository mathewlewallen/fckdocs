import { UserButton } from '@clerk/nextjs';
import { Button } from '@fck/components/ui/Button';
import { SideMenu } from '@fck/components/ui/side-menu';
import { PanelLeftCloseIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import '@fck/styles/globals.css';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh gap-4 p-4">
      <SideMenu />

      <div className="flex flex-1 flex-col rounded-xl border px-6 pt-4 pb-6">
        <nav className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="-ml-2">
            <PanelLeftCloseIcon strokeWidth={1.5} size={18} />
          </Button>
          <UserButton />
        </nav>

        {children}
      </div>
    </main>
  );
}
