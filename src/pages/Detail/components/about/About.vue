<template>
  <div class="text-lg p-4" v-if="!isloading">
    <div class="text-gray-600 text-xl text-center">
      {{ flavorText.flavor_text }}
    </div>
    <BMI
      :height="parseInt(pokemon.height) / 10"
      :weight="parseInt(pokemon.weight) / 10"
    />
    <h1 class="text-center text-2xl font-light text-gray-500 m-8">
      Characterstics
    </h1>
    <div>
      <div class="habitat grid grid-cols-2 my-3">
        <h1 class="text-xl font-bold text-gray-600 capitalize">Habitat</h1>
        <div class="content font-bold text-gray-500">
          {{ description.habitat.name }}
        </div>
      </div>
      <div class="eggs grid grid-cols-2 my-3">
        <h1 class="text-xl font-bold text-gray-600 capitalize">Egg Group</h1>
        <div class="content font-bold text-gray-500">
          <div v-for="eggs in description.egg_groups" :key="eggs.name">
            {{ eggs.name }}
          </div>
        </div>
      </div>
      <div class="ability grid grid-cols-2 my-3">
        <h1 class="text-xl font-bold text-gray-600 capitalize">Abilities</h1>
        <div class="content font-bold text-gray-500">
          <div v-for="ability in pokemon.abilities" :key="ability.name">
            {{ ability.ability.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BMI from "./bmi.vue";
import { getPokemonByName, getPokemonSpecies } from "../../../../services";
export default {
  components: { BMI },
  props: ["name"],
  data: function () {
    return {
      pokemon: null,
      description: null,
      isloading: true,
      flavorText: null,
    };
  },

  async mounted() {
    this.pokemon = await getPokemonByName(this.name);
    this.description = await getPokemonSpecies(this.name);
    this.getFlavorText();
    this.isloading = false;
  },
  methods: {
    getFlavorText() {
      const array = this.description.flavor_text_entries;
      const text = array.filter((arr) => {
        if ("en" === arr.language.name) {
          return arr.flavor_text;
        }
      });
      this.flavorText = text[2];
    },
  },
};

/*
 e =[]
 f.push(e)
 if en === e.lan.name {v = index, l= ...[index]...}
*/
</script>

<style scoped>
.content {
  text-transform: capitalize;
}
</style>
