import { CoffeeIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-[1440px] h-[56px] bg-amber-100 ">
      <div className=" flex items-center p-2 gap-2">
       <CoffeeIcon />
        <h1 className="text-l ">Buy me coffee</h1>
        <div className="flex items-center justify-end w-full">
          <p>login </p>
        </div>
      </div>
    </div>
  );
};
export default Header;
