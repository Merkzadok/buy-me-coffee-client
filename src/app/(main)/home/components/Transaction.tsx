import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReceivedDonation } from "@/interface/user.interface";
import React from "react";
import { formatDistanceToNow } from "date-fns";
type Props = {
  transaction: ReceivedDonation;
};

export const Transaction = ({ transaction }: Props) => {
  return (
    <div className="w-[955px]rounded-lg p-4 ">
      <div className=" pb-4 flex items-center gap-4">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1 ">
          <h2 className="font-bold">{transaction.donor.username || "Guest"}</h2>
          <p>{transaction.socialURLOrBuyMeACoffee}</p>
          <div className="flex flex-col justify-between">
            <p>+${transaction.amount}</p>
            <p className="text-gray-400">
              {" "}
              {formatDistanceToNow(new Date(transaction.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>

          <p>{transaction.specialMessage}</p>
        </div>
      </div>
    </div>
  );
};
export default Transaction;
