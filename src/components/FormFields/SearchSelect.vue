<script setup lang="ts">
import {Ref, ref} from "vue";
import {Model} from "@/types/model/model.ts";

const emit = defineEmits<{
  (e: 'search', value: string): void,
  (e: 'addElement', value: Model): void,
}>()

withDefaults(defineProps<{
  selectOptions: Model[],
  title?: string,
  placeholder?: string,
}>(), {
  title: 'Select an option',
  placeholder: 'Search for an option...',
})

const isOpen: Ref<boolean> = ref(false);
const searchQuery: Ref<string> = ref('');

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
};

function selectOption (option: Model): void {
  if (option) {
    emit('addElement', option)
    searchQuery.value = '';
    emit('search', searchQuery.value)
  }

  toggleDropdown();
}
</script>

<template>
  <div class="search-select-container">
    <label>{{ title }}</label>
    <div>
      <div class="dropdown">
        <input
            type="text"
            v-model="searchQuery"
            @click="toggleDropdown"
            @input="emit('search', searchQuery)"
            :placeholder="placeholder"
            class="input-field"
        />
        <div v-if="isOpen" class="dropdown-menu">
          <div
              v-for="option in selectOptions"
              :key="option.id"
              class="dropdown-item"
              @click="selectOption(option)"
          >
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-select-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  margin-bottom: 10px;
}

.dropdown {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 15px;
  right: 5px;
  background: var(--background);
  border-radius: 0 0 12px 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.input-field {
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

.input-field:focus {
  outline: none;
}
</style>