"use client";

import { data } from "@/lib/data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Brain, Calculator, Share2, Waves } from "lucide-react";
import { Timeline, type TimelineItem } from "../ui/timeline";

const iconMap: Record<string, JSX.Element> = {
  wave: <Waves className="h-5 w-5" />,
  calculator: <Calculator className="h-5 w-5" />,
  network: <Share2 className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />
};

export function JourneySection() {
  const journey = data.journey;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const maxIndex = Math.max(0, journey.length - 1);

  const goTo = (i: number) => {
    if (i < 0 || i > maxIndex) return;
    setIndex(i);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const timelineStops: TimelineItem[] = useMemo(() => {
    return journey.map((step, i) => {
      const years = step.timeline.match(/\d{4}/g);
      const label = years?.length ? years[years.length - 1] : step.timeline;
      return {
        id: step.id,
        label,
        subLabel: step.subtitle
      };
    });
  }, [journey]);

  return (
    <section id="journey" className="section-shell mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 space-y-2">
        <p className="text-base font-semibold text-mutedForeground">From the Tunisian Riviera to the French Riviera</p>
        <h2 className="text-3xl font-bold">My academic and engineering journey</h2>
      </div>
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0} className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {journey.map((step, i) => (
              <span
                key={step.id}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-primary" : "bg-mutedForeground/40"}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => goTo(index + 1)} disabled={index === maxIndex} className="rounded-full">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-muted/30 shadow-soft" ref={containerRef}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={journey[index].id}
              className="relative flex w-full justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Card className="m-4 w-full max-w-4xl space-y-6 p-6 md:space-y-8">
                <div className="mx-auto w-full max-w-xl space-y-3">
                  <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary">
                    {iconMap[journey[index].icon] ?? <Waves className="h-5 w-5" />}
                    {journey[index].subtitle}
                  </Badge>
                  <h3 className="text-2xl font-bold">{journey[index].title}</h3>
                  <p className="text-mutedForeground">{journey[index].location}</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{journey[index].description}</p>
                  <div className="rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {journey[index].highlight}
                  </div>
                  <div className="flex items-center justify-between text-sm text-mutedForeground">
                    <span>Timeline</span>
                    <span className="font-semibold text-foreground">{journey[index].timeline}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-mutedForeground">
                    <span>{journey[0].subtitle}</span>
                    <span>{journey[journey.length - 1].subtitle}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6">
          <Timeline items={timelineStops} activeIndex={index} onSelect={goTo} />
        </div>
      </div>
    </section>
  );
}
