import Base from "@/layouts/base";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Base>
        <main className="prose dark:prose-invert">
          <p>
            Hi 👋🏿, I&apos;m <strong>Rashad</strong>. I&apos;m an honors CS
            student at <strong>UT Austin</strong>. I&apos;m interested in{" "}
            <strong>backend development</strong> and infra.
          </p>
          <p>
            I&apos;ve interned at <a href="https://stripe.com">Stripe</a>,{" "}
            <a href="https://meta.com">Meta</a>, and{" "}
            <a href="https://yext.com">Yext</a>.
          </p>
        </main>
      </Base>
    </>
  );
}
