"use client";
import { Coffee, User } from "lucide-react";
import { DropdownMenuCheckboxes } from "./DropdownMenu";
import Link from "next/link";
import { useUser } from "@/app/provider/currentUserProvider";

export const Header = () => {
  const { user, loading, error } = useUser();

  const hasUserData = user && Object.keys(user).length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-between p-5">
        <Link href="/home">
          <div className="flex gap-3 items-center">
            <Coffee />
            <p className="font-bold">Buy Me Coffee</p>
          </div>
        </Link>
        <div className="flex gap-5">
          <div className="flex items-center gap-4">
            <div className="w-[35px] h-[35px] bg-gray-200 rounded-full animate-pulse" />
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <DropdownMenuCheckboxes />
        </div>
      </div>
    );
  }

  if (!hasUserData || error) {
    return (
      <div className="flex items-center justify-between p-5">
        <Link href="/home">
          <div className="flex gap-3 items-center">
            <Coffee />
            <p className="font-bold">Buy Me Coffee</p>
          </div>
        </Link>
        <div className="flex gap-5">
          <Link
            href="/login"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <p className="pr-10 text-gray-800"> {user?.profile?.name} </p>
          </Link>
          <DropdownMenuCheckboxes />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-5">
      <Link href="/home">
        <div className="flex gap-3 items-center">
          <Coffee />
          <p className="font-bold">Buy Me Coffee</p>
        </div>
      </Link>
      <div className="flex gap-5">
        <div className="flex items-center gap-4">
          {user.profile?.avatarImage ? (
            <img
              src={user?.profile?.avatarImage}
              width={100}
              height={100}
              alt={`${user.username || "User"}'s profile picture`}
              className="rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "/space.avif";
              }}
            />
          ) : (
            <div className="w-[35px] h-[35px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-gray-200">
              <span className="text-white font-semibold text-sm">
                {(user.username || user.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
          )}
          <p className="pr-10 font-medium text-gray-800">
            {user.username || user.username || "User"}
          </p>
        </div>
        <DropdownMenuCheckboxes />
      </div>
    </div>
  );
};
