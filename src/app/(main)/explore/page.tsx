import { ExploreCard } from "./components/ExploreCard";

export default function Explore() {
  return (
    <div className="justify-center flex items-center h-screen w-screen mx-auto flex-col gap-5 ">
      {Array.from({ length: 5 }).map((_, i) => (
        <ExploreCard key={i} />
      ))}
    </div>
  );
}
