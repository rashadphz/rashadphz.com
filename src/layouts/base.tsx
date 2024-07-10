import Footer from "@/components/footer";
import Link from "@/components/link";
import ToggleThemeButton from "@/components/toggle-theme-button";

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-2xl p-4">
        <header className="flex justify-between items-center h-20 py-8">
          <Link className="no-underline font-bold" href="/">
            rashadphz
          </Link>
          <div className="flex space-x-3">
            <Link href="/hn">hn</Link>
            <Link href="/blog">blog</Link>
            {/* <Link href="/projects">projects</Link> */}
            <Link href="/resume.pdf">resume</Link>
          </div>
        </header>
        <div className="mt-2" />
        <div>{children}</div>
        <div className="mt-20" />
        <Footer />
      </div>
    </>
  );
}
