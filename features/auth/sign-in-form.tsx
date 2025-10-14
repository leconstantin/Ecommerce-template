"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { PasswordInput } from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signInFormSchema, type TsignFormSchema } from "./schema";
export default function SignInForm() {
  const [isLoading] = useState<string | null>(null);
  // after sign in go to home page
  const router = useRouter();
  // when hve signed in store something in local storage to know that the user is signed in

  const form = useForm<TsignFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = () => {
    toast.success("Sign-in successful!");
    router.push("/dashboard");
    form.reset();
    localStorage.setItem("isSignedIn", "true");
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Sign In to Your Account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password to continue.
        </p>
      </header>

      {/* Form */}
      <Form {...form}>
        <form
          aria-busy={!!isLoading}
          className="grid gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    disabled={!!isLoading}
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel className="flex items-center justify-between">
                  Password
                  <Link
                    className="text-muted-foreground text-sm underline underline-offset-4"
                    href="/"
                  >
                    Forgot Password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    className="rounded-none"
                    disabled={!!isLoading}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            className="w-full cursor-pointer rounded-none"
            disabled={!!isLoading}
            type="submit"
          >
            {isLoading === "credentials" ? (
              <>
                <Spinner />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      {/* OAuth Buttons */}
      <div className="flex items-center justify-between gap-2">
        <Button
          aria-label="Sign in with Google"
          className="flex-1 rounded-none"
          disabled={isLoading === "google"}
          type="button"
          variant="outline"
        >
          <FcGoogle className="text-lg" />
          <span className="ml-2">Google</span>
        </Button>
        <Button
          aria-label="Sign in with GitHub"
          className="flex-1 rounded-none"
          disabled={isLoading === "github"}
          type="button"
          variant="outline"
        >
          <FaGithub className="text-lg" />
          <span className="ml-2">GitHub</span>
        </Button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          aria-disabled={!!isLoading}
          className={cn(
            "transition-all duration-300 hover:underline hover:underline-offset-4",
            isLoading && "pointer-events-none cursor-not-allowed opacity-50"
          )}
          href="/"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}
