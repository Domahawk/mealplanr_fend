<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <main>
    <section class="main-app-section">
      <router-view/>
      <Navigation />
    </section>
  </main>

</template>

<style scoped>

</style>
