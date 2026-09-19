import Link from "next/link";
import { Waitlist } from "@clerk/nextjs";

export const metadata = {
  title: "Join the Waitlist — BuyHype",
};

export default function WaitlistPage() {
  return (
    <div className="auth-shell">
      <Link href="/" className="logo" aria-label="BuyHype home">
        <img src="/assets/logo.webp" alt="" width="52" height="52" />
      </Link>
      <Waitlist
        appearance={{
          variables: {
            colorPrimary: "#ffffff",
            colorBackground: "#0d0d0e",
            colorText: "#ffffff",
            colorInputBackground: "#1a1a1c",
            colorInputText: "#ffffff",
            fontFamily: "Inter, Segoe UI, system-ui, sans-serif",
            borderRadius: "14px",
          },
        }}
      />
    </div>
  );
}
