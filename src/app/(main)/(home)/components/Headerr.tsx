"use client";
import { ChevronDownIcon, Coffee } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <div className="w-[1440px] h-[56px]">
      <div className="flex pt-2 gap-4 justify-between items-center w-[1280px] h-[40px]">
        <div className="flex mx-[65px]">
          <Coffee />
          Buy Me Coffee
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row gap-x-2 items-center cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Jake
              <ChevronDownIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <Button className="w-full" variant="ghost">
              My Account
            </Button>
            <Button className="w-full" variant="ghost">
              Billing
            </Button>

            <Button className="w-full" variant="ghost">
              Log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
