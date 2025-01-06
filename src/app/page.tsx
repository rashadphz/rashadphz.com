import BlogSection from "@/components/blog-section";
import ExperienceSection from "@/components/experience-section";
import Link from "@/components/link";
import ProjectsSection from "@/components/projects-section";
import WavingHand from "@/components/waving-hand";
import Base from "@/layouts/base";

export default function Home() {
  return (
    <>
      <Base>
        <main>
          <p>
            hey, i&apos;m <strong>rashad</strong> <WavingHand />
            <br />
            I love building products / features with <strong>llms</strong>.
            <br />
          </p>
          <div className="mt-12">
            <ExperienceSection />
          </div>
          <div className="mt-12">
            <ProjectsSection />
          </div>
          <div className="mt-12">
            <BlogSection />
          </div>
        </main>
      </Base>
    </>
  );
}
