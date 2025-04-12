import type { Metadata as NextMetadata } from 'next';
import type { MetaProps } from '@fck/components/interfaces';


export function generateMetadata({
  title,
  description,
  baseURL,
  path = '',
  type = 'website',
  image,
  publishedTime,
  author,
}: MetaProps): NextMetadata {
  const normalizedBaseURL = baseURL.endsWith('/')
    ? baseURL.slice(0, -1)
    : baseURL;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const ogImage = image
    ? `${normalizedBaseURL}${image.startsWith('/') ? image : `/${image}`}`
    : `${normalizedBaseURL}/og?title=${encodeURIComponent(title)}`;

  const url = `${normalizedBaseURL}${normalizedPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      ...(publishedTime && type === 'article' ? { publishedTime } : {}),
      url,
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
    ...(author ? { authors: [{ name: author.name, url: author.url }] } : {}),
  };
}

export const Meta = {
  generate: generateMetadata,
};

export default Meta;
