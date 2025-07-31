import { Coffee } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-[1440px] h-[56px] mx-auto">
      <div className="flex pt-4 gap-4 place-content-between items-center w-[1280px] h-[40px]">
        <div className="flex mx-[83px]">
          <Coffee />
          Buy Me Coffee
        </div>
        <button className="w-[83px] h-[40px] rounded-sm bg-[#d9d9e0] text-sm">
          Log out
        </button>
      </div>
    </div>
  );
};
