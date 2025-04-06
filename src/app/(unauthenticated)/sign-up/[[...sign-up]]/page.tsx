"use client";

import { SignOutButton } from "@clerk/nextjs";

import { Button } from "@fck/components/ui/button";

export default function AuthenticationPage() {

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">Sign Out</h1>
        <p className="text-muted-foreground text-sm">
          Are you sure you want to sign out?
        </p>
        <SignOutButton redirectUrl="/">
          <Button>Confirm</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
