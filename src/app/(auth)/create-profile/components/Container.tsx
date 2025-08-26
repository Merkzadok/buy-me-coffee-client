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
import { ChangeEvent, useState, useRef } from "react";
import { useUser } from "@/app/provider/currentUserProvider";

const formSchema = z.object({
  image: z.string().min(1, { message: "Please upload an image!" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().min(5, { message: "Please enter info about yourself" }),
  social: z.string().min(9, { message: "Please enter a social link" }),
});

type ContainerProps = {
  handleNext: () => void;
};

export const Container = ({ handleNext }: ContainerProps) => {
  const { userProvider, loading } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      social: "https://",
    },
  });

  if (loading) return <p>Loading user info...</p>;
  if (!userProvider?.id) return <p>Please login to complete your profile.</p>;

  const openFile = () => inputRef.current?.click();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileImage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/daywx3gsj/image/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        form.setValue("image", data.secure_url);
        setImagePreview(data.secure_url);
      }
    } catch (error) {
      console.log("Image upload error:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (Object.keys(form.formState.errors).length > 0) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4200/profile",
        {
          avatarImage: values.image,
          about: values.about,
          name: values.name,
          socialMediaURL: values.social,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleNext();
    } catch (error) {
      console.log("Profile creation error:", error);
    }
  };

  return (
    <div className="my-[91px] max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel>Add Photo</FormLabel>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageChange}
                  />
                </FormControl>

                <div
                  className="outline-dashed flex justify-center items-center w-40 h-40 rounded-full overflow-hidden cursor-pointer"
                  onClick={openFile}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    "Select Image"
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
                  <Input placeholder="Enter your name" {...field} />
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
                  <textarea
                    className="w-full h-32 p-2 border rounded"
                    placeholder="About"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Social Media URL</FormLabel>
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
            type="submit"
            className="w-full h-10 bg-[#b9b9c0] text-white rounded"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
