import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { chat } from "@/lib/llm";
import { query } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { conversationId, message, model = "gpt-4" } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const userId = (session.user as any).id;

    let convId = conversationId;
    if (!convId) {
      const newConv = await query(
        `INSERT INTO conversations (user_id, title, model, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING id`,
        [userId, message.substring(0, 100), model],
      );
      convId = newConv.rows[0].id;
    }

    const historyResult = await query(
      `SELECT role, content FROM conversation_messages
       WHERE conversation_id = $1
       ORDER BY created_at ASC`,
      [convId],
    );

    const messages = [
      ...historyResult.rows,
      { role: "user", content: message },
    ];

    await query(
      `INSERT INTO conversation_messages (conversation_id, role, content, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [convId, "user", message],
    );

    const result = await chat(model, messages);

    await query(
      `INSERT INTO conversation_messages (conversation_id, role, content, model, tokens_prompt, tokens_completion, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [
        convId,
        "assistant",
        result.response,
        model,
        result.tokensPrompt,
        result.tokensCompletion,
      ],
    );

    await query(
      `UPDATE conversations
       SET updated_at = NOW(), message_count = message_count + 2, total_tokens = total_tokens + $2
       WHERE id = $1`,
      [convId, result.tokensTotal],
    );

    return NextResponse.json({
      conversationId: convId,
      message: result.response,
      model,
      tokens: {
        prompt: result.tokensPrompt,
        completion: result.tokensCompletion,
        total: result.tokensTotal,
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 },
    );
  }
}
