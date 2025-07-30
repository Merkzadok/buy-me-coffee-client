import {
  ExternalLink,
  SquareArrowDownRightIcon,
  SquareArrowOutUpLeft,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  return (
    <div className="width={251px} height={154px} p-4 border-0  w-[251px] h-[156px] ">
      <div className="flex flex-col hover:bg-grey-100 p-2 space-y-2 ">
        <Button variant="ghost" className="flex justify-start ">
          Home
        </Button>
        <Button variant="ghost" className="flex justify-start ">
          Explore
        </Button>
        <Button variant="ghost" className="flex justify-start ">
          View page <ExternalLink/>
        </Button>
        <Button variant="ghost" className="flex justify-start ">
          Account Settings
        </Button>
      </div>
    </div>
  );
};
export default Toolbar;
