import { Coffee } from "lucide-react";
import Image from "next/image";
export const SignUpYellow = () => {
  return (
    <div className="bg-amber-400 h-screen w-1/2 flex flex-col items-center justify-center relative">
      <div className="flex">
        <div className="absolute top-10 left-10 flex gap-2 ">
          <Coffee />
          <p className="font-bold ">Buy Me Coffee</p>
        </div>
      </div>
      <Image
        src="/illustration.png"
        width={300}
        height={300}
        alt="Coffee picture"
        className=""
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2 pt-2">
        Fund your creative work
      </h3>
      <p className="text-sm leading-relaxed">
        Accept support. Start a membership. Set up a shop. It's easier{" "}
        <span className="block text-center">than you think.</span>
      </p>
    </div>
  );
};
