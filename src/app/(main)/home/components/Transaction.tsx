import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export const Transaction = () => {
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
          <h2 className="font-bold">Guest</h2>
          <p>instagram.com/welesley</p>
          <div className="flex flex-col items-end justify-end">
            <p>+$1</p>
            <p className="text-gray-400">10hours ago</p>
          </div>
        
        <p>
          Thank you for being so awesome everyday! You always manage to brighten
          up my day when I am feeling down.Although $1 isn't that much
          money.It's all I can do contribute at the moment.{" "}
        </p>
        </div>
      </div>
    </div>
  );
};
export default Transaction;
