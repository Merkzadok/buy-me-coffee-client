import { Camera } from "lucide-react";

export const Container = () => {
  return (
    <div className="my-[91px] w-[510px] h-[631px] m-auto">
      <h1 className="text-2xl font-bold">Complete your profile page</h1>
      <p className="text-xs my-4">add photo</p>
      <div className="outline-dashed  flex justify-center items-center w-[160px] h-[160px] rounded-full">
        <Camera className="m-auto" />
      </div>
      <div className="w-[510px] h-[301px] mt-6">
        <p className="my-0.5">Name</p>
        <input
          type="text"
          placeholder="Enter your name here"
          className="w-[510px] h-[40px]  outline-solid rounded-sm text-gray-300"
        />
        <p className="my-0.5">About</p>
        <textarea
          placeholder="Enter your name here"
          className="w-[510px] h-[131px] outline-solid rounded-sm text-gray-300"
        ></textarea>
        <p className="my-0.5">Social media URL</p>
        <input
          type="text"
          className="w-[510px] h-[40px] outline-solid rounded-sm text-gray-300"
          placeholder="https://"
        />
      </div>
      <button className="flex my-6 mx-[264px] justify-center items-center text-end w-[246px] h-[40px] rounded-sm bg-[#b9b9c0] text-white">
        Continue
      </button>
    </div>
  );
};
