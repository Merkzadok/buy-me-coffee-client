"use client";

import { Header } from "@/components/Header";
import Toolbar from "./components/Toolbar";
import UserProfile from "./components/UserProfile";
import Transaction from "./components/Transaction";
import { AmountPrice } from "./components/AmountPrice";
import { useEffect, useState } from "react";
import { ReceivedDonation } from "@/interface/user.interface";
export default function Home() {
  const [amount, setAmount] = useState<string>("");

  const [donation, setDonation] = useState<ReceivedDonation[]>([]);

  useEffect(() => {
    const getDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:4200/donation/received/2?time=all&amount=${amount}`
        );
        const data = await res.json();
        setDonation(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDonations();
  }, []);

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto w-full ">
      <Header />
      <div className="flex gap-12">
        <Toolbar />

        <div>
          <UserProfile />
          <div className="flex justify-between items-center p-4">
            <p>Recent Transactions</p>
            <AmountPrice
              amount={amount}
              onAmountChange={(value) => {
                setAmount(value);
              }}
            />
          </div>
          <div className="border border-gray-200 rounded-lg w-[955px] p-4">
            <div className=" flex   flex-col ">
              {donation.length > 0 ? (
                donation.map((transaction, i) => (
                  <Transaction key={i} transaction={transaction} />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No transactions available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
