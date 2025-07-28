// import { SignUpCreateAccount, SignUpYellow } from "./components";

import { SignUpCreateAccount } from "./components/SignUpCreateAccount";
import { SignUpYellow } from "./components/SignUpYellow";

export default function SignUpPage() {
  return (
    <div className="flex w-screen">
      <SignUpYellow />
      <SignUpCreateAccount />
    </div>
  );
}
