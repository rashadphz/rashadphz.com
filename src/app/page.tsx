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
            hi, i&apos;m <strong>rashad</strong> <WavingHand />. I was an honors
            cs student at <strong>ut austin</strong>. <br />
            I&apos;m interested in <strong>llms</strong>,{" "}
            <strong>agents</strong> and <strong>search & retrieval</strong>. I
            built{" "}
            <Link className="" href="https://github.com/rashadphz/farfalle">
              farfalle
            </Link>
            .
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
