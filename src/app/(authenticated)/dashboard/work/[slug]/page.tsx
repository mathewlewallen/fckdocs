import {
  AvatarGroup,
  Button,
  Column,
  Heading,
  SmartImage,
  Text,
} from '@fck/components/ui';
import { Flex } from '@fck/components/ui';
import ScrollToHash from '@fck/components/ui/ScrollToHash';
import { CustomMDX } from '@fck/components/ui/custom-mdx';
import { baseURL } from '@fck/lib/once-ui/config';
import { person } from '@fck/lib/once-ui/content';
import { formatDate } from '@fck/lib/once-ui/utils/formatDate';
import { getPosts } from '@fck/lib/once-ui/utils/utils';
import { notFound } from 'next/navigation';
import '@fck/styles/globals.css';

interface WorkParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(['src', 'app', 'work', 'projects']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: WorkParams) {
  const post = getPosts(['src', 'app', 'work', 'projects']).find(
    (post) => post.slug === slug
  );

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;

  return {
    title,
    description,
    images,
    team,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://${baseURL}/work/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Project({ params }: WorkParams) {
  const post = getPosts(['src', 'app', 'work', 'projects']).find(
    (post) => post.slug === params.slug
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image,
            url: `https://${baseURL}/work/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button
          href="/work"
          variant="tertiary"
          weight="default"
          size="s"
          prefixIcon="chevronLeft"
        >
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          alt="image"
          src={post.metadata.images[0] || ''}
        />
      )}
      <Column style={{ margin: 'auto' }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && (
            <AvatarGroup reverse avatars={avatars} size="m" />
          )}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
