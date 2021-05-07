<template>
  <form>
    <label class="text-lg">Regions: </label>
    <select
      class="capitalize"
      @change="filterPokemonByRegion"
      v-model="selectedRegion"
    >
      <option
        v-for="region in [{ name: 'all' }, ...regions]"
        :key="region.name"
        :value="region.name"
        class="capitalize"
      >
        {{ region.name.replace("-", " ") }}
      </option>
    </select>
  </form>
</template>

<script>
import { getRegions } from "../../../services";

export default {
  data: function () {
    return {
      regions: [],
      selectedRegion: "all",
    };
  },
  async mounted() {
    this.regions = (await getRegions()).results;
  },
  methods: {
    filterPokemonByRegion() {
      this.$emit("regionfilteredpokemon", this.selectedRegion);
    },
  },
};
</script>
