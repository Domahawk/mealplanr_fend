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
</style>