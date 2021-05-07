<template>
  <div v-if="!isloading">
    <div
      class="border rounded-xl p-4"
      :style="{ 'background-color': getPokemonTypeColor() }"
    >
      <div class="">
        <p class="text-2xl font-semibold text-center text-white capitalize">
          {{ pokemon.name }}
        </p>
        <PokeId
          :id="pokemon.id"
          :image="pokemon.sprites.other['official-artwork'].front_default"
        />
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import PokeId from "./pokeid.vue";
import { getPokemonByName } from "../../../services";
export default {
  props: ["name"],
  components: {
    PokeId,
  },
  data: function () {
    return {
      pokemon: null,
      isloading: true,
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
    this.isloading = false;
  },
  methods: {
    getPokemonTypeColor() {
      return this.colorType[this.pokemon.types[0].type.name];
    },
  },
};
</script>
