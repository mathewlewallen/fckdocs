import {
  AvatarGroup,
  Button,
  Column,
  Heading,
  Row,
  Text,
} from '@fck/components/ui';
import ScrollToHash from '@fck/components/ui/ScrollToHash';
import { CustomMDX } from '@fck/components/ui/custom-mdx';
import { baseURL } from '@fck/lib/once-ui/config';
import { person } from '@fck/lib/once-ui/content';
import { formatDate } from '@fck/lib/once-ui/utils/formatDate';
import { getPosts } from '@fck/lib/once-ui/utils/utils';
import { notFound } from 'next/navigation';
import '@fck/styles/globals.css';

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: BlogParams) {
  const post = getPosts(['src', 'app', 'blog', 'posts']).find(
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
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Blog({ params }: BlogParams) {
  const post = getPosts(['src', 'app', 'blog', 'posts']).find(
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
    <Column as="section" maxWidth="xs" gap="l">
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
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Button
        href="/blog"
        weight="default"
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
      >
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      <Row gap="12" vertical="center">
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
      </Row>
      <Column as="article" fillWidth>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
