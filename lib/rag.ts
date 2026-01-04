import type { PortfolioData } from "./types";

export type DocChunk = {
  id: string;
  text: string;
  source: string;
};

// Flatten portfolio data into searchable chunks.
export function buildPortfolioDocs(data: PortfolioData): DocChunk[] {
  const docs: DocChunk[] = [];

  docs.push({
    id: "profile",
    source: "profile",
    text: `${data.profile.title}. ${data.profile.summary}. Availability: ${data.profile.availability}. Location: ${data.personal_information.location}. Contacts: ${data.personal_information.email}, ${data.personal_information.linkedin}, ${data.personal_information.github}.`
  });

  docs.push({
    id: "skills",
    source: "skills",
    text: `Skills: programming ${data.skills.programming_and_software_engineering.join(", ")}; ML/DL ${data.skills.machine_learning_and_deep_learning.join(", ")}; GenAI ${data.skills.generative_ai_and_llms.join(", ")}; MLOps ${data.skills.deployment_and_mlops.join(", ")}; Cloud/DevOps ${data.skills.cloud_and_devops.join(", ")}; Agentic AI ${data.skills.agentic_ai.join(", ")}; Databases ${data.skills.databases.join(", ")}; Languages ${Object.entries(data.skills.languages)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}.`
  });

  data.experience.forEach((exp, idx) => {
    docs.push({
      id: `experience-${idx}`,
      source: `experience:${exp.company}`,
      text: `${exp.role} at ${exp.company} in ${exp.location} (${exp.start_date} to ${exp.end_date}). Responsibilities: ${exp.responsibilities.join("; ")}. Links: ${exp.links?.github ?? ""} ${exp.links?.linkedin ?? ""}`
    });
  });

  data.projects.forEach((proj, idx) => {
    docs.push({
      id: `project-${idx}`,
      source: `project:${proj.name}`,
      text: `${proj.name} (${proj.start_date} to ${proj.end_date}). Tech: ${proj.technologies.join(", ")}. Details: ${proj.description.join("; ")}`
    });
  });

  data.education.forEach((edu, idx) => {
    docs.push({
      id: `education-${idx}`,
      source: `education:${edu.institution}`,
      text: `${edu.degree} at ${edu.institution} in ${edu.location} (${edu.start_date} to ${edu.end_date}). Courses: ${(edu.relevant_courses ?? []).join(", ")}. Distinction: ${edu.distinction ?? ""}`
    });
  });

  return docs;
}

// Simple bag-of-words cosine similarity without external deps.
function toVector(text: string): Map<string, number> {
  const vec = new Map<string, number>();
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((token) => {
      vec.set(token, (vec.get(token) ?? 0) + 1);
    });
  return vec;
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let aMag = 0;
  let bMag = 0;
  a.forEach((va, k) => {
    aMag += va * va;
    const vb = b.get(k);
    if (vb) dot += va * vb;
  });
  b.forEach((vb) => {
    bMag += vb * vb;
  });
  if (!aMag || !bMag) return 0;
  return dot / (Math.sqrt(aMag) * Math.sqrt(bMag));
}

export function topKSimilar(docs: DocChunk[], query: string, k = 4): DocChunk[] {
  const qVec = toVector(query);
  const scored = docs.map((doc) => ({
    doc,
    score: cosine(qVec, toVector(doc.text))
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((s) => s.doc);
}
