import Footer from "@/components/footer";

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-2xl p-4">
        <header className="flex justify-between items-center h-8 py-8">
          <h1>rashadphz</h1>
        </header>
        <div>{children}</div>
        <div className="mt-8" />
        <Footer />
      </div>
    </>
  );
}
