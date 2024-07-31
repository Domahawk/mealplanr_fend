<script setup lang="ts">
import {Ref, ref} from "vue";

const emit = defineEmits<{
  (e: 'textData', value: string): void
}>();

withDefaults(defineProps<{
  label: string;
}>(), {
  label: "Data",
});

let data: Ref<string> = ref('');
</script>

<template>
  <label for="text-data">{{ label  }}</label>
  <input id="text-data" v-model="data" @input="emit('textData', data)" />
</template>

<style scoped>
input {
  background: var(--background);
  border: none;
  border-radius: 12px;
  padding: 20px;
  color: var(--text-color);
  margin: 5px 5px 0 5px;
  width: 100%;
  height: 25px;
  font-family: Comfortaa, sans-serif;
}

input:focus {
  outline: none;
}
</style>
