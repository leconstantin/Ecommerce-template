"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
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

const formSchema = z.object({
  email_phone: z.string().min(2, {
    message: "Email or phone number must be at least 2 characters.",
  }),
  receive_updates: z.boolean().optional(),
  country: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string(),
  apartment: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  road_number: z.string().optional(),
  save_info: z.boolean().optional(),
});

export function InfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_phone: "",
      receive_updates: false,
      country: "rwanda",
      first_name: "",
      last_name: "",
      apartment: "",
      city: "",
      state: "",
      road_number: "",
      save_info: false,
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
  }

  return (
    <Form {...form}>
      <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl tracking-tight">
                  Contact
                </FormLabel>
                <FormControl>
                  <Input
                    className="min-h-12 dark:bg-transparent"
                    placeholder="Enter email or mobile phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receive_updates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    className="size-5"
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Email me with news and offers
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl tracking-tight">
                  Shipping address
                </FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="min-h-12 w-full dark:bg-transparent">
                      <SelectValue placeholder="country/region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="dark:bg-popover/80"
                    defaultValue={"rwanda"}
                  >
                    <SelectItem value="rwanda">Rwanda</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="kenya">Kenya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center gap-3">
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
            name="apartment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only text-xl tracking-tight">
                  Apartment
                </FormLabel>
                <FormControl>
                  <Input
                    className="min-h-12 dark:bg-transparent"
                    placeholder="Apartment, Suite, etc (optional)"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-foreground">
                  <InfoIcon className="mr-1 inline-block size-4 text-muted-foreground" />
                  Add a house number if you have one
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only text-xl tracking-tight">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-12 dark:bg-transparent"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only text-xl tracking-tight">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-12 dark:bg-transparent"
                      placeholder="State"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="road_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only text-xl tracking-tight">
                    Road Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-12 dark:bg-transparent"
                      placeholder="Road Number"
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
            name="save_info"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    className="size-5"
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Save this information for next time
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button size="lg" type="submit">
            Continue to Shipping
          </Button>
        </div>
      </form>
    </Form>
  );
}
