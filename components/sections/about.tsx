import { data } from "@/lib/data";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export function About() {
  const skills = data.skills;

  return (
    <section id="about" className="section-shell container mx-auto pt-16 pb-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <p className="text-base font-semibold text-mutedForeground">About</p>
          <h2 className="text-3xl font-bold">AI Engineer building resilient AI systems</h2>
          <p className="text-mutedForeground">
            I’m an AI engineer with solid software fundamentals who ships models into real products. I design and
            deliver data pipelines, ML/LLM systems, and the tooling that keeps them observable and maintainable.
          </p>
          <p className="text-mutedForeground">
            My work centers on building reliable AI: RAG and LLM-powered services, classical ML, and computer
            vision. I focus on evaluation, monitoring, and deployment so teams can trust what they launch.
          </p>
          <p className="text-mutedForeground">
            I enjoy translating ideas into production-grade systems—clear metrics, clean data paths, and
            iterative delivery over buzzwords.
          </p>
          <Card className="bg-muted/30">
            <h3 className="text-lg font-semibold">What I&apos;m looking for</h3>
            <ul className="mt-2 space-y-1 text-sm text-mutedForeground">
              <li>• AI Engineer / Machine Learning Engineer</li>
              <li>• Data Scientist</li>
              <li>• Generative AI / LLM Engineer</li>
              <li>• MLOps Engineer</li>
            </ul>
          </Card>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(skills).map(([key, value]) => (
            <Card key={key} className="bg-card/70">
              <p className="text-xs uppercase tracking-wide text-mutedForeground">{key.replace(/_/g, " ")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.isArray(value)
                  ? value.map((item) => (
                      <Badge key={item} className="bg-primary/10 text-foreground">
                        {item}
                      </Badge>
                    ))
                  : Object.entries(value).map(([lang, level]) => (
                      <Badge key={lang} className="bg-primary/10 text-foreground">
                        {lang}: {level}
                      </Badge>
                    ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
