import Base from "@/layouts/base";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Base>
        <main className="prose dark:prose-invert">
          <p>
            Hi 👋🏿, I'm Rashad. I'm an honors CS student at UT Austin.
            I'm interested in <strong>backend development</strong> and
            infra.
          </p>
          <p>
            I've interned at <a href="https://stripe.com">Stripe</a>,{" "}
            <a href="https://meta.app">Meta</a>, and{" "}
            <a href="https://yext.com">Yext</a>.
          </p>
        </main>
      </Base>
    </>
  );
}
