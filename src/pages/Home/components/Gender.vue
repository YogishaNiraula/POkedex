<template>
  <form>
    <label class="text-lg">Gender: </label>
    <select
      class="capitalize"
      v-model="selectedGender"
      @change="filterPokemonByGender"
    >
      <option
        v-for="gender in [{ name: 'all' }, ...genders]"
        :key="gender.name"
        :value="gender.name"
        class="capitalize"
      >
        {{ gender.name.replace("-", " ") }}
      </option>
    </select>
  </form>
</template>

<script>
import { getGenders } from "../../../services";
export default {
  data: function () {
    return {
      genders: [],
      selectedGender: "all",
    };
  },
  async mounted() {
    this.genders = (await getGenders()).results;
  },
  methods: {
    filterPokemonByGender() {
      this.$emit("genderfilteredpokemon", this.selectedGender);
    },
  },
};
</script>
