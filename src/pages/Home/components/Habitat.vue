<template>
  <form>
    <label class="text-lg">Habitat: </label>
    <select
      class="capitalize"
      @change="filterPokemonByHabitat"
      v-model="selectedHabitat"
    >
      <option
        v-for="habitat in [{ name: 'all' }, ...habitats]"
        :key="habitat.name"
        :value="habitat.name"
        class="capitalize"
      >
        {{ habitat.name.replace("-", " ") }}
      </option>
    </select>
  </form>
</template>

<script>
import { getHabitats } from "../../../services";
export default {
  data: function () {
    return {
      habitats: [],
      selectedHabitat: "all",
    };
  },
  async mounted() {
    this.habitats = (await getHabitats()).results;
  },
  methods: {
    filterPokemonByHabitat() {
      this.$emit("habitatfilteredpokemon", this.selectedHabitat);
    },
  },
};
</script>
