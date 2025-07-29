import { SquareArrowDownRightIcon } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="width={251px} height={154px} p-4 border-0  w-[251px] h-[156px] ">
      <ul className=" hover:bg-grey-100 p-2 space-y-2 ">
        <li>Home</li>
        <li>Explore </li>
        <li className="flex items-center gap-2">
          View page <SquareArrowDownRightIcon />
        </li>
        <li>Account Settings</li>
      </ul>
    </div>
  );
};
export default Toolbar;
