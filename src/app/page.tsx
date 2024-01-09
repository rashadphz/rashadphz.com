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
          <p>
            I&apos;ve interned at <Link href="https://stripe.com">Stripe</Link>,{" "}
            <Link href="https://meta.com">Meta</Link>, and{" "}
            <Link href="https://yext.com">Yext</Link>.
          </p>
          <div>
            <ExperienceSection />
          </div>
          <div>
            <BlogSection />
          </div>
        </main>
      </Base>
    </>
  );
}
