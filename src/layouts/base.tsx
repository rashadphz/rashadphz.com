export default function Base({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-xl p-4">
        <header className="flex justify-between items-center h-8 py-8">
          <h1>rashadphz</h1>
        </header>
        {children}
      </div>
    </>
  );
}
