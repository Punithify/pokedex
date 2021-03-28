import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const pokemon = ({ singlePokemon }) => {
  return (
    <Layout title={singlePokemon.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">
        {singlePokemon.name}
      </h1>
      <img className="mx-auto" src={singlePokemon.image} alt="" />
      <div className="text-center bg-indigo-200 w-1/3 mx-auto">
        <p>
          <span className="font-bold mr-2">Weight :</span>
          {singlePokemon.weight}
        </p>
        <p>
          <span className="font-bold mr-2">Height :</span>
          {singlePokemon.height}
        </p>
        <h2 className="underline text-2xl mt-6 mb-2">Types</h2>
        {singlePokemon.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <h2 className="text-2xl underline mt-2">Moves</h2>
        {singlePokemon.moves.map((move, index) => (
          <ul class="list-disc">
            <li className="last:mb-2 items-center" key={index}>
              {move.move.name}
            </li>
          </ul>
        ))}
      </div>
      <p className="mt-10 text-center">
        <Link href="/">
          <a>
            <h2 className="text-2xl underline">Home</h2>
          </a>
        </Link>
      </p>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const singlePokemon = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    singlePokemon.image = image;
    return {
      props: { singlePokemon },
    };
  } catch (error) {
    console.error(error);
  }
}

export default pokemon;
