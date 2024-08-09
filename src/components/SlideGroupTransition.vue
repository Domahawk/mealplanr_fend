<script setup lang="ts">
</script>

<template>
  <TransitionGroup name="transition-list" appear>
    <slot></slot>
  </TransitionGroup>
</template>

<style>
.transition-list-leave-to,
.transition-list-enter-from {
  opacity: 0;
  transform: translateX(800px);

}

.transition-list-leave-active,
.transition-list-enter-active,
.transition-list-enter-to,
.transition-list-leave-from {
  transition: all 0.2s ease;
}

</style>