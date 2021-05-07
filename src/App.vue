<template>
  <layout>
    <router-view></router-view>
  </layout>
</template>

<script>
import layout from "./components/layout/layout.vue";
export default {
  name: "App",
  components: {
    layout,
  },
};
</script>
