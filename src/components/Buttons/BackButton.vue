<script setup lang="ts">

import router from "@/router/router.ts";
import ArrowLeftSvg from "@/components/SvgComponents/ArrowLeftSvg.vue";
</script>

<template>
  <div class="button-container" @click="router.back()">
    <ArrowLeftSvg />
  </div>
</template>

<style scoped>
.button-container {
  min-width: 30px;
  cursor: pointer;
}
</style>