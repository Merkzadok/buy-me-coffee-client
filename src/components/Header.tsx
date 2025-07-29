import { Coffee } from "lucide-react";
import Image from "next/image";
import { DropdownMenuCheckboxes } from "./DropdownMenu";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 ">
      <div className="flex gap-3 items-center">
        <Coffee />
        <p className="font-bold ">Buy Me Coffee</p>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-4 ">
          <Image
            src="/space.avif"
            width={35}
            height={35}
            alt="Coffee picture"
            className=" rounded-full"
          />
          <p className="pr-10">Harry Potter</p>
        </div>
        <DropdownMenuCheckboxes />
      </div>
    </div>
  );
};
