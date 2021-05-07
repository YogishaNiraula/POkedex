// getPokemons, getPokemonByName, getPokemonById

import { axios } from "../utils/axios.js";

async function getPokemons({ limit, offset }) {
  const response = await axios.get(`pokemon/?limit=${limit}&offset=${offset}`);
  return response.data;
}

async function getPokemonByName(name) {
  const response = await axios.get(`pokemon/${name}/`);
  return response.data;
}

async function getPokemonById(id) {
  const response = await axios.get(`pokemon/${id}/`);
  return response.data;
}

async function getPokemonSpecies(name) {
  const response = await axios.get(`pokemon-species/${name}/`);
  return response.data;
}

async function getPokemonByHabitat(habitat) {
  const response = await axios.get(`pokemon-habitat/${habitat}/`);
  return response.data.pokemon_species;
}

async function getPokemonByGender(gender) {
  const response = await axios.get(`gender/${gender}/`);
  return response.data.pokemon_species_details.map((poke) => {
    return poke.pokemon_species;
  });
}

async function getPokemonByRegion(region) {
  const response = await axios.get(`region/${region}/`);
  return response.data.pokedexes[0].url;
}

async function getHabitats() {
  return (await axios.get("pokemon-habitat/")).data;
}

async function getGenders() {
  return (await axios.get("gender/")).data;
}

async function getRegions() {
  return (await axios.get("region/")).data;
}

async function searchForPokemonName(name) {
  const searchResponse = await getPokemons({
    offset: 0,
    limit: 1190,
  });
  const allPokemons = searchResponse.results;
  return allPokemons.filter((pokemon) => pokemon.name === name.toLowerCase());
}

export {
  getPokemons,
  getPokemonByName,
  getPokemonById,
  getPokemonSpecies,
  getPokemonByHabitat,
  getPokemonByGender,
  getPokemonByRegion,
  getHabitats,
  getGenders,
  getRegions,
  searchForPokemonName,
};
