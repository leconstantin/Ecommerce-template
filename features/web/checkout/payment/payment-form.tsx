"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const formSchema = z.object({
  phone: z.string().max(10, {
    message: "phone number must be 10 didgits.",
  }),
  first_name: z.string().optional(),
  last_name: z.string(),
});

export function PaymentForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      first_name: "",
      last_name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast(
      <div>
        <div className="mb-2 font-semibold">
          You submitted the following values:
        </div>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );

    //[todo]  send request to payment api
    router.push("/checkout/payment");
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only text-xl tracking-tight">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-12 dark:bg-transparent"
                      placeholder="First name (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only text-xl tracking-tight">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-12 dark:bg-transparent"
                      placeholder="Last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only text-xl tracking-tight">
                  Apartment
                </FormLabel>
                <FormControl>
                  <Input
                    className="min-h-12 dark:bg-transparent"
                    placeholder="079XXXXXXX"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
    <div className="flex w-full justify-between">
        <Button asChild size="lg" variant={"link"}>
          <Link href="/checkout/shipping">
            <ChevronLeftIcon />
            Return to Shipping
          </Link>
        </Button>
        <Button size="lg" type="submit">
          Pay
        </Button>
      </div>
      </form>
    </Form>
  );
}
