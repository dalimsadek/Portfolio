"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";

const starters = [
  "Who is Mohamed Ali Msadek as an AI engineer?",
  "What does Mohamed actually build with AI?",
  "Can you introduce Mohamed in one minute?",
  "Tell me about Mohamed’s journey as an AI engineer.",
  "What should a recruiter know about Mohamed?",
  "What kind of real-world AI systems has Mohamed built?"
];

type ChatMessage = {
  sender: "user" | "assistant";
  text: string;
};

export function ChatAssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "assistant",
      text: "Hi! Ask me about skills, projects, or internships."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;
    const q = question.trim();
    setMessages((m) => [...m, { sender: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      const answer = data.answer ?? "I do not know.";
      setMessages((m) => [...m, { sender: "assistant", text: answer }]);
    } catch (err) {
      setMessages((m) => [...m, { sender: "assistant", text: "Sorry, I couldn't answer right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const typing = useMemo(() => {
    if (!loading) return null;
    return (
      <div className="flex items-start gap-2 text-sm text-mutedForeground">
        <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10" />
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mutedForeground" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-mutedForeground delay-75" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-mutedForeground delay-150" />
        </div>
      </div>
    );
  }, [loading]);

  return (
    <section id="ask" className="section-shell container mx-auto py-16">
      <div className="mb-6 space-y-2">
        <p className="text-base font-semibold text-mutedForeground">Ask My Portfolio</p>
        <h2 className="text-3xl font-bold">Chat with Mohamed&apos;s CV</h2>
      </div>
      <Card className="grid gap-6 p-6 md:grid-cols-[2fr_1fr]">
        <div>
          <div
            ref={scrollRef}
            className="mb-4 max-h-[520px] overflow-y-auto rounded-3xl border border-border/60 bg-muted/30 p-4"
          >
            <div className="space-y-4 text-sm">
              {messages.map((m, idx) => {
                const isAssistant = m.sender === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant ? (
                      <div className="flex items-end gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shadow-sm">
                          <Image src="/me.jpg" alt="Mohamed" fill className="object-cover" />
                        </div>
                        <p className="max-w-[70%] rounded-2xl bg-card px-4 py-2 text-foreground shadow-soft">
                          {m.text}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-end gap-2">
                        <p className="max-w-[70%] rounded-2xl bg-primary px-4 py-2 text-primary-foreground shadow-soft">
                          {m.text}
                        </p>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-xs font-semibold text-secondary-foreground">
                          You
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {typing}
            </div>
          </div>
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, or internships"
              className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" size="md" disabled={loading} className="rounded-full px-4">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
        <div className="space-y-4 rounded-3xl bg-muted/40 p-5">
          <p className="text-sm font-semibold text-mutedForeground">Starter questions</p>
          <div className="flex flex-wrap gap-2">
            {starters.map((s) => (
              <Badge
                key={s}
                className="cursor-pointer bg-card text-foreground hover:bg-muted"
                onClick={() => sendQuestion(s)}
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
