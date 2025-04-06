'use client'

import { Waitlist as ClerkWaitlist } from '@clerk/nextjs';

export const Waitlist = () => (
    <ClerkWaitlist
    afterJoinWaitlistUrl="/"
    appearance={{
      elements: {
        header: 'hidden',
      },
    }}
  />
);
