"use client";

import { Header } from "@/components/Header";
import Toolbar from "../home/components/Toolbar";
import { ExploreCard } from "./components/ExploreCard";

export default function Explore() {
  return (
    <div>
      <Header />
      <div className="max-w-[1280px] mx-auto w-full flex gap-20 ">
        <Toolbar />
        <div className="flex items-center h-screen w-screen mx-auto flex-col  ">
          {Array.from({ length: 10 }).map((_, i) => (
            <ExploreCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
