import Link from "@/components/link";
import Base from "@/layouts/base";

export default function Home() {
  return (
    <>
      <Base>
        <main className="prose dark:prose-invert">
          <p>
            Hi, I&apos;m <strong>Rashad</strong> 👋🏿. I&apos;m an honors CS
            student at <strong>UT Austin</strong>. I&apos;m interested in{" "}
            <strong>backend </strong>development and <strong>infra</strong>.
          </p>
          <p>
            I&apos;ve interned at <Link href="https://stripe.com">Stripe</Link>,{" "}
            <Link href="https://meta.com">Meta</Link>, and{" "}
            <Link href="https://yext.com">Yext</Link>.
          </p>
        </main>
      </Base>
    </>
  );
}
