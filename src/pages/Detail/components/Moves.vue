<template>
  <div v-if="!isloading">
    <h1 class="text-center text-2xl font-light text-gray-500 m-8">Moves</h1>
    <div>
      <div class="grid md:grid-cols-3 <sm:grid-cols-1 grid-cols-2 gap-4">
        <div
          class="bg-gray-50 shadow-md rounded-xl m-6 p-4 px-8 text-gray-700 capitalize"
          v-for="move in moves"
          :key="move.name"
        >
          <h5
            class="text-gray-500 text-xl text-center font-light tracking-wide mb-8"
          >
            {{ move.name }}
          </h5>
          <div>
            <div class="grid grid-cols-2 gap-4">
              <p class="font-bold text-gray-400">PP</p>
              <p class="font-semibold text-gray-700">
                {{ move.pp ?? "Unknown" }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <p class="font-bold text-gray-400">Power</p>
              <p class="font-semibold text-gray-700">
                {{ move.power ?? "-" }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <p class="font-bold text-gray-400">Accuracy</p>
              <p class="font-semibold text-gray-700">
                {{ move.accuracy ?? "-" }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <p class="font-bold text-gray-400">Priority</p>
              <p class="font-semibold text-gray-700">
                {{ move.priority ?? "-" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataFromUrl, getPokemonByName } from "../../../services";
export default {
  props: ["name"],
  data: function () {
    return {
      pokemon: null,
      moves: [],
      isloading: true,
    };
  },
  async mounted() {
    this.pokemon = await getPokemonByName(this.name);
    await this.getPokemonMoves();
    this.isloading = false;
  },
  methods: {
    /*
    1. Use slice function to slice the data
    2. Map the sliced data with a argument
     that matches the object's data
    3. Take datas from arguments
    4. Get needed data fetching API with argument's url
    */
    async getPokemonMoves() {
      const link = this.pokemon.moves;
      let moveRequests = link.slice(0, 9).map(async ({ move }) => {
        let { name, url } = move;
        const moveData = await getDataFromUrl(url);
        return { ...moveData, name: name.replace("-", " ") };
      });
      this.moves = await Promise.all(moveRequests);
    },
  },
};
</script>
