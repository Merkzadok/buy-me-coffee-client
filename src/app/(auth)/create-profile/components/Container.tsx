"use client";
import { Camera } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Image from "next/image";

const formSchema = z.object({
  image: z.string().min(2, {
    message: "please enter image",
  }),
  name: z.string().min(2, {
    message: "name must be at least 4 characters.",
  }),
  about: z.string().min(5, {
    message: "please enter info about yourself",
  }),
  social: z.string().min(9, {
    message: "please enter a social link",
  }),
});

export const Container = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      social: "https://",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="my-[91px] w-[510px] h-[631px] m-auto">
      <h1 className="text-2xl font-bold">Complete your profile page</h1>
      <div className="w-[510px] h-[301px] mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormLabel>add photo</FormLabel>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className="outline-dashed  flex justify-center items-center w-[160px] h-[160px] rounded-full"
                      {...field}
                    >
                      <Image
                        className="pl-[75px] pt-[75px]"
                        src="/profile.png"
                        width={160}
                        height={160}
                        alt="profile"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormLabel>Name</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>About</FormLabel>
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[510px] h-[131px] outline-solid rounded-sm text-gray-300"
                      placeholder="About"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Social media URL</FormLabel>
            <FormField
              control={form.control}
              name="social"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="flex my-6 mx-[264px] justify-center items-center text-end w-[246px] h-[40px] rounded-sm bg-[#b9b9c0] text-white"
              type="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
