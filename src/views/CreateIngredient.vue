<script setup lang="ts">
import TextInputField from "@/components/FormFields/TextInputField.vue";
import {computed, Ref, ref} from "vue";
import NumberInputField from "@/components/FormFields/NumberInputField.vue";
import SubmitButton from "@/components/Buttons/SubmitButton.vue";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";


const ingredientName: Ref<string> = ref('');
const calories: Ref<number> = ref(0);

const isDisabled = computed(() => {
  return ingredientName.value === '' || calories.value === 0
})

const updateCalories = (updateValue: number | string) => {
  if (typeof updateValue == 'string') {
    calories.value = 0;

    return;
  }

  calories.value = updateValue
}

const createIngredient = async () => {
  await ingredientsClient.createIngredient(ingredientName.value, calories.value);
}

</script>

<template>
  <Transition name="create-ingredient-container" appear>
    <section class="create-ingredient-container">
      <hgroup>
        <h2>Add Ingredient</h2>
        <h3>Enter ingredient details</h3>
      </hgroup>
      <form class="ingredient-form">
        <div class="ingredient-form__input-field">
          <TextInputField label="Ingredient name" @text-data="(value) => ingredientName = value"/>
        </div>
        <NumberInputField label="Calories per 100g" :start-data="calories" @data-update="updateCalories"/>
      </form>
      <SubmitButton :isDisabled="isDisabled" @submit="createIngredient"/>
    </section>
  </Transition>
</template>

<style scoped>

.create-ingredient-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
}

.ingredient-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: var(--container-bg);
  padding: 20px;
  border-radius: 12px;
}

.ingredient-form__input-field {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.create-ingredient-container-enter-from {
  opacity: 0;
}

.create-ingredient-container-enter-to,
.create-ingredient-container-leave-from {
  opacity: 1;
  transition: all 0.5s ease;
}

.create-ingredient-container-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>