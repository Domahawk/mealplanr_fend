<script setup lang="ts">
import {Ref, ref, watch} from "vue";

const props = withDefaults(defineProps<{
  startData: number,
  label: string,
}>(), {
  label: "Amount"
})

const emit = defineEmits<{
  (e: 'dataUpdate', value: number): void
}>();

const data: Ref<number> = ref(props.startData);
const allowedKeys: { [key: string]: Function } = {
  Backspace: () => data.value !== 0,
  Tab: () => true,
  Enter: () => true,
  ArrowLeft: () => true,
  ArrowRight: () => true,
  Delete: () => true,
}

const validateInput = (event: KeyboardEvent) => {
  if (Object.keys(allowedKeys).includes(event.key) && allowedKeys[event.key]()) {
    return;
  }
  if (event.key < '0' || event.key > '9') {
    event.preventDefault();
  }
}

watch(() => props.startData,(value: number) => data.value = value)
</script>

<template>
  <div class="input-field">
    <label for="amount">{{ label }}</label>
    <input
        type="number"
        min="0"
        step="1"
        @keydown="validateInput"
        v-model.number="data"
        @input="emit('dataUpdate', data)"
        id="amount"
    >
  </div>
</template>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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