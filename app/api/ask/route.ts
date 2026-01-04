import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import info from "../../../information.json" assert { type: "json" };
import { buildPortfolioDocs, topKSimilar } from "@/lib/rag";
import type { PortfolioData } from "@/lib/types";

const SYSTEM_PROMPT = `You are an AI assistant for Mohamed Ali Msadek.
Answer questions strictly using the provided context.
Do not invent skills, experiences, metrics, or projects.
If information is missing (e.g., salary or compensation), reply: "This information is not available. Let's connect and discuss it directly." with no extra qualifiers.
Never start with meta phrases like "Based on the provided portfolio context"—speak naturally, as if introducing Mohamed to a recruiter.
Prefer concise, professional explanations.
Reference specific projects or internships when possible.`;

const groq = new Groq({ apiKey: process.env.CHATGROQ_API_KEY });
const portfolioData = info as PortfolioData;
const docs = buildPortfolioDocs(portfolioData);

export async function POST(request: Request) {
  try {
    if (!process.env.CHATGROQ_API_KEY) {
      return NextResponse.json({ error: "CHATGROQ_API_KEY not set" }, { status: 500 });
    }

    const { question } = (await request.json()) as { question?: string };
    if (!question || question.trim().length < 3) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const retrieved = topKSimilar(docs, question, 5);
    const context = retrieved.map((d) => `- (${d.source}) ${d.text}`).join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Portfolio context:\n${context}\n\nQuestion: ${question}\n\nAnswer using only the context. If unsure, say you do not know.`
        }
      ],
      temperature: 0.2,
      max_tokens: 300
    });

    const answer = completion.choices[0]?.message?.content ?? "I do not know.";
    return NextResponse.json({ answer, sources: retrieved.map((r) => r.source) });
  } catch (error) {
    console.error("/api/ask error", error);
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 });
  }
}
