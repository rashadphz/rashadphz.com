import Footer from "@/components/footer";
import Link from "@/components/link";

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-[582px] p-4">
        <header className="flex justify-between items-center h-20 py-8">
          <Link className="no-underline font-medium" href="/">
            rashadphz
          </Link>
          <div className="flex space-x-3 text-xs">
            <Link href="/links">links</Link>
            <Link href="/writing">notes</Link>
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
