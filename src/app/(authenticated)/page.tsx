// -------------------------
// Imports
// -------------------------

import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { env } from '@fck/env';
import { auth } from '@fck/server/auth/server';
import { db } from '@fck/server/db';

import { baseURL, routes } from '@fck/lib/once-ui/config';
import { home, about, person, newsletter } from '@fck/lib/once-ui/content';

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Arrow,
  Column,
} from '@fck/lib/once-ui/ui/components';

import { Projects } from '@fck/lib/once-ui/ui/components/work';
import { Posts } from '@fck/lib/once-ui/ui/components/blog';
import { Mailchimp } from '@fck/lib/once-ui/ui/components';

import { Header } from '@fck/components/header';
import { AvatarStack } from '@fck/components/avatar-stack';
import { Cursors } from '@fck/components/cursors';
import { Chatbot } from '@fck/components/chatbot';
import { Langchain } from '@fck/components/langchain';

// Dynamically load collaboration provider to reduce initial bundle size
const CollaborationProvider = dynamic(() =>
  import('@fck/components/collaboration-provider').then((mod) => mod.CollaborationProvider)
);

// -------------------------
// Metadata Generator
// -------------------------

export async function generateMetadata(): Promise<Metadata> {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// -------------------------
// Page Component
// -------------------------

export default async function App() {
  const pages = await db.page.findMany();
  const { orgId } = await auth();

  if (!orgId) notFound();

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      {/* Hero Section */}
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: '-0.75rem', marginRight: '0.25rem' }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* Project Highlight */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>

      {/* Blog Section */}
      {routes['/blog'] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}

      {/* Additional Projects */}
      <Projects range={[2]} />

      {/* Newsletter */}
      {newsletter.display && <Mailchimp newsletter={newsletter} />}

      {/* Collaboration Header (Liveblocks etc.) */}
      <Header pages={['Building Your Application']} page="Data Fetching">
        {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <Chatbot />
            <Langchain />
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>

      {/* Pages Grid */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <div key={page.id} className="aspect-video rounded-xl bg-muted/50">
              {page.name}
            </div>
          ))}
        </div>

        {/* Placeholder/Fallback Section */}
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </Column>
  );
}
