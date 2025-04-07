import { Column, Heading } from '@fck/components/ui';
import { Mailchimp } from '@fck/components/ui';
import { Posts } from '@fck/components/ui';
import { baseURL } from '@fck/lib/once-ui/config';
import { blog, newsletter, person } from '@fck/lib/once-ui/content';
import '@fck/styles/globals.css';

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Blog() {
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            author: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Posts range={[1, 3]} thumbnail allBlogs={[]} />
        <Posts range={[4]} columns="2" allBlogs={[]} />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
