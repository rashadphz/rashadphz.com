import Footer from "@/components/footer";
import Link from "@/components/link";
import ToggleThemeButton from "@/components/toggle-theme-button";

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-4xl p-4">
        <header className="flex justify-between items-center h-20 py-8">
          <Link className="no-underline font-bold" href="/">
            rashadphz
          </Link>
          <div className="flex space-x-3">
            <Link href="/links">links</Link>
            <Link href="/writing">writing</Link>
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
