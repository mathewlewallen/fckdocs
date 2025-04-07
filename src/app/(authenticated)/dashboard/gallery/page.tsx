import { Flex } from '@fck/components/ui/Flex';
import MasonryGrid from '@fck/components/ui/MasonryGrid';
import { baseURL } from '@fck/lib/once-ui/config';
import { gallery, person } from '@fck/lib/once-ui/content';

export async function generateMetadata() {
  const title = gallery.title;
  const description = gallery.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/gallery`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Gallery() {
  return (
    <Flex fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: gallery.title,
            description: gallery.description,
            url: `https://${baseURL}/gallery`,
            image: gallery.images.map((image) => ({
              '@type': 'ImageObject',
              description: image.alt,
            })),
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
      <MasonryGrid />
    </Flex>
  );
}
