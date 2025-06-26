export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="p-4 bg-red-600 text-white">
        <h1 className="text-2xl">Pokedex</h1>
      </header>
      <main className="p-6">{children}</main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Prueba Técnica de Pokémon
      </footer>
    </>
  );
}
  