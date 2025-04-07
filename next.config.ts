import type { NextConfig } from 'next';
import './src/env.ts';
import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const config: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mdx'],
    },
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
};

export default withMDX(config);
