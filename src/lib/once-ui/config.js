const baseURL = 'fckdocs.com';

const routes = {
  '/': true,
  '/about': true,
  '/work': true,
  '/blog': true,
  '/gallery': true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {
  '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true,
};

const style = {
  theme: 'dark', // dark | light
  neutral: 'gray', // sand | gray | slate
  brand: 'emerald', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: 'orange', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: 'contrast', // color | contrast
  solidStyle: 'flat', // flat | plastic
  border: 'playful', // rounded | playful | conservative
  surface: 'translucent', // filled | translucent
  transition: 'all', // all | micro | macro
  scaling: 'none', // none | small | medium | large
};

const effects = {
  mask: {
    cursor: true,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: 'brand-background-strong',
    colorEnd: 'static-transparent',
    opacity: 50,
  },
  dots: {
    display: true,
    size: 2,
    color: 'brand-on-background-weak',
    opacity: 20,
  },
  lines: {
    display: false,
    color: 'neutral-alpha-weak',
    opacity: 100,
  },
  grid: {
    display: false,
    color: 'neutral-alpha-weak',
    opacity: 100,
    width: 100,
    height: 100,
  },
};

const display = {
  location: true,
  time: true,
};

const mailchimp = {
  action: 'https://url/subscribe/post?parameters',
  effects: {
    mask: {
      cursor: false,
      x: 100,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      x: 100,
      y: 50,
      width: 100,
      height: 100,
      tilt: -45,
      colorStart: 'accent-background-strong',
      colorEnd: 'static-transparent',
      opacity: 100,
    },
    dots: {
      display: false,
      size: 24,
      color: 'brand-on-background-weak',
      opacity: 100,
    },
    lines: {
      display: false,
      color: 'neutral-alpha-weak',
      opacity: 100,
    },
    grid: {
      display: true,
      color: 'neutral-alpha-weak',
      opacity: 100,
    },
  },
};

// default metadata
const meta = {
  title: 'Once UI for Next.js',
  description:
    'An open-source design system and component library for Next.js that emphasizes easy styling and accessibility in UI development.',
};

// default open graph data
const og = {
  title: meta.title,
  description: meta.description,
  type: 'website',
  image: '/images/cover.jpg',
};

// default schema data
const schema = {
  logo: '',
  type: 'Organization',
  name: 'Once UI',
  description: meta.description,
  email: 'lorant@once-ui.com',
};

// social links
const social = {
  twitter: 'https://www.twitter.com/_onceui',
  linkedin: 'https://www.linkedin.com/company/once-ui/',
  discord: 'https://discord.com/invite/5EyAQ4eNdS',
};

export {
  routes,
  protectedRoutes,
  effects,
  style,
  display,
  mailchimp,
  baseURL,
  meta,
  og,
  schema,
  social,
};
