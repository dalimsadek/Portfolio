"use client";

import { allHighlights, data } from "@/lib/data";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Modal, ModalTrigger } from "../ui/dialog";

export function Projects() {
  const [highlight, setHighlight] = useState<string>("All");
  const [openProject, setOpenProject] = useState<string | null>(null);

  const filters = useMemo(() => ["All", ...allHighlights], []);

  const filtered = useMemo(() => {
    if (highlight === "All") return data.projects;
    return data.projects.filter((project) => project.highlights?.includes(highlight));
  }, [highlight]);

  return (
    <section id="projects" className="section-shell container mx-auto py-16">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-mutedForeground">Projects</p>
          <h2 className="text-2xl font-bold">Featured builds and experiments</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((t) => (
            <Button
              key={t}
              variant={t === highlight ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setHighlight(t)}
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <Card key={project.name} className="flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-sm text-mutedForeground">{project.description[0]}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} className="bg-muted text-foreground">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Modal open={openProject === project.name} onOpenChange={(o) => setOpenProject(o ? project.name : null)} title={project.name}>
                <ModalTrigger asChild>
                  <Button variant="outline" size="sm">
                    Case study
                  </Button>
                </ModalTrigger>
                <div className="space-y-2 text-mutedForeground">
                  {project.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="text-sm font-semibold text-foreground">Timeline: {project.start_date} — {project.end_date}</p>
                </div>
              </Modal>
              <span className="text-xs text-mutedForeground">{project.start_date} — {project.end_date}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
