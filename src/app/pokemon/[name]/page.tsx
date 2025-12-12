import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/src/types/pokemon';

// No Next.js 15+, params é uma Promise
interface DetailPageProps {
  params: Promise<{ name: string }>;
}

async function getPokemonDetail(name: string): Promise<Pokemon> {
  // cache: 'no-store' garante comportamento SSR (dados sempre frescos)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar Pokémon');
  }
  
  return res.json();
}

export async function generateMetadata({ params }: DetailPageProps) {
  const resolvedParams = await params;
  return {
    title: `Pokedex | ${resolvedParams.name}`,
  };
}

export default async function PokemonDetail({ params }: DetailPageProps) {
  const { name } = await params; // Aguarda a resolução dos parâmetros
  const pokemon = await getPokemonDetail(name);

  // Mapa para tradução dos status
  const statMap: Record<string, string> = {
    'hp': 'HP', 'attack': 'Ataque', 'defense': 'Defesa',
    'special-attack': 'Atq. Especial', 'special-defense': 'Def. Especial', 'speed': 'Velocidade'
  };

  const translateStat = (statName: string) => statMap[statName] || statName;

  // Define a cor de fundo baseada no tipo principal (usando as variáveis do globals.css)
  const mainType = pokemon.types[0].type.name;
  const headerBgVar = `var(--bg-${mainType})`;

  return (
    <div className="detail-container">
      <Link href="/" className="back-btn">← Voltar</Link>
      
      <div className="detail-card">
        {/* Cabeçalho colorido dinâmico */}
        <div className="detail-header-bg" style={{ backgroundColor: headerBgVar, padding: '40px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto' }}>
             <Image 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
                priority 
             />
          </div>
          <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', margin: '10px 0', color: '#2d3436' }}>
            {pokemon.name} <span style={{ fontSize: '0.6em', opacity: 0.6 }}>#{String(pokemon.id).padStart(3, '0')}</span>
          </h1>
          
          <div className="types" style={{ justifyContent: 'center', display: 'flex', gap: '8px' }}>
            {pokemon.types.map(t => (
               <span 
                 key={t.type.name} 
                 className={`type type-${t.type.name}`} 
                 style={{ fontSize: '16px', padding: '8px 16px', borderRadius: '20px', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
               >
                 {t.type.name}
               </span>
            ))}
          </div>
        </div>

        {/* Grid de Informações */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '40px' }}>
          
          {/* Coluna da Esquerda: Características e Habilidades */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Características</h3>
            <div style={{ margin: '15px 0', fontSize: '1.1rem' }}>
                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            </div>
            
            <h3 style={{ color: 'var(--text-primary)', marginTop: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Habilidades</h3>
            <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
              {pokemon.abilities.map(a => (
                <li key={a.ability.name} style={{ textTransform: 'capitalize', marginBottom: '8px', fontSize: '1.1rem' }}>
                  {a.ability.name} {a.is_hidden && <span style={{ fontSize:'0.8em', color: '#e17055', fontWeight: 'bold' }}>(Oculta)</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna da Direita: Status Base */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Status Base</h3>
            <div style={{ marginTop: '15px' }}>
              {pokemon.stats.map(s => (
                <div key={s.stat.name} className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <strong style={{ color: '#636e72' }}>{translateStat(s.stat.name)}</strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', width: '30px', textAlign: 'right' }}>{s.base_stat}</span>
                    {/* Barra de progresso visual simples */}
                    <div style={{ width: '100px', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(s.base_stat, 100)}%`, height: '100%', background: s.base_stat > 90 ? '#00b894' : '#0984e3' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}