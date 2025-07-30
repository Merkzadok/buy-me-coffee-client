import { Profile } from "@/components/Profile";
import { RecentSupporters } from "@/components/RecentSupporters";
import { SocialMedia } from "@/components/SocialMedia";
import Image from "next/image";

export const AboutMe = () => {
  return (
    <div className="max-w-xl mx-auto space-y-4 bg-white">
      <Profile />
      <SocialMedia />
      <div className=" border border-gray-300 rounded-lg p-4 ">
        <h2 className="text-sm text-gray-500 font-medium uppercase tracking-wide">
          Recent Supporters
        </h2>
        {Array.from({ length: 5 }).map((_, i) => (
          <RecentSupporters key={i} />
        ))}
      </div>
    </div>
  );
};
