import Link from "next/link";

export const LoginButton = () => {
  return (
    <div>
      <Link href="/login">
        <button className="h-[50px]  cursor-pointer w-[100px] rounded-xl bg-gray-400 text-white font-semibold hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
          Log in
        </button>
      </Link>
    </div>
  );
};
