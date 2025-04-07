import { createMetadata } from '@fck/lib/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import '@fck/styles/globals.css';

const title = 'Join the Waitlist';
const description = 'Enter your details to join the waitlist.';
const Waitlist = dynamic(() =>
  import('@fck/server/auth/components/waitlist').then((mod) => mod.Waitlist)
);

export const metadata: Metadata = createMetadata({ title, description });

const WaitlistPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="font-bold text-4xl tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
    <Waitlist />
  </>
);

export default WaitlistPage;
