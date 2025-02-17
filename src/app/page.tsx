import BlogSection from "@/components/blog-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import WavingHand from "@/components/waving-hand";
import Base from "@/layouts/base";
import AnimatedSection from "@/components/animated-section";

export default function Home() {
  return (
    <>
      <Base>
        <main>
          <AnimatedSection>
            <p>
              hey, i&apos;m <strong>rashad</strong> <WavingHand />
              <br />
              I love building products / features with <strong>llms</strong>.
              <br />
            </p>
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.1}>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.3}>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.45}>
            <BlogSection />
          </AnimatedSection>
        </main>
      </Base>
    </>
  );
}