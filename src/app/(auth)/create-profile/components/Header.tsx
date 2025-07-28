import { Coffee } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-[1440px] h-[56px] bg-amber-500">
      <div className="w-[1280px] h-[40px]">
        <div className="flex items-center justify-center">
          <Coffee />
          Buy Me Coffee
        </div>
        <div>Log out</div>
      </div>
    </div>
  );
};
