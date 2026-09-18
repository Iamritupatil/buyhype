import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { query } from "@/lib/db";
import AlertsPanel from "@/components/AlertsPanel";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "Your Alerts — BuyHype",
};

export default async function AlertsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const result = await query(
    `SELECT id, keyword, created_at FROM alerts WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  const initialAlerts = result.rows.map((row) => ({
    id: row.id,
    keyword: row.keyword,
    createdAt: row.created_at,
  }));

  return (
    <div className="app-shell">
      <div className="app-topbar">
        <Link href="/" className="logo" aria-label="BuyHype home">
          <img src="/assets/logo.webp" alt="" width="52" height="52" />
        </Link>
        <div className="app-topbar-actions">
          <Link href="/" className="app-back-link">
            Back to home
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <main className="app-main">
        <div>
          <h1 className="app-heading">Your Alerts</h1>
          <p className="app-subheading">
            Track a keyword, product, or company. We&apos;ll watch the internet
            for early momentum and notify you before it becomes obvious.
          </p>
        </div>

        <AlertsPanel initialAlerts={initialAlerts} />

        <NewsletterForm />
      </main>
    </div>
  );
}
