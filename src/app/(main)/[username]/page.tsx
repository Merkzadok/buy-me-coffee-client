import { Header } from "@/components/Header";
import { AboutMe } from "./components/AboutMe";
import { BuyCoffee } from "./components/BuyCoffee";

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  return (
    <div className="max-w-[1000px] mx-auto w-full">
      <Header />
      <div className="flex">
        <AboutMe />
        <BuyCoffee />
      </div>
    </div>
  );
};
export default Page;
