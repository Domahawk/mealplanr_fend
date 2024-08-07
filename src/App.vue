<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import useTheme from "@/composables/useTheme.ts"
import {onMounted} from "vue";
import ColorModeSwitcher from "@/components/Buttons/ColorModeSwitcher.vue";
import Notification from "@/components/Notification.vue";

const {initTheme} = useTheme();

onMounted(initTheme);
</script>

<template>
  <main>
    <section class="main-app-section">
      <Notification />
      <ColorModeSwitcher />
      <router-view/>
      <Navigation/>
    </section>
  </main>

</template>

<style scoped>
</style>
