/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-custom-media': {
      files: './src/styles/media-queries.css'
    },
    'postcss-custom-properties': {
      preserve: true
    },
    'autoprefixer': {}
  },
};

export default config;
