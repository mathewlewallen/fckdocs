import type { MetadataRoute } from 'next';

const protocol = process.env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith('https')
  ? 'https'
  : 'http';
const url = new URL(`${protocol}://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', url.href).href,
  };
}