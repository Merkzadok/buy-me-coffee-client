import {
  ExternalLink,
  SquareArrowDownRightIcon,
  SquareArrowOutUpLeft,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Toolbar = () => {
  return (
    <div className="width={251px} height={154px} p-4 border-0  w-[251px] h-[156px] ">
      <div className="flex flex-col hover:bg-grey-100 p-2 space-y-2 ">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex justify-start cursor-pointer  "
          >
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="ghost"
            className="flex justify-start cursor-pointer "
          >
            Explore
          </Button>
        </Link>
        <Link href="/view-page">
          <Button
            variant="ghost"
            className="flex justify-start  cursor-pointer  "
          >
            View page <ExternalLink />
          </Button>
        </Link>
        <Link href="account-settings">
          <Button
            variant="ghost"
            className="flex justify-start cursor-pointer  "
          >
            Account Settings
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Toolbar;
