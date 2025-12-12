import type { Metadata } from "next";
import Link from "next/link"; 


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