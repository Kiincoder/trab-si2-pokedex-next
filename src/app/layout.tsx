import type { Metadata } from "next";
import Link from "next/link"; 

export const metadata: Metadata = {
  title: {
    default: "Pokédex Online | Explore o Mundo Pokémon",
    template: "%s | Pokédex Online"
  },
  description: "Encontre estatísticas, tipos e habilidades de todos os seus Pokémon favoritos nesta Pokédex completa construída com Next.js.",
  keywords: ["Pokémon", "Pokédex", "PokeAPI", "Estatísticas Pokémon", "Lista de Pokémon"],
  authors: [{ name: "Eric" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pokédex Online",
    images: [
      {
        url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
        width: 50,
        height: 50,
        alt: "Pokédex Ícone",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" width={50} height={50}/>
               <h1>Pokédex</h1>
            </div>
            <nav>
                <Link href="/">Início</Link>
                <Link href="/starters" className="hover:underline">Iniciais</Link>
            </nav>
        </header>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
