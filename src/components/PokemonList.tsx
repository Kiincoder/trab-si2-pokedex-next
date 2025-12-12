'use client';

import { useState } from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon, PokemonApiResponse } from '@/src/types/pokemon';

interface PokemonListProps {
  initialData: Pokemon[];
}

export default function PokemonList({ initialData }: PokemonListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialData);
  const [offset, setOffset] = useState(20);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data: PokemonApiResponse = await res.json();
      
      const promises = data.results.map(async (p) => {
        const detailRes = await fetch(p.url);
        return detailRes.json() as Promise<Pokemon>;
      });
      
      const newPokemons = await Promise.all(promises);
      
      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      
    <div style={{ textAlign: 'center', margin: '50px 0' }}>
    <button 
        onClick={loadMore} 
        disabled={loading}
        className="btn-primary"
    >
        {loading ? 'Carregando...' : 'Carregar Mais Pokémon'}
    </button>
    </div>

    </>
  );
}