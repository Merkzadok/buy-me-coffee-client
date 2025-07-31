"use client";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const AmountPrice = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {" "}
          <ArrowDown />
          Amount
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
       <div></div>
          <div className="flex  items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">+$1</Label>

            <Checkbox id="terms" />
            <Label htmlFor="terms">+$2</Label>

            <Checkbox id="terms" />
            <Label htmlFor="terms">+$5</Label>

            <Checkbox id="terms" />
            <Label htmlFor="terms">+$10</Label>
          </div>
      
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AmountPrice;
