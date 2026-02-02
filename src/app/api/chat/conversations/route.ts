import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { query } from "@/lib/database";

// GET /api/chat/conversations - List all conversations for the user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const result = await query(
      `SELECT id, title, model, message_count, total_tokens, created_at, updated_at
       FROM conversations
       WHERE user_id = $1
       ORDER BY updated_at DESC
       LIMIT 50`,
      [userId],
    );

    return NextResponse.json({ conversations: result.rows });
  } catch (error: any) {
    console.error("Get conversations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}
