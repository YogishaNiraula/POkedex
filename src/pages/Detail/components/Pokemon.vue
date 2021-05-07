<template>
  <div v-if="pokemon">
    <div class="py-6">
      <router-link to="/" class="text-xl font-light text-gray-500">
        ← Go Back To Pokédex
      </router-link>
    </div>
    <div
      :style="{ 'background-color': getPokemonTypeColor() }"
      class="grid grid-rows-[100px,1fr,min-content] p-4"
    >
      <div class="flex justify-between mx-3 mt-8">
        <div class="name uppercase text-4xl text-white font-semibold">
          {{ pokemon.species.name }}
        </div>
        <div class="pokedex-num text-white text-5xl font-bold">
          #{{ pokemon.id }}
        </div>
      </div>
      <img
        class="justify-self-center w-64 h-64"
        :src="pokemon.sprites.other['official-artwork'].front_default"
      />
      <div class="flex justify-evenly uppercase">
        <div
          class="type border border-white bg-cool-gray-800 bg-opacity-20 text-white rounded-3xl p-3"
          v-for="type in pokemon.types"
          :key="type.name"
        >
          {{ type.type.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPokemonByName } from "../../../services";
export default {
  props: ["name"],
  data: function () {
    return {
      pokemon: null,
      colorType: {
        fighting: "#e25864",
        flying: "#6d87d6",
        poison: "#7a5292",
        ground: "#653f30",
        rock: "#6c6f77",
        bug: "#9bca7b",
        ghost: "#ddb3f4",
        steel: "#8f9498",
        fire: "#fb6c6c",
        water: "#76bdfe",
        grass: "#48d0b0",
        electric: "#ffce4b",
        psychic: "#f6a4db",
        ice: "#a0eaeb",
        dark: "#525264",
        fairy: "#ee509d",
        normal: "#b8b8b8",
      },
    };
  },
  async mounted() {
    this.pokemon = await getPokemonByName(this.name);
  },
  methods: {
    getPokemonTypeColor() {
      return this.colorType[this.pokemon.types[0].type.name];
    },
  },
};
</script>
