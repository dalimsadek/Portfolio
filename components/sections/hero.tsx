"use client";

import { featuredProjects } from "@/lib/data";
import { data } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Github, Linkedin } from "lucide-react";
import { useState } from "react";

const heroText = `${data.profile.title} focused on LLMs, RAG, agentic AI, and MLOps. Delivering research-grade ideas into production systems that stay reliable and explainable.`;

export function Hero() {
  const [cvMenuOpen, setCvMenuOpen] = useState(false);

  return (
    <section id="home" className="section-shell container mx-auto grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 text-sm text-mutedForeground">
            <Badge className="border-none bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
              AI Engineer · GenAI · MLOps · Data Scientist
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            {data.personal_information.full_name}
          </h1>
          <p className="text-lg text-mutedForeground">{heroText}</p>
          <div className="flex flex-wrap gap-3 pt-3">
            <div className="relative">
              <Button size="lg" onClick={() => setCvMenuOpen((o) => !o)}>
                Download CV
              </Button>
              {cvMenuOpen ? (
                <div className="absolute z-20 mt-2 w-64 rounded-2xl border border-border bg-card p-3 shadow-soft">
                  <p className="mb-2 text-xs font-semibold text-mutedForeground">Choose version</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <a
                      className="rounded-xl border border-border bg-muted/60 px-3 py-2 font-semibold hover:bg-muted"
                      href="/Mohamed_Ali_Msadek_CV.pdf"
                      download
                      onClick={() => setCvMenuOpen(false)}
                    >
                      English — PDF
                    </a>
                    <a
                      className="rounded-xl border border-border bg-muted/60 px-3 py-2 font-semibold hover:bg-muted"
                      href="/CV_Mohamed_ali_msadek_fr.pdf"
                      download
                      onClick={() => setCvMenuOpen(false)}
                    >
                      Français — PDF
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <Button variant="outline" asChild size="lg">
              <a href={data.personal_information.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button variant="ghost" asChild size="lg">
              <a href={data.personal_information.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="ghost" asChild size="lg">
              <a href="#contact">Contact</a>
            </Button>
          </div>
        </motion.div>
        {/* Quick stats removed per request */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-base font-semibold text-mutedForeground">Featured</p>
          <div className="grid gap-3 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.name} className="bg-muted/40">
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="text-sm text-mutedForeground">{project.description[0]}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-mutedForeground">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center"
      >
        <div className="relative h-[420px] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-border bg-aurora shadow-soft">
          <Image src="/me.jpg" alt="Portrait" fill priority className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
