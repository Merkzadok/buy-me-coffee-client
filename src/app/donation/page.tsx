import { Header } from "@/components/Header";
import { CoverImage } from "./components/CoverImage";
import { BuyCoffee } from "@/components/BuyCoffee";
import { RecentSupporters } from "@/components/RecentSupporters";
import { SocialMedia } from "@/components/SocialMedia";
import { Profile } from "@/components/Profile";

const Page = () => {
  return (
    <div>
      <Header />

      <CoverImage />
      <div className="flex max-w-[1280px] mx-auto w-full  ">
        <div className="max-w-xl mx-auto space-y-4 bg-white ">
          <Profile />
          <SocialMedia />
          <div className="border border-gray-300 rounded-lg p-4 ">
            <h2 className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              Recent Supporters
            </h2>
            {Array.from({ length: 5 }).map((_, i) => (
              <RecentSupporters key={i} />
            ))}
          </div>
        </div>
        <BuyCoffee />
      </div>
    </div>
  );
};

export default Page;
