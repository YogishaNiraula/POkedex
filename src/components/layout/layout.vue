<template>
  <div class="layout">
    <Header class="header" />
    <div>
      <slot />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "./header.vue";

import Footer from "./footer.vue";
export default {
  components: { Header, Footer },
};
</script>

<style scoped>
.border {
  border-color: #7160a8;
  border-style: double;
}
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.header {
  min-height: 75px;
}

.footer {
  min-height: 75px;
}
</style>
