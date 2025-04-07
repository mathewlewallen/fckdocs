import {
  Avatar,
  Button,
  Column,
  Heading,
  RevealFx,
  Text,
} from '@fck/components/ui';
import { Flex } from '@fck/components/ui';
import { Mailchimp } from '@fck/components/ui/mailchimp';
import { Projects } from '@fck/components/ui/projects';
import { Posts } from '@fck/components/ui';
import { routes } from '@fck/lib/once-ui/config';
import { about, home, newsletter, person } from '@fck/lib/once-ui/content';
import '@fck/styles/globals.css';

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: home.title,
            description: home.description,
            publisher: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
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
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} allProjects={[]} />
      </RevealFx>
      {routes['/blog'] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" allBlogs={[]} />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} allProjects={[]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
