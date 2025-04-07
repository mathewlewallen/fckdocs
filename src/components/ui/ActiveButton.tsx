'use client';

import Button from '@fck/components/ui/Button';
import { cn } from '@fck/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
  href: string;
  label: string;
  icon: ReactNode;
}

export default function ActiveButton({ href, label, icon }: Props) {
  const pathname = usePathname();

  return (
    <Button
      variant="secondary"
      className={cn(
        'justify-start gap-3 font-normal',
        pathname === href && 'text-foreground'
      )}
    >
      <Link href={href}>
        {icon}
        <span className="w-full truncate">{label}</span>
      </Link>
    </Button>
  );
}
