<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
      isDisabled: boolean;
      buttonName?: string;
    }>(),
    {
      isDisabled: false,
      buttonName: "Submit",
    }
);

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const disabledButton = computed(() => {
  if (props.isDisabled) {
    return 'disabled-button';
  }

  return '';
})
</script>

<template>
  <button
      class="submit-button"
      @click="emit('submit')"
      :disabled="props.isDisabled"
      :class="disabledButton"
  >
    {{ buttonName }}
  </button>
</template>

<style scoped>
.submit-button {
  background: var(--safe-color);
  align-self: end;
  margin: 20px;
  padding: 10px;
  border-radius: 12px;
  color: var(--text-color);
}

.disabled-button {
  background: var(--disabled-button-color);
}
</style>