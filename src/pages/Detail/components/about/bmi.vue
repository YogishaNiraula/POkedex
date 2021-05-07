<template>
  <div class="bg-white shadow-md flex justify-evenly rounded-lg my-8 p-3">
    <div class="">
      <h1 class="text-gray-500 text-md">Height</h1>
      <p>{{ height }} m</p>
    </div>
    <div>
      <h1 class="text-gray-400 text-md">Weight</h1>
      <p>{{ weight }} kg</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["weight", "height"],
};
</script>
