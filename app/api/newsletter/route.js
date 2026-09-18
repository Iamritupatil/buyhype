import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  try {
    const result = await query(
      `INSERT INTO newsletter_subscribers (email)
       VALUES ($1)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email]
    );

    return NextResponse.json({
      ok: true,
      alreadySubscribed: result.rowCount === 0,
    });
  } catch (err) {
    console.error("newsletter signup failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
