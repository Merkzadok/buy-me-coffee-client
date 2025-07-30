import { Camera } from "lucide-react";

export const CoverImage = () => {
  return (
    <div className="w-screen  h-[319px] m-auto flex outline justify-center items-center ">
      <button className="flex cursor-pointer items-center rounded-sm pl-2 gap-2 bg-black w-[181px] h-[40px] text-white">
        <Camera /> Add a cover image
      </button>
    </div>
  );
};
