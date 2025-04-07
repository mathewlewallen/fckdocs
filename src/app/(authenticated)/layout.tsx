import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { GlobalSidebar } from '@fck/components/sidebar';
import { PostHogIdentifier } from '@fck/components/ui/posthog-identifier';
import { SidebarProvider } from '@fck/components/ui/Sidebar';
import { env } from '@fck/env';
import { showBetaFeature } from '@fck/lib/feature-flags';
import { NotificationsProvider } from '@fck/lib/notifications/components/provider';
import { auth, currentUser } from '@fck/server/auth/server';
import { secure } from '@fck/server/security';
import { TRPCReactProvider } from '@fck/server/trpc/react';
import type { PropsWithChildren } from 'react';
import '@fck/styles/globals.css';
import type { SpacingToken } from '@fck/components/types';
import { Footer, Header, RouteGuard } from '@fck/components/ui';
import { Background, Column, ToastProvider } from '@fck/components/ui';
import { Flex } from '@fck/components/ui';
import { effects, style } from '@fck/lib/once-ui';
import { home, person } from '@fck/lib/once-ui/content';
import { cn } from '@fck/lib/utils';
import { Inter } from 'next/font/google';
import { Source_Code_Pro } from 'next/font/google';
import '@fck/styles/globals.css';

export async function generateMetadata() {
  return {
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: 'Portfolio website showcasing my work.',
      siteName: `${person.firstName}'s Portfolio`,
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

export default async function AppLayout({ children }: PropsWithChildren) {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    return redirectToSignIn();
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#F9617B' },
        elements: {
          userButtonPopoverMain: 'bg-gray-subtle',
          navbar: 'bg-gradient-to-r from-gray-subtle to-gray-subtle',
          pageScrollBox: 'bg-gray-subtle',
        },
      }}
    >
      <TRPCReactProvider>
        <Flex
          lang="en"
          background="page"
          data-neutral={style.neutral}
          data-brand={style.brand}
          data-accent={style.accent}
          data-solid={style.solid}
          data-solid-style={style.solidStyle}
          data-theme={style.theme}
          data-border={style.border}
          data-surface={style.surface}
          data-transition={style.transition}
          className={cn(
            primary.variable,
            secondary ? secondary.variable : '',
            tertiary ? tertiary.variable : '',
            code.variable
          )}
        >
          <ToastProvider>
            <Column
              style={{ minHeight: '100vh' }}
              fillWidth
              margin="0"
              padding="0"
            >
              <Background
                mask={{
                  cursor: effects.mask.cursor,
                  x: effects.mask.x,
                  y: effects.mask.y,
                  radius: effects.mask.radius,
                }}
                gradient={{
                  display: effects.gradient.display,
                  x: effects.gradient.x,
                  y: effects.gradient.y,
                  width: effects.gradient.width,
                  height: effects.gradient.height,
                  tilt: effects.gradient.tilt,
                  colorStart: effects.gradient.colorStart,
                  colorEnd: effects.gradient.colorEnd,
                  opacity: effects.gradient.opacity as
                    | 0
                    | 10
                    | 20
                    | 30
                    | 40
                    | 50
                    | 60
                    | 70
                    | 80
                    | 90
                    | 100,
                }}
                dots={{
                  display: effects.dots.display,
                  color: effects.dots.color,
                  size: effects.dots.size as unknown as SpacingToken,
                  opacity: effects.dots.opacity as
                    | 0
                    | 10
                    | 20
                    | 30
                    | 40
                    | 50
                    | 60
                    | 70
                    | 80
                    | 90
                    | 100,
                }}
                grid={{
                  display: effects.grid.display,
                  color: effects.grid.color,
                  width: effects.grid.width as unknown as string,
                  height: effects.grid.height as unknown as string,
                  opacity: effects.grid.opacity as
                    | 0
                    | 10
                    | 20
                    | 30
                    | 40
                    | 50
                    | 60
                    | 70
                    | 80
                    | 90
                    | 100,
                }}
                lines={{
                  display: effects.lines.display,
                  opacity: effects.lines.opacity as
                    | 0
                    | 10
                    | 20
                    | 30
                    | 40
                    | 50
                    | 60
                    | 70
                    | 80
                    | 90
                    | 100,
                }}
              />
              <Flex fillWidth minHeight="16" />
              <Header />
              <Flex
                position="relative"
                zIndex={0}
                fillWidth
                paddingY="l"
                paddingX="l"
                horizontal="center"
                flex={1}
              >
                <Flex horizontal="center" fillWidth minHeight="0">
                  <RouteGuard>
                    <NotificationsProvider userId={user.id}>
                      <SidebarProvider>
                        <GlobalSidebar>
                          {betaFeature && (
                            <div className="m-4 rounded-full bg-blue-500 p-1.5 text-center text-sm text-white">
                              Beta feature now available
                            </div>
                          )}
                          {children}
                        </GlobalSidebar>
                        <PostHogIdentifier />
                      </SidebarProvider>
                    </NotificationsProvider>
                  </RouteGuard>
                </Flex>
              </Flex>
              <Footer />
            </Column>
          </ToastProvider>
        </Flex>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
