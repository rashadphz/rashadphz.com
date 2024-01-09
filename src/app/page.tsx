import BlogSection from "@/components/blog-section";
import ExperienceSection from "@/components/experience-section";
import Link from "@/components/link";
import WavingHand from "@/components/waving-hand";
import Base from "@/layouts/base";

export default function Home() {
  return (
    <>
      <Base>
        <main className="prose dark:prose-invert">
          <p>
            Hi, I&apos;m <strong>Rashad</strong> <WavingHand /> . I&apos;m an
            honors CS student at <strong>UT Austin</strong>. I&apos;m interested
            in <strong>backend </strong>development, <strong>infra</strong> and{" "}
            <strong>search & retrieval</strong>.
          </p>
          <div className="mt-12">
            <ExperienceSection />
          </div>
          <div className="mt-12">
            <BlogSection />
          </div>
        </main>
      </Base>
    </>
  );
}
