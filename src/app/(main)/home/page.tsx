"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

import { Header } from "@/components/Header";
import Toolbar from "./components/Toolbar";
import UserProfile from "./components/UserProfile";
import Transaction from "./components/Transaction";

export default function Home() {
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto w-full ">
      <Header />
      <div className="flex gap-12">
        <Toolbar />

        <div>
          <UserProfile />
          <div className="flex justify-between items-center p-4">
            <p>Recent Transactions</p>
            <Button variant="outline">
              <ArrowDown /> Amount
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg w-[955px] h-[960px]p-4">
            <div className=" flex   flex-col ">
              {Array.from({ length: 6 }).map((_, i) => (
                <Transaction key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
