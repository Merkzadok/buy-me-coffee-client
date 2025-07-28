import { SignUpCreateAccount, SignUpYellow } from "./components";

export default function SignUpPage() {
  return (
    <div className="flex w-screen">
      <SignUpYellow />
      <SignUpCreateAccount />
    </div>
  );
}
