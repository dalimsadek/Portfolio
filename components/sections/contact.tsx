"use client";

import { useState, type FormEvent } from "react";
import { data } from "@/lib/data";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export function Contact() {
  const contact = data.personal_information;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name")?.toString().trim() || "",
      email: form.get("email")?.toString().trim() || "",
      message: form.get("message")?.toString().trim() || ""
    };

    if (!payload.message) {
      setFeedback("Please add a short message.");
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFeedback("Your email is sent. If urgent, please email me directly as well.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setFeedback("Couldn’t send right now. Please email me directly.");
    }
  };
  return (
    <section id="contact" className="section-shell container mx-auto py-16">
      <div className="mb-6 space-y-2">
        <p className="text-base font-semibold text-mutedForeground">Contact</p>
        <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
        <p className="text-mutedForeground">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex items-center gap-3">
          <div className="rounded-2xl bg-muted p-3 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-mutedForeground">Email</p>
            <p className="font-semibold">{contact.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard?.writeText(contact.email)}
          >
            Copy
          </Button>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="rounded-2xl bg-muted p-3 text-primary">
            <Phone className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-mutedForeground">Phone</p>
            <p className="font-semibold">{contact.phone}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`tel:${contact.phone}`}>Call</a>
          </Button>
        </Card>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild variant="ghost">
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={contact.github} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={`mailto:${contact.email}`}>Email me</a>
        </Button>
      </div>
      <form
        className="mt-8 grid gap-4 rounded-3xl border border-border/60 bg-muted/30 p-6 shadow-soft"
        onSubmit={handleSubmit}
      >
        {status === "loading" ? (
          <div className="h-1 overflow-hidden rounded-full bg-border">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            aria-label="Name"
            name="name"
            placeholder="Name"
            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            aria-label="Email"
            name="email"
            placeholder="Email"
            type="email"
            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <textarea
          aria-label="Message"
          name="message"
          placeholder="Project brief or role"
          rows={4}
          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-mutedForeground">
          <span>Optional form — send email for the fastest response.</span>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 text-sm font-semibold transition-transform duration-150 hover:scale-105"
          >
            {status === "loading" ? "Sending..." : "Send"}
          </Button>
        </div>
        {feedback ? (
          <p className={`text-sm ${status === "error" ? "text-destructive" : "text-foreground"}`}>
            {feedback}
          </p>
        ) : null}
      </form>
    </section>
  );
}
