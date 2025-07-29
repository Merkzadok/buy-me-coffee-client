import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

export const ExploreCard = () => {
  return (
    <div className="border-1 border-dotted w-300  border-b-blue-200 p-3 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 ">
          <Image
            src="/space.avif"
            width={50}
            height={50}
            alt="Mini picture"
            className="rounded-full"
          />
          <p className="font-bold  ">Space ranger</p>
        </div>

        <div className="inline-flex items-center gap-2 h-10 px-4 py-2 bg-gray-200 cursor-pointer text-black rounded-lg hover:bg-gray-300 transition-all">
          <button className="flex items-center gap-2 cursor-pointer">
            View Profile
            <SquareArrowOutUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-4 mr-35 ">
        <h1 className="font-bold">About Space ranger</h1>
        <h1 className="font-bold"> Social Media URL </h1>
      </div>
      <div className="flex justify-between mr-35 ">
        <p>
          Space ranger is for everyone. It handles all the painful experiences
          and helps people.
        </p>
        <a>https://buymecoffee.com/spaceranger</a>
      </div>
    </div>
  );
};
