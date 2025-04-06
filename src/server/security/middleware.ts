import {
  type NoseconeOptions,
  defaults,
  withVercelToolbar,
} from '@nosecone/next';
export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions: NoseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which Cloud Context features are enabled. See
  // https://docs.cloudcontext.cc/features/security/headers for guidance on how
  // to configure it.
  contentSecurityPolicy: false,
};

export const noseconeOptionsWithToolbar: NoseconeOptions =
  withVercelToolbar(noseconeOptions);

/*import {
  type NoseconeOptions,
  defaults,
  withVercelToolbar,
} from '@nosecone/next';
export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions: NoseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which cloudcontext features are enabled. See
  // https://docs.cloudcontext.cc/features/security/headers for guidance on how
  // to configure it.
  contentSecurityPolicy: {
    ...defaults.contentSecurityPolicy,
    directives: {
      ...defaults.contentSecurityPolicy.directives,
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:3004',
        'http://localhost:3005',
        'http://localhost:3333',
        'http://localhost:6006',
        'http://localhost:61566',
        'ws://localhost:3000',
        'ws://localhost:3001',
        'ws://localhost:3002',
        'ws://localhost:3003',
        'ws://localhost:3004',
        'ws://localhost:3005',
        'ws://localhost:3333',
        'ws://localhost:6006',
        'ws://localhost:61566',
        // TODO: Check back in on this
        // We have to use unsafe-inline because next-themes and Vercel Analytics
        // do not support nonce
        // https://github.com/pacocoursey/next-themes/issues/106
        // https://github.com/vercel/analytics/issues/122
        //...noseconeDefaults.contentSecurityPolicy.directives.scriptSrc,
        "https://www.googletagmanager.com",
        "https://*.clerk.accounts.dev",
        "https://clerk.*.cloudcontext.cc",
        "https://clerk.cloudcontext.cc",
        "https://va.vercel-scripts.com",
      ],
      connectSrc: [
        ...defaults.contentSecurityPolicy.directives.connectSrc,
        "'self'",
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:3004',
        'http://localhost:3005',
        'http://localhost:3333',
        'http://localhost:6006',
        'http://localhost:61566',       
        'ws://localhost:3000',
        'ws://localhost:3001',
        'ws://localhost:3002',
        'ws://localhost:3003',
        'ws://localhost:3004',
        'ws://localhost:3005',
        'ws://localhost:3333',
        'ws://localhost:6006',
        'ws://localhost:61566',
        "https://clerk.*.cloudcontext.cc",
        "https://clerk.cloudcontext.cc",
        "https://*.clerk.accounts.dev",
        "https://*.google-analytics.com",
        "https://clerk-telemetry.com",
      ],
      workerSrc: [
        ...defaults.contentSecurityPolicy.directives.workerSrc,
        "blob:",
        "'self'",
        "data:",
        "https://*.clerk.accounts.dev"
      ],
      imgSrc: [
        ...defaults.contentSecurityPolicy.directives.imgSrc,
        "'self'",
        'blob:',
        'data:',
        "https://img.clerk.com",
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:3004',
        'http://localhost:3005',
        'http://localhost:3333',
        'http://localhost:6006',
        'http://localhost:61566',
        'ws://localhost:3000',
        'ws://localhost:3001',
        'ws://localhost:3002',
        'ws://localhost:3003',
        'ws://localhost:3004',
        'ws://localhost:3005',
        'ws://localhost:3333',
        'ws://localhost:6006',
        'ws://localhost:61566',
      ],
      objectSrc: [
        ...defaults.contentSecurityPolicy.directives.objectSrc,
      ],
      upgradeInsecureRequests: process.env.NODE_ENV === "production",
    },
  },
}

export const noseconeOptionsWithToolbar: NoseconeOptions =
  withVercelToolbar(noseconeOptions);
*/
