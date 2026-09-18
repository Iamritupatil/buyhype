import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

const MAX_KEYWORD_LENGTH = 80;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await query(
    `SELECT id, keyword, created_at
     FROM alerts
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return NextResponse.json({ alerts: result.rows });
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const keyword = typeof body?.keyword === "string" ? body.keyword.trim() : "";

  if (!keyword || keyword.length > MAX_KEYWORD_LENGTH) {
    return NextResponse.json(
      { error: `Enter a keyword (1-${MAX_KEYWORD_LENGTH} characters)` },
      { status: 400 }
    );
  }

  const result = await query(
    `INSERT INTO alerts (user_id, keyword) VALUES ($1, $2)
     RETURNING id, keyword, created_at`,
    [userId, keyword]
  );

  return NextResponse.json({ alert: result.rows[0] }, { status: 201 });
}
