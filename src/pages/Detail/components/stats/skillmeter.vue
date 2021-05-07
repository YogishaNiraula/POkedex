<template>
  <div class="grid items-center grid-cols-3 gap-0">
    <p class="text-xl font-bold text-gray-600 capitalize">
      {{ label.replace("-", " ") }}
    </p>
    <p class="text-xl font-bold text-gray-500">{{ value }}</p>
    <div class="bar shadow-md">
      <div class="meter" :style="{ width: value + '%' }" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PokeStat",
  props: ["value", "label"],
};
</script>

<style scoped>
.bar {
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
}
.meter {
  text-align: center;
  font-weight: bolder;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 20px;
  background-color: #2dc66d;
}
</style>
