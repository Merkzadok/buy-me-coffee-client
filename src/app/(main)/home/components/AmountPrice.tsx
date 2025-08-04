"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";

type Props = {
  amount: string;
  onAmountChange: (value: string) => void;
};

export const AmountPrice = ({ amount, onAmountChange }: Props) => {
  const [selectedAmount, setSelectedAmount] = React.useState(amount);

  const handleChange = (value: string) => {
    setSelectedAmount(value);
    onAmountChange(value);
  };

  const amountOptions = ["1", "2", "5", "10"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDown className="mr-2" />
          Amount
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuRadioGroup
          value={selectedAmount}
          onValueChange={handleChange}
        >
          {amountOptions.map((amt) => (
            <DropdownMenuRadioItem key={amt} value={amt}>
              +${amt}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AmountPrice;
