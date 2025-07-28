import { SignUpYellow } from "../sign-up/components/SignUpYellow";
import { LoginAccount } from "./components/LoginAccount";

export default function LoginPage() {
  return (
    <div className="flex w-screen">
      <SignUpYellow />
      <LoginAccount />
    </div>
  );
}
