import { data } from "@/lib/data";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import Image from "next/image";

const techHighlights: Record<string, string[]> = {
  BubbleRAN: ["Agentic AI", "5G O-RAN", "Kubernetes", "Transformers", "LSTM", "Predictive maintenance"],
  EURECOM: ["LLM eval", "LLaMA", "Mistral", "LangChain", "Prompting"],
  Innodeep: ["Medical imaging", "AWS", "Streamlit", "Transfer learning", "CI/CD"],
  "Groupe SFM": ["Python","Machine Learning","K-Means","Data Engineering","Data Visualization"]
};

const logoMap: Record<string, string> = {
  BubbleRAN: "/bubbleran.png",
  EURECOM: "/eurecom.png",
  Innodeep: "/innodeep.png",
  "Groupe SFM": "/SFM.png"
};

export function Experience() {
  return (
    <section id="experience" className="section-shell container mx-auto pt-10 pb-16">
      <div className="mb-8 space-y-2">
        <p className="text-base font-semibold text-mutedForeground">Experience</p>
        <h2 className="text-2xl font-bold">Shipping AI with real-world constraints</h2>
      </div>
      <div className="space-y-6 border-l border-border/70 pl-6">
        {data.experience.map((role) => (
          <div key={role.company} className="relative">
            <span className="absolute -left-[14px] top-1 h-3 w-3 rounded-full bg-primary" />
            <Card className="gradient-card">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div className="flex flex-1 items-start gap-5">
                  {logoMap[role.company] ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
                      <Image src={logoMap[role.company]} alt={`${role.company} logo`} fill className="object-contain p-2.5" />
                    </div>
                  ) : null}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-mutedForeground">
                      <span className="font-semibold text-foreground">{role.company}</span>
                      <span>• {role.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{role.role}</h3>
                    <p className="text-sm text-mutedForeground">
                      {role.start_date} — {role.end_date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techHighlights[role.company]?.map((tag) => (
                    <Badge key={tag} className="bg-primary/10 text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-mutedForeground">
                {role.responsibilities.map((item) => (
                  <li key={item} className="leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
              {role.links?.github || role.links?.linkedin ? (
                <div className="mt-3 flex gap-3 text-sm text-primary">
                  {role.links.github ? (
                    <a href={role.links.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : null}
                  {role.links.linkedin ? (
                    <a href={role.links.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              ) : null}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
