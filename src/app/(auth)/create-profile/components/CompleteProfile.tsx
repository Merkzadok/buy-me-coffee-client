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
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider/currentUserProvider";
import { toast } from "sonner";

const formSchema = z.object({
  image: z.string().min(1, { message: "Please upload an image!" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().min(5, { message: "Please enter info about yourself" }),
  social: z.string().min(9, { message: "Please enter a social link" }),
});

export const CompleteProfile = () => {
  const { user, loading, refreshUser } = useUser();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      social: "https://",
    },
  });

  // Populate form when user data is ready
  useEffect(() => {
    if (!loading && user?.id) {
      form.reset({
        image: user.profile?.avatarImage || "",
        name: user.profile?.name || "",
        about: user.profile?.about || "",
        social: user.profile?.socialMediaURL || "https://",
      });
      setImagePreview(user.profile?.avatarImage || "");
    }
  }, [loading, user, form]);

  const openFile = () => inputRef.current?.click();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileImage");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/daywx3gsj/image/upload",
      { method: "POST", body: formData }
    );
    const data = await response.json();

    if (data.secure_url) {
      form.setValue("image", data.secure_url);
      setImagePreview(data.secure_url);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      await axios.post(
        "http://localhost:4200/profile",
        {
          avatarImage: values.image,
          name: values.name,
          about: values.about,
          socialMediaURL: values.social,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refreshUser();
      toast.success("Profile created successfully!");
      router.push("/home");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading user info...</p>;

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
            disabled={isSubmitting}
            className="w-full h-10 bg-[#b9b9c0] text-white rounded disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
