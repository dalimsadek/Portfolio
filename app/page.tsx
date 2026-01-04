import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { JourneySection } from "@/components/sections/journey";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { ChatAssistantSection } from "@/components/sections/chat-assistant";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/navbar";
import { BackToTop } from "@/components/back-to-top";
import { AskPortfolioWidget } from "@/components/chat/ask-portfolio";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <JourneySection />
      <Experience />
      <Projects />
      <ChatAssistantSection />
      <Contact />
      <BackToTop />
      <AskPortfolioWidget />
    </main>
  );
}
