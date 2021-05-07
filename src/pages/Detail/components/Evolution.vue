<template>
  <div v-if="!isloading">
    <h1 class="text-center text-2xl font-light text-gray-500 m-8">
      Evolution Chain
    </h1>
    <div class="flex justify-center gap-10">
      <div class="sm:flex items-center">
        <div
          class="flex flex-col items-center"
          v-for="link in links"
          :key="link.name"
        >
          <img class="w-32 h-32" :src="link.pokemon.sprites.front_default" />
          <h1
            class="text-center text-xl text-gray-600 font-bold tracking-wide capitalize px-8 py-1"
          >
            {{ link.name }}
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {
  getPokemonSpecies,
  getDataFromUrl,
  getPokemonByName,
} from "../../../services";
export default {
  props: ["name"],
  data: function () {
    return {
      isloading: true,
      evolution: null,
      description: null,
      links: null,
      pokename: null,
      image: null,
    };
  },
  async mounted() {
    this.description = await getPokemonSpecies(this.name);
    this.evolution = await getDataFromUrl(this.description.evolution_chain.url);
    await this.getEvolutionData();
    this.isloading = false;
  },
  methods: {
    async getEvolutionData() {
      /* 
        for fetching nested datas:
        1.Declare an empty array, boolean
        2.Run a loop, push first fetched data into the array
        3.Set a condition for the loop 
        to either continue into the nested data 
        or exit the loop
      */
      const evolutionPath = [];
      let currentEvolution = this.evolution.chain;
      let isComplete = false;
      while (!isComplete) {
        evolutionPath.push({
          name: currentEvolution.species.name,
          pokemon: await getPokemonByName(currentEvolution.species.name),
        });
        if (currentEvolution.evolves_to.length === 0) {
          isComplete = true;
        } else {
          currentEvolution = currentEvolution.evolves_to[0];
        }
      }
      this.links = evolutionPath;
    },
  },
};
</script>
