<script setup lang="ts">

import router from "@/router/router.ts";
</script>

<template>
  <div class="button-container">
    <button @click="router.back()">Back</button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
</style>