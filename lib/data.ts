import info from "../information.json" assert { type: "json" };
import type { NavItem, PortfolioData, SectionId } from "./types";

const data = info as PortfolioData;

const sectionOrder: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

const featuredProjects = data.projects.slice(0, 2);

const allTags = Array.from(
  new Set(data.projects.flatMap((project) => project.technologies))
).sort();

const allHighlights = Array.from(
  new Set(data.projects.flatMap((project) => project.highlights ?? []))
).sort();

const sectionIds: SectionId[] = sectionOrder.map((item) => item.id);

export { data, sectionOrder, featuredProjects, allTags, allHighlights, sectionIds };
