"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, {
    message: "Invalid month",
  }),
  expYear: z.string().regex(/^\d{4}$/, { message: "Invalid year" }),
  cvc: z.string().regex(/^\d{3}$/, { message: "CVC must be 3 digits" }),
});

type UsernameFieldProps = {
  setStep: Dispatch<SetStateAction<number>>;
};
export function PaymentForm({ setStep }: UsernameFieldProps) {
  const [data, setData] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData(JSON.stringify(values));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow"
      >
        {}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Select a country...</option>
                  {[
                    "USA",
                    "UK",
                    "Canada",
                    "Germany",
                    "France",
                    "Japan",
                    "Australia",
                    "South Korea",
                    "India",
                    "Brazil",
                  ].map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="XXXX XXXX XXXX XXXX"
                  inputMode="numeric"
                  maxLength={16}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="expMonth"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, i) => {
                      const month = `${i + 1}`.padStart(2, "0");
                      return (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expYear"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="">Year</option>
                    {[...Array(10)].map((_, i) => {
                      const year = `${currentYear + i}`;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Input
                    placeholder="CVC"
                    inputMode="numeric"
                    maxLength={3}
                    {...field}
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = input.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 3);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>

        <p className="text-xs text-gray-500 break-words">{data}</p>
      </form>
    </Form>
  );
}
