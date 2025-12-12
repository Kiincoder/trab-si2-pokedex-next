import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/src/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = String(pokemon.id).padStart(3, '0');
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  
  const mainType = pokemon.types[0].type.name;
  const backgroundColorVar = `var(--bg-${mainType})`;

  return (
    <Link 
        href={`/pokemon/${pokemon.name}`} 
        className="card"
        style={{ backgroundColor: backgroundColorVar }} 
    >
      <div className="poke-img-container">
        <Image 
          src={imageUrl} 
          alt={pokemon.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="card-id">#{id}</div>
      <div className="card-name">{pokemon.name}</div>
      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type type-${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}