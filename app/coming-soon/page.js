import Link from "next/link";

export const metadata = {
  title: "Coming Soon — BuyHype",
};

export default async function ComingSoonPage({ searchParams }) {
  const params = await searchParams;
  const from = typeof params?.from === "string" ? params.from : null;

  return (
    <div className="auth-shell">
      <Link href="/" className="logo" aria-label="BuyHype home">
        <img src="/assets/logo.webp" alt="" width="52" height="52" />
      </Link>

      <div className="coming-soon-body">
        <h1 className="app-heading">{from ? `${from} — Coming Soon` : "Coming Soon"}</h1>
        <p className="app-subheading">
          We&apos;re heads-down building this. Join the waitlist to be first
          in line when it opens up.
        </p>
        <div className="coming-soon-actions">
          <Link href="/waitlist" className="cta-btn">
            Join the Waitlist
          </Link>
          <Link href="/" className="app-back-link">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
