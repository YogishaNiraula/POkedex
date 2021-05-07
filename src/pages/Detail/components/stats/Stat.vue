<template>
  <div v-if="pokemon" class="flex flex-col gap-2 p-4">
    <h1 class="text-center text-2xl font-light text-gray-500 m-8">Stats</h1>
    <Meter
      v-for="poke_stat in pokemon.stats"
      :key="poke_stat.stat"
      :value="poke_stat.base_stat"
      :label="poke_stat.stat.name"
    />
  </div>
</template>

<script>
import Meter from "./skillmeter.vue";
import { getPokemonByName } from "../../../../services";
export default {
  props: ["name"],
  components: { Meter },
  data: function () {
    return { pokemon: null };
  },
  async mounted() {
    this.pokemon = await getPokemonByName(this.name);
  },
};
</script>
