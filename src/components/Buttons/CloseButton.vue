<script setup lang="ts">
const emit = defineEmits<{
  (e: 'closeElement'): void
}>()

</script>

<template>
  <div @click="emit('closeElement')">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle close-element neon-glow">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  </div>
</template>

<style scoped>
.close-element {
  color: var(--danger-color);
}
</style>