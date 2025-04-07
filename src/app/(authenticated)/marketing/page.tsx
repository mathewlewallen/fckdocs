'use client';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { Button } from '@fck/components/ui/Button';
import { CreatePost } from '@fck/components/ui/create-post';
import LoadingComponent from '@fck/components/ui/loading';
import { Animated_div, Animated_h1, Animated_p } from '@fck/lib/animated';
import getStripe from '@fck/lib/payments/getStripe';
import { api } from '@fck/server/trpc/react';
import {
  ArrowRight,
  BotMessageSquare,
  CheckCircle,
  Database,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import type Stripe from 'stripe';
import '@fck/styles/globals.css';

const features = [
  {
    icon: Zap,
    title: 'Next.js 14+',
    description:
      'Built with the latest App Router for optimal performance and developer experience.',
  },
  {
    icon: BotMessageSquare,
    title: 'Clerk Auth',
    description: 'Seamless and secure user authentication and management.',
  },
  {
    icon: Database,
    title: 'tRPC & Prisma',
    description:
      'End-to-end typesafe APIs connecting directly to your database.',
  },
  {
    icon: CheckCircle,
    title: 'Stripe Ready',
    description:
      'Integrate payments and subscriptions easily (code structure included).',
  },
];

export default function Home() {
  const { mutate: getCheckoutSession } =
    api.stripe.getCheckoutSession.useMutation({
      onSuccess: async (session: Stripe.Response<Stripe.Checkout.Session>) => {
        const stripe = await getStripe();
        console.log('Stripe session obtained:', session);
      },
      onError: (error) => {
        console.error('Stripe checkout error:', error);
      },
    });

  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-slate-100">
        <LoadingComponent />
      </div>
    );
  }

  const { data: premiumData, isLoading: isPremiumLoading } = {
    data: { isPremium: false },
    isLoading: false,
  };

  if (isPremiumLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-100">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      <section className="w-full bg-gradient-to-b from-background via-background to-muted/30 py-24 text-center md:py-32 lg:py-40">
        <div className="container mx-auto max-w-4xl px-5">
          <Animated_h1
            className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text font-bold text-5xl text-transparent tracking-[-0.02em] drop-shadow-sm md:text-7xl lg:text-8xl/[5.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Balancer>Build Fullstack Apps Faster</Balancer>
          </Animated_h1>
          <Animated_p
            className="mt-6 animate-fade-up text-center text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Balancer>
              A Next.js boilerplate with Clerk, tRPC, Prisma, Stripe, and more.
              Stop rebuilding auth and basic setup, start building your
              features.
            </Balancer>
          </Animated_p>
          <Animated_div
            className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {user ? (
              <>
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/app/post">
                    Go to App posts <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/tos">
                    Terms of Service <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/privacy">
                    Privacy Policy <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/">
                    Home <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/docs">
                    Docs <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <SignOutButton>
                  <Button variant="outline" size="lg">
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            )}
          </Animated_div>
        </div>
      </section>
      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-5">
          <h2 className="text-center font-bold text-3xl tracking-tight md:text-4xl">
            Packed with Features You Need
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Modern tools for a modern web application.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-5 text-center">
          {user ? (
            <div>
              <h2 className="font-semibold text-2xl tracking-tight md:text-3xl">
                Welcome back, {user.firstName || user.fullName}!
              </h2>
              <p className="mt-3 text-muted-foreground">
                Ready to create something new?
              </p>
              <div className="mt-8 flex flex-col items-center">
                <CreatePost />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-semibold text-2xl tracking-tight md:text-3xl">
                Ready to Dive In?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Sign up or log in to start creating and managing your content.
              </p>
              <div className="mt-6">
                <SignInButton mode="modal">
                  <Button size="lg">Sign Up / Log In</Button>
                </SignInButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
