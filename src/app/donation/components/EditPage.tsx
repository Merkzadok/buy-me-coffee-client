import Image from "next/image";

export const EditPage = () => {
  return (
    <div className="my-[91px] w-[510px] h-[631px] m-auto">
      <div>
        <div className="flex content-between w-[584px] h-[48px]">
          <div className="flex mx-auto gap-2 items-center">
            <Image
              className="rounded-full"
              src="/profile.jpeg"
              width={48}
              height={48}
              alt="Picture of the author"
            />
            <h1 className="">Jake</h1>
          </div>
          <button>Edit page</button>
        </div>
        <div>
          <h1>About Jake</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus,
            maiores.
          </p>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
