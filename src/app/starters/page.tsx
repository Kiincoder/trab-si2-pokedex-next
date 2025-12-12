import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

// Dados estáticos dos iniciais (Gen 1 a Gen 4)
// Isso evita lentidão na API e garante que os dados estejam sempre certos.
const generations = [
  {
    region: "Kanto",
    desc: "Geração 1",
    pokemons: [
      { id: 1, name: "Bulbasaur", type: "grass" },
      { id: 4, name: "Charmander", type: "fire" },
      { id: 7, name: "Squirtle", type: "water" },
    ],
  },
  {
    region: "Johto",
    desc: "Geração 2",
    pokemons: [
      { id: 152, name: "Chikorita", type: "grass" },
      { id: 155, name: "Cyndaquil", type: "fire" },
      { id: 158, name: "Totodile", type: "water" },
    ],
  },
  {
    region: "Hoenn",
    desc: "Geração 3",
    pokemons: [
      { id: 252, name: "Treecko", type: "grass" },
      { id: 255, name: "Torchic", type: "fire" },
      { id: 258, name: "Mudkip", type: "water" },
    ],
  },
  {
    region: "Sinnoh",
    desc: "Geração 4",
    pokemons: [
      { id: 387, name: "Turtwig", type: "grass" },
      { id: 390, name: "Chimchar", type: "fire" },
      { id: 393, name: "Piplup", type: "water" },
    ],
  },
];

export default function StartersPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Saiba qual seu parceiro de jornada!</h1>
      </div>

      <div className={styles.generationsList}>
        {generations.map((gen) => (
          <section key={gen.region} className={styles.regionSection}>
            <div className={styles.regionInfo}>
              <h2 className={styles.regionName}>{gen.region}</h2>
              <span className={styles.generationTag}>{gen.desc}</span>
            </div>

            <div className={styles.cardsGrid}>
              {gen.pokemons.map((poke) => (
                <Link 
                key={poke.id} 
                href={`/pokemon/${poke.name.toLowerCase()}`}
                style={{ textDecoration: 'none' }} // Remove sublinhado do link
                >
                    <div key={poke.id} className={`${styles.card} ${styles[poke.type]}`}>
                    <div className={styles.imageWrapper}>
                        <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                        alt={poke.name}
                        fill
                        sizes="150px"
                        className={styles.pokeImage}
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.pokeId}>#{poke.id}</span>
                        <h3 className={styles.pokeName}>{poke.name}</h3>
                    </div>
                    </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}