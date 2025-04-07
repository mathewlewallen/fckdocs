import { Column } from '@fck/components/ui';
import { Projects } from '@fck/components/ui';
import { baseURL } from '@fck/lib/once-ui/config';
import { person, work } from '@fck/lib/once-ui/content';
import { getPosts } from '@fck/lib/once-ui/utils/utils';

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/work/`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Work() {
  const allProjects = getPosts(['src', 'app', 'work', 'projects']);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              '@type': 'CreativeWork',
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
            })),
          }),
        }}
      />
      <Projects allProjects={[]} />
    </Column>
  );
}
