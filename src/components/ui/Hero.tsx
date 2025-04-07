import { Button } from '@fck/components/ui/Button';
import { env } from '@fck/env';
import { MoveRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-10 lg:py-20">
          <div>
            <Button variant="secondary" size="sm" className="gap-4" asChild>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/waitlist`}>
                {'Join the Beta – Limited Spots Available'}{' '}
                <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center font-bold text-5xl tracking-tighter md:text-7xl">
              Cloud Context
            </h1>
            <h2 className="max-w-2xl text-center font-regular text-3xl tracking-tighter md:text-5xl">
              AI-Powered Business Platform
            </h2>
            <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl">
              Automate your operations, streamline workflows, and scale your
              business—all in one place. Cloud Context combines CRM, CMS, and AI
              automation into one powerful platform.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="secondary" asChild>
              <Link href="/contact">
                Get in touch <PhoneCall className="h-4 w-4" />
              </Link>
            </Button>
            {/*TODO: <Button size="lg" className="gap-4" asChild>
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              Sign up <MoveRight className="h-4 w-4" />
            </Link>
          </Button>*/}
            <Button size="lg" className="gap-4" asChild>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/waitlist`}>
                Join the Waitlist <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
