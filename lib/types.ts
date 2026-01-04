export type Social = {
  linkedin: string;
  github: string;
  email: string;
};

export type PersonalInformation = {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
};

export type Profile = {
  title: string;
  summary: string;
  availability: string;
};

export type EducationItem = {
  institution: string;
  location: string;
  degree: string;
  start_date: string;
  end_date: string;
  relevant_courses?: string[];
  distinction?: string;
};

export type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  links?: Partial<Social>;
};

export type Project = {
  name: string;
  technologies: string[];
  highlights: string[];
  start_date: string;
  end_date: string;
  description: string[];
};

export type CertificationsAndInterests = {
  certifications: string[];
  interests: string[];
};

export type JourneyStep = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  icon: string;
  description: string;
  highlight: string;
  timeline: string;
};

export type Skills = {
  programming_and_software_engineering: string[];
  machine_learning_and_deep_learning: string[];
  generative_ai_and_llms: string[];
  deployment_and_mlops: string[];
  cloud_and_devops: string[];
  agentic_ai: string[];
  databases: string[];
  languages: Record<string, string>;
};

export type PortfolioData = {
  personal_information: PersonalInformation;
  profile: Profile;
  education: EducationItem[];
  skills: Skills;
  experience: ExperienceItem[];
  projects: Project[];
  certifications_and_interests: CertificationsAndInterests;
  journey: JourneyStep[];
};

export type QuickStat = {
  label: string;
  value: string;
};

export type NavItem = {
  id: SectionId;
  label: string;
};

export type SectionId = "home" | "about" | "experience" | "projects" | "contact";
