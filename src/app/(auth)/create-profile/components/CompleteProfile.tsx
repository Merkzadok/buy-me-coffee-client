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

const formSchema = z.object({
  image: z.string().min(1, { message: "Please upload an image!" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().min(5, { message: "Please enter info about yourself" }),
  social: z.string().min(9, { message: "Please enter a social link" }),
});

export const CompleteProfile = () => {
  const { userProvider, loading, refreshUser } = useUser();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      social: "https://",
    },
  });

  // Debug: Log user data when it changes
  useEffect(() => {
    console.log("🔍 Debug - User Provider Data:", {
      userProvider,
      loading,
      hasId: !!userProvider?.id,
      hasProfile: !!userProvider?.profile,
    });

    if (!loading && userProvider?.id) {
      const profileData = {
        image: userProvider.profile?.avatarImage || "",
        name: userProvider.profile?.name || "",
        about: userProvider.profile?.about || "",
        social: userProvider.profile?.socialMediaURL || "https://",
      };

      console.log("🔍 Debug - Setting form data:", profileData);
      form.reset(profileData);
      setImagePreview(userProvider.profile?.avatarImage || "");
    }
  }, [loading, userProvider, form]);

  // Debug: Check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔍 Debug - Token exists:", !!token);
    console.log(
      "🔍 Debug - Token preview:",
      token ? token.substring(0, 20) + "..." : "No token"
    );
  }, []);

  const openFile = () => inputRef.current?.click();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("🔍 Debug - Uploading image:", file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileImage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/daywx3gsj/image/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();

      console.log("🔍 Debug - Cloudinary response:", data);

      if (data.secure_url) {
        form.setValue("image", data.secure_url);
        setImagePreview(data.secure_url);
        console.log("✅ Image uploaded successfully");
      }
    } catch (error) {
      console.error("❌ Image upload error:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      console.log("🔍 Debug - Submitting profile:", {
        values,
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 20) + "..." : "No token",
      });

      if (!token) {
        alert("No access token found. Please login again.");
        return;
      }

      // Test token validity first
      console.log("🔍 Debug - Testing token validity...");

      try {
        const testResponse = await axios.get(
          "http://localhost:4200/profile/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ Token is valid, user data:", testResponse.data);
      } catch (testError: any) {
        console.error("❌ Token validation failed:", testError.response?.data);
        alert("Your session has expired. Please login again.");
        router.push("/login");
        return;
      }

      // Proceed with profile creation
      const profilePayload = {
        avatarImage: values.image,
        name: values.name,
        about: values.about,
        socialMediaURL: values.social,
      };

      console.log("🔍 Debug - Sending payload:", profilePayload);

      const response = await axios.post(
        "http://localhost:4200/profile",
        profilePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Profile creation successful:", response.data);

      // Refresh user data
      await refreshUser();

      // Small delay to ensure context updates
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error: any) {
      console.error("❌ Profile creation error:", error);

      // More detailed error logging
      if (error.response) {
        console.error("❌ Error response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to save profile. Please try again.";

      alert(errorMessage);

      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="my-[91px] max-w-md mx-auto p-4">
        <p>Loading user info...</p>
      </div>
    );
  }

  // Show login prompt if no user
  if (!userProvider?.id) {
    return (
      <div className="my-[91px] max-w-md mx-auto p-4">
        <p>Please login to complete your profile.</p>
        <Button onClick={() => router.push("/login")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="my-[91px] max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      {/* Debug info - remove in production */}
      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        <p>
          <strong>Debug Info:</strong>
        </p>
        <p>User ID: {userProvider?.id}</p>
        <p>Has Profile: {userProvider?.profile ? "Yes" : "No"}</p>
        <p>Token: {localStorage.getItem("token") ? "Present" : "Missing"}</p>
      </div>

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
