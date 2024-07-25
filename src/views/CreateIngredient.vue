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
  <section>
    <hgroup>
      <h2>Add Ingredient</h2>
      <h3>Enter ingredient details</h3>
    </hgroup>
    <form class="ingredient-form">
      <div class="text-field">
        <TextInputField label="Ingredient name" @text-data="(value) => ingredientName = value"/>
      </div>
      <NumberInputField label="Calories per 100g" :start-data="calories" @data-update="updateCalories"/>
      <SubmitButton :isDisabled="isDisabled" @submit="createIngredient"/>
    </form>
  </section>
</template>

<style scoped>

.ingredient-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}

.text-field {
  display: flex;
  flex-direction: column;
  align-items: start;
}

</style>