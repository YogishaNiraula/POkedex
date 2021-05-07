<template>
  <header class="grid place-content-center m-4">
    <router-link
      to="/"
      class="text-4xl tracking-wider text-gray-700 font-light p-2"
      >Pokédex</router-link
    >
  </header>
  <div class="grid justify-center" v-if="!isloading">
    <div class="flex justify-between m-4">
      <p class="text-xl font-light text-gray-500">
        Current Page:
        <span class="text-lg font-bold text-gray-800"
          >{{ pageNumber + 1 }} /
          {{ (totalItems / limit + 1).toFixed(0) }}</span
        >
      </p>
      <div class="flex gap-10">
        <button
          @click="updateLimit(-1)"
          class="px-4 py-2 font-bold text-gray-600 border border-gray-300 shadow-lg rounded bg-gray-50 disabled:bg-gray-50 disabled:text-gray-200"
          :disabled="!hasPrev"
        >
          Prev
        </button>
        <button
          @click="updateLimit(1)"
          class="px-4 py-2 font-bold text-gray-600 border border-gray-300 shadow-lg rounded bg-gray-50 disabled:bg-gray-50 disabled:text-gray-200"
          :disabled="!hasNext"
        >
          Next
        </button>
      </div>
    </div>

    <form @submit.prevent="searchPokemonByName">
      <div class="floating mx-4">
        <input
          id="inputId"
          class="floating-input w-full"
          v-model="searchtext"
          name="name"
          placeholder="Search Pokemon by name"
        />
        <label
          for="inputId"
          class="floating-label text-xl"
          data-content="Search Pokemon by name"
        >
        </label>
      </div>
    </form>
    <h1 class="mx-4 text-xl">Search by</h1>
    <div class="sm:flex justify-between m-4">
      <Gender @genderfilteredpokemon="getGPokemon" />
      <Habitat @habitatfilteredpokemon="getHPokemon" />
      <Region @regionfilteredpokemon="getRPokemon" />
    </div>
    <div class="text-2xl text-center text-red-500">{{ errormsg }}</div>
    <div class="grid grid-cols-2 md:grid-cols-3 m-4 gap-4">
      <router-link
        :to="`/${pokemon.name}`"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <Pokecard :name="pokemon.name" />
      </router-link>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import Gender from "./components/Gender.vue";
import Habitat from "./components/Habitat.vue";
import Region from "./components/Region.vue";
import Pokecard from "./components/pokecard.vue";
import {
  getPokemons,
  searchForPokemonName,
  getPokemonByHabitat,
  getPokemonByGender,
  getPokemonByRegion,
  getDataFromUrl,
} from "../../services/index.js";
export default {
  data: function () {
    return {
      pokemons: null,
      limit: 15,
      pageNumber: 0,
      hasNext: false,
      hasPrev: false,
      totalItems: 0,
      isloading: true,
      searchtext: "",
      errormsg: "",
    };
  },
  components: { Pokecard, Gender, Habitat, Region },
  watch: {
    limit: async function (newLimit, oldLimit) {
      await this.fetchLimitedPokemons();
    },
    pageNumber: async function (newOffset, oldOffest) {
      await this.fetchLimitedPokemons();
    },
  },
  async mounted() {
    await this.fetchLimitedPokemons();
  },
  methods: {
    async searchPokemonByName(event) {
      if (this.searchtext.trim() === "") {
        this.isLoading = false;
        await this.fetchLimitedPokemons();
        return;
      }
      const form = event.target;
      this.isLoading = true;
      try {
        this.pokemons = await searchForPokemonName(this.searchtext);
        if (!this.pokemons.length) {
          return (this.errormsg = `${this.searchtext} pokemon does not exist`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        form.reset();
        this.isLoading = false;
      }
    },
    async getHPokemon(habitat) {
      if (habitat === "all") return;
      this.isLoading = true;
      this.pokemons = await getPokemonByHabitat(habitat);
      this.isLoading = false;
    },
    async getGPokemon(gender) {
      if (gender === "all") return;
      this.isLoading = true;
      this.pokemons = await getPokemonByGender(gender);
      this.isLoading = false;
    },
    async getRPokemon(region) {
      if (region === "all") return;
      this.isLoading = true;
      const url = await getPokemonByRegion(region);
      this.pokemons = (await getDataFromUrl(url)).pokemon_entries.map(
        (entry) => {
          return entry.pokemon_species;
        },
      );
      console.log(this.pokemons);
      this.isLoading = false;
    },
    async fetchLimitedPokemons() {
      const data = await getPokemons({
        limit: this.limit,
        offset: this.pageNumber * this.limit,
      });
      this.totalItems = data.count;
      this.hasNext = Boolean(data?.next);
      this.hasPrev = Boolean(data?.previous);
      this.pokemons = data.results;
      this.isloading = false;
    },
    updateLimit(value) {
      this.pageNumber += value;
    },
  },
};
</script>

<style scoped>
button {
  outline: none;
}
input {
  background: none;
  border-width: 0;
  display: block;
}
.floating {
  margin-bottom: 2rem;
  transition: 0.2s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.floating-input {
  padding: 1.8rem 1rem 0.6rem;
  font-size: 1rem;
  border-bottom: 0.1rem solid;
  transition: 0.2s ease;
  outline: none;
}
.floating-input::placeholder {
  color: rgba(0, 0, 0, 0);
}
.floating-label {
  display: block;
  position: relative;
  max-height: 0;
  font-weight: 500;
  pointer-events: none;
}
.floating-label::before {
  content: attr(data-content);
  display: inline-block;
  transform-origin: left top;
  transition: transform 0.2s ease;
  left: 1rem;
  position: relative;
}
.floating-input:focus + .floating-label::after {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
.floating-input:placeholder-shown + .floating-label::before {
  transform: translate3d(0, -2.6rem, 0) scale3d(1, 1, 1);
}
.floating-label::before,
.floating-input:focus + .floating-label::before {
  transform: translate3d(0, -3.12rem, 0) scale3d(0.82, 0.82, 1);
}
</style>
