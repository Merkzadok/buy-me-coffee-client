import { UserRoundIcon } from "lucide-react";

export const UserProfile = () => {
  return (
    <div className="w-[907px] h-[257px] border border-gray-200 p-4  ">
      <div className="border-b border-gray-200 pb-4 flex items-center gap-4">
        <div >
          <UserRoundIcon />
        </div>
        <div>
          <h2 className="font-bold">Jake</h2>
          <p>buymecoffee.com/baconpancakes1</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <h5 className="font-bold text-xl">Earnings</h5>
        <input className=" border border-gray-200"></input>
      </div>
      <div>
        <h6 className="text-5xl font-bold p-4 ">$450</h6>
      </div>
    </div>
  );
};
export default UserProfile;
