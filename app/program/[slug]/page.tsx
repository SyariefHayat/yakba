export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Detail Program</h1>
      <p className="mt-4 text-gray-700">Slug program: {slug}</p>
    </main>
  );
}
