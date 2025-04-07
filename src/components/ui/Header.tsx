'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Fade, Line, ToggleButton } from '@fck/components/ui';
import '@fck/styles/globals.css';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@fck/components/ui/breadcrumb';
import { Separator } from '@fck/components/ui/Separator';
import { SidebarTrigger } from '@fck/components/ui/Sidebar';
import { display, routes } from '@fck/lib/once-ui/config';
import { about, blog, gallery, person, work } from '@fck/lib/once-ui/content';
import { Fragment, type ReactNode } from 'react';
import { Flex } from './Flex';

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

type HeaderProps = {
  pages: string[];
  page: string;
  children?: ReactNode;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = 'en-US',
}) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export { TimeDisplay };

export default function Header({ pages, page, children }: HeaderProps) {
  const pathname = usePathname() ?? '';

  return (
    <>
      <Fade show="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        show="s"
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Flex
        fitHeight
        className="position"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes['/'] && (
                <ToggleButton
                  prefixIcon="home"
                  href="/"
                  selected={pathname === '/'}
                />
              )}
              <Line vert maxHeight="24" />
              {routes['/about'] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === '/about'}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === '/about'}
                  />
                </>
              )}
              {routes['/work'] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith('/work')}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith('/work')}
                  />
                </>
              )}
              {routes['/blog'] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith('/blog')}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith('/blog')}
                  />
                </>
              )}
              {routes['/gallery'] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href="/gallery"
                    label={gallery.label}
                    selected={pathname.startsWith('/gallery')}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href="/gallery"
                    selected={pathname.startsWith('/gallery')}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">
              {display.time && (
                <TimeDisplay pages={[]} page={''} timeZone={person.location} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pages.map((page, index) => (
                <Fragment key={page}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{page}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              ))}
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{page}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </header>
    </>
  );
};
