import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

export async function DELETE(req, { params }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const alertId = Number.parseInt(id, 10);
  if (!Number.isInteger(alertId)) {
    return NextResponse.json({ error: "Invalid alert id" }, { status: 400 });
  }

  const result = await query(
    `DELETE FROM alerts WHERE id = $1 AND user_id = $2 RETURNING id`,
    [alertId, userId]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
