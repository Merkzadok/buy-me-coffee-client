import Image from "next/image";
export const SignUpYellow = () => {
  return (
    <div className="bg-amber-400 h-screen w-screen items-center justify-center">
      <Image
        src="/illustration.png"
        width={300}
        height={300}
        alt="Coffee picture"
        className=""
      />
      <h3>Fund your creative work</h3>
      <p>
        {" "}
        Accept support. Start a membership. Setup a shop. It's easier than you
        think{" "}
      </p>
    </div>
  );
};
