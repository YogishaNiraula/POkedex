<template>
  <div class="grid justify-center">
    <div><Pokemon :name="name" /></div>
    <div class="m-6">
      <div>
        <About :name="name" />
        <Stat :name="name" />
        <Evolution :name="name" />
        <Moves :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from "./components/Pokemon.vue";
import About from "./components/about/About.vue";
import Stat from "./components/stats/Stat.vue";
import Evolution from "./components/Evolution.vue";
import Moves from "./components/Moves.vue";
export default {
  data: function () {
    const name = this.$route.params?.name;
    return {
      name,
    };
  },
  components: { Pokemon, About, Stat, Evolution, Moves },
};
</script>
