import { ArrowUp } from "lucide-react";
import { Header } from "./(main)/home/components/Headerr";
import Toolbar from "./(main)/home/components/Toolbar";
import Transaction from "./(main)/home/components/Transaction";
import UserProfile from "./(main)/home/components/UserProfile";

export default function Home() {
  return (
    <div className="space-y-6">
      <Header />{" "}
      <div className="flex gap-12">
        <Toolbar />
        <div>
          <UserProfile />
          <p>Recent Transactions</p>
          <button>
            <ArrowUp />
          </button>
          <Transaction />
        </div>
      </div>
    </div>
  );
}
