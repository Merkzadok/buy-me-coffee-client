import Link from "next/link";

export const SignUpButton = () => {
  return (
    <div>
      <Link href="/sign-up">
        <button className="h-[50px] w-[100px] cursor-pointer rounded-xl bg-gray-400 text-white font-semibold hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
          Sign Up
        </button>
      </Link>
    </div>
  );
};
