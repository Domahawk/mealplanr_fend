<script setup lang="ts">
import {Ref, ref, watch} from "vue";

const emit = defineEmits<{
  (e: 'textData', value: string): void
}>();

const props = withDefaults(defineProps<{
  label: string;
  startData?: string;
  type?: string;
  id?: string,
  name?: string,
  isRequired?: boolean,
}>(), {
  label: "Data",
  startData: "",
  type: "text",
  id: "text-data",
  name: "text-data",
  isRequired: false,
});

let data: Ref<string> = ref(props.startData);

watch(() => props.startData,(value: string) => data.value = value)
</script>

<template>
  <label for="text-data">{{ label }}</label>
  <input v-if="isRequired"
         v-model="data"
         @input="emit('textData', data)"
         :type="type"
         :id="id"
         :name="name"
         required
  />
  <input v-else
         v-model="data"
         @input="emit('textData', data)"
         :type="type"
         :id="id"
         :name="name"
  />
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
