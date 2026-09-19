import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign up — BuyHype",
};

export default function SignUpPage() {
  return (
    <div className="auth-shell">
      <Link href="/" className="logo" aria-label="BuyHype home">
        <img src="/assets/logo.webp" alt="" width="52" height="52" />
      </Link>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#ffffff",
            colorBackground: "#0d0d0e",
            colorText: "#ffffff",
            colorTextSecondary: "#8e8e8e",
            colorTextOnPrimaryBackground: "#000000",
            colorInputBackground: "#1a1a1c",
            colorInputText: "#ffffff",
            colorDanger: "#ff8080",
            fontFamily: "Inter, Segoe UI, system-ui, sans-serif",
            borderRadius: "14px",
          },
        }}
      />
    </div>
  );
}
