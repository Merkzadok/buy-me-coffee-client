import { Coffee, User } from "lucide-react";
import Image from "next/image";
import { DropdownMenuCheckboxes } from "./DropdownMenu";
import Link from "next/link";
import { useUser } from "@/app/provider/currentUserProvider";

export const Header = () => {
  const { userProvider, loading, error } = useUser();

  // Check if user exists and has required properties
  const hasUserData = userProvider && Object.keys(userProvider).length > 0;

  // Loading state
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

  // No user logged in or error state
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
            <p className="pr-10 text-gray-600">Sign In</p>
          </Link>
          <DropdownMenuCheckboxes />
        </div>
      </div>
    );
  }

  // User is logged in - display user data
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
          {userProvider.profilePicture ? (
            <Image
              src={userProvider.profilePicture}
              width={35}
              height={35}
              alt={`${userProvider.username || "User"}'s profile picture`}
              className="rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                // Fallback to default image if profile picture fails to load
                const target = e.target as HTMLImageElement;
                target.src = "/space.avif";
              }}
            />
          ) : (
            <div className="w-[35px] h-[35px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-gray-200">
              <span className="text-white font-semibold text-sm">
                {(userProvider.username || userProvider.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
          )}
          <p className="pr-10 font-medium text-gray-800">
            {userProvider.username || userProvider.username || "User"}
          </p>
        </div>
        <DropdownMenuCheckboxes />
      </div>
    </div>
  );
};
