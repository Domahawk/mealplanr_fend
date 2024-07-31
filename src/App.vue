<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import useTheme from "@/composables/useTheme.ts"
import {onMounted} from "vue";
import ColorModeSwitcher from "@/components/Buttons/ColorModeSwitcher.vue";

const {initTheme} = useTheme();

onMounted(initTheme);
</script>

<template>
  <main>
    <section class="main-app-section">
      <ColorModeSwitcher />
      <router-view/>
      <Navigation/>
    </section>
  </main>

</template>

<style scoped>
</style>
