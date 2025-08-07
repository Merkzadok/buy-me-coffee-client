"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useUser } from "@/app/provider/currentUserProvider";

const formSchema = z.object({
  image: z.string().min(1, {
    message: "please upload image!",
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

type createProfileType = {
  handleNext: () => void;
};

export const Container = ({ handleNext }: createProfileType) => {
  const { userProvider } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      social: "https://",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (form.formState.errors) handleNext();

    try {
      await axios.post(`http://localhost:4200/profile/${userProvider.id}`, {
        avatarImage: values.image,
        about: values.about,
        name: values.name,
        socialMediaURL: values.social,
        image: values.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileImage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/daywx3gsj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        form.setValue("image", data.secure_url);
        setImage(data.url);
      }
      console.log("dataa image: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const openFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div className="my-[91px] w-[510px] h-[631px] m-auto">
      <h1 className="text-2xl font-bold">Complete your profile page</h1>
      <div className="w-[510px] h-[301px] mt-6">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormLabel>add photo</FormLabel>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="hidden"
                      placeholder="add image"
                      type="file"
                      accept="image/*"
                      {...field}
                      ref={inputRef}
                      onChange={onChange}
                    />
                  </FormControl>

                  <div
                    className="outline-dashed  flex justify-center items-center w-[160px] h-[160px] rounded-full overflow-hidden"
                    onClick={openFile}
                  >
                    {image ? (
                      <img src={image} className="object-fit" />
                    ) : (
                      "Select image"
                    )}
                  </div>

                  <FormMessage />
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
