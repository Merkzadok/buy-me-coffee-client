"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"];

export const UserProfile = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <div className="w-[955px] h-[257px] border border-gray-200 p-4 rounded-lg ">
      <div className="border-b border-gray-200 pb-4 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">Jake</h2>
            <p>buymecoffee.com/baconpancakes1</p>
          </div>
        </div>

        <div>
          {" "}
          <Button className="cursor-pointer">
            <Copy />
            Share Page Link
          </Button>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <h5 className="font-bold text-xl">Earnings</h5>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="items-center ">
              Last 30days
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Last 30days
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
             
            >
              Last 90days
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              All Time
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h6 className="text-5xl font-bold p-4 ">$450</h6>
      </div>
    </div>
  );
};
export default UserProfile;
