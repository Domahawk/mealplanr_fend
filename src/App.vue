<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Navigation/>

  <main>
    <section class="container">
        <router-view/>
    </section>
  </main>

  <Footer/>
</template>

<style scoped>

</style>
