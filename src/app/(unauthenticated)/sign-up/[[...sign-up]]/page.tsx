import { createMetadata } from '@fck/lib/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Create an account';
const description = 'Enter your details to get started.';
const SignUp = dynamic(() =>
  import('@fck/server/auth/components/sign-up').then((mod) => mod.SignUp)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="font-bold text-4xl tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
    <SignUp />
  </>
);

export default SignUpPage;
