<script setup lang="ts">
import {Ref, ref} from "vue";

const emit = defineEmits<{
  (e: 'date', value: string): void
}>()

const dateValue: Ref<string> = ref('');

</script>

<template>
  <div class="pick-date">
    <label for="date">Pick a Date</label>
    <input type="date" v-model="dateValue" @input="emit('date', dateValue)" required/>
  </div>
</template>

<style scoped>
.pick-date {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: start;
}
</style>