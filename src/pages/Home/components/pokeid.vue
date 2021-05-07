<template>
  <div v-if="image" class="flex items-center">
    <img class="md:w-32 md:h-32 w-24 h-24 z-2" :src="image" />
    <p
      class="-ml-24 md:-ml-16 font-bold tracking-wider text-white opacity-50 @md:text-5xl text-6xl md:text-8xl"
    >
      #{{ String(id).padStart(3, "0") }}
    </p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  props: ["image", "id"],
};
</script>
