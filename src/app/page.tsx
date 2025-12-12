import PokemonList from '@/src/components/PokemonList';
import { Pokemon, PokemonApiResponse } from '@/src/types/pokemon';
import './globals.css'

async function getPokemons(limit = 20, offset = 0): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data: PokemonApiResponse = await res.json();
  
  const promises = data.results.map(async (p) => {
    const resDetail = await fetch(p.url);
    return resDetail.json() as Promise<Pokemon>;
  });
  
  return Promise.all(promises);
}

export default async function Home() {
  const initialPokemons = await getPokemons(20, 0);

  return (
    <main>
      
      <PokemonList initialData={initialPokemons} />
    </main>
  );
}