'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@fck/components/ui/button';

export const ModeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const iconClass = 'h-[1.2rem] w-[1.2rem] transition-all';
  const handleToggle = () => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative shrink-0 text-foreground"
      aria-label="Toggle theme"
    >
      <SunIcon
        className={`${iconClass} ${isDark ? "absolute rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
      <MoonIcon
        className={`${iconClass} ${isDark ? "rotate-0 scale-100" : "-rotate-90 absolute scale-0"}`}
      />
    </Button>
  );
};