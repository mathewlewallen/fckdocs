import type { Route } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function AuthenticationPage() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
      <SignIn />

      <p className="px-8 text-center text-muted-foreground text-sm">
        By clicking continue, you agree to our{" "}
        <Link
          href={"/terms" as Route}
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={"/privacy" as Route}
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
