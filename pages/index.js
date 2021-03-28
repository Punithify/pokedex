import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex">
      <img
        className="mb-5 object-contain h-28 w-full"
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt=""
      />
      <h1 className="text-3xl mb-6 text-center">Pokedex </h1>
      <ul>
        {pokemon.map((singlePokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="mx-auto my-2 p-4 w-1/2 capitalize flex items-center text-xg bg-indigo-200 rounded-md ">
                {
                  <>
                    <img
                      className="w-20 h-34 mr-3"
                      src={singlePokemon.image}
                      alt="pokemon image"
                    />
                    <span className="mr-2 font-bold">{index + 1}.</span>
                    {singlePokemon.name}
                  </>
                }
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    const { results } = await res.json();
    const pokemon = results.map((poke, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...poke,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.error(error);
  }
}
