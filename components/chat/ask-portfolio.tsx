"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const starters = [
  "What AI projects has Mohamed worked on?",
  "Does he have experience with LLMs and RAG?",
  "Explain his BubbleRAN work in simple terms",
  "Which projects demonstrate MLOps skills?"
];

type ChatMessage = {
  sender: "user" | "assistant";
  text: string;
};

export function AskPortfolioWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "assistant",
      text: "Hi! Ask me about Mohamed's skills, projects, or internships."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (question: string) => {
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
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((m) => [...m, { sender: "assistant", text: data.answer ?? "I do not know." }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { sender: "assistant", text: "Sorry, I could not answer that right now." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const typingPlaceholder = useMemo(() => {
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
    <div className="fixed bottom-6 right-4 z-40">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <Card className="w-[360px] max-w-[90vw] p-4 shadow-glow">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-primary">Ask My Portfolio</p>
                  <p className="text-sm text-mutedForeground">Answers come only from Mohamed's CV.</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close chat">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div
                ref={scrollRef}
                className="mb-3 max-h-72 overflow-y-auto rounded-2xl border border-border/60 bg-muted/30 p-3"
              >
                <div className="space-y-3 text-sm">
                  {messages.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`h-8 w-8 shrink-0 rounded-full ${m.sender === "assistant" ? "bg-primary/10" : "bg-secondary/20"}`} />
                      <p className={`leading-relaxed ${m.sender === "assistant" ? "text-foreground" : "text-foreground"}`}>
                        {m.text}
                      </p>
                    </div>
                  ))}
                  {typingPlaceholder}
                </div>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {starters.map((s) => (
                  <Badge
                    key={s}
                    className="cursor-pointer bg-muted text-foreground hover:bg-muted/80"
                    onClick={() => handleSend(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, or internships"
                  className="flex-1 rounded-2xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" size="sm" disabled={loading} className="rounded-full px-3">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open ? (
        <Button
          className="shadow-soft"
          size="lg"
          onClick={() => setOpen(true)}
          aria-label="Open Ask My Portfolio chatbot"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Ask My Portfolio
        </Button>
      ) : null}
    </div>
  );
}
