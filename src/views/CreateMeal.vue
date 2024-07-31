<script setup lang="ts">

import {computed, onMounted, ref, Ref} from "vue";
import {Ingredient} from "@/types/model/ingredient.ts";
import SearchSelect from "@/components/FormFields/SearchSelect.vue";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";
import {Model} from "@/types/model/model.ts";
import {useIngredientsStore} from "@/store/ingredients.ts";
import {MealIngredient} from "@/types/model/mealIngredient.ts";
import {mealsClient} from "@/network/endpoints/mealsClient.ts";
import SubmitButton from "@/components/Buttons/SubmitButton.vue";
import NumberInputField from "@/components/FormFields/NumberInputField.vue";
import TextInputField from "@/components/FormFields/TextInputField.vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import RemoveButton from "@/components/Buttons/RemoveButton.vue";

const mealName: Ref<string> = ref('');
const selectedIngredient: Ref<Ingredient> = ref(<Ingredient>{});
const ingredients: Ref<MealIngredient[]> = ref([]);
const grams: Ref<number> = ref(0);
const options: Ref<Ingredient[]> = ref([]);
const iStore = useIngredientsStore();

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);

const isAddIngredientDisabled = computed(() => {
  return Object.keys(selectedIngredient.value).length === 0 || grams.value === 0;
});

const isDisabled = computed(() => {
  return mealName.value.length === 0 || ingredients.value.length === 0;
});

const addIngredient = () => {
  if (Object.keys(selectedIngredient.value).length === 0 || grams.value === 0) {
    return;
  }

  let mealIngredient: MealIngredient = {
    ingredient: selectedIngredient.value,
    grams: grams.value,
  }

  ingredients.value.push(mealIngredient);
  selectedIngredient.value = <Ingredient>{};
  grams.value = 0;

  console.log(grams.value)
}

const filterIngredients = (search: string) => {
  clearTimeout(timeout);

  timeout = setTimeout(async function () {
    options.value = await iStore.getIngredients(search);
  }, 1200);
}

const removeIngredient = (index: number) => {
  ingredients.value.splice(index, 1)
}

const updateGrams = (updateValue: number | string) => {
  if (typeof updateValue == 'string') {
    grams.value = 0;

    return;
  }

  grams.value = updateValue
}

const createMealRequest = async () => {
  await mealsClient.createMeal(mealName.value, ingredients.value)
  location.reload()
}

const getIngredients = async () => {
  let response = await ingredientsClient.get();

  options.value = response.data.data;
}

onMounted(getIngredients)
</script>

<template>
  <hgroup>
    <h2>Create Meal</h2>
    <h3>Enter meal details</h3>
  </hgroup>
  <section class="meal-form">
    <div class="form-section-container">
      <TextInputField label="Meal name" @text-data="(value: string) => mealName = value"/>
    </div>
    <div class="form-section-container">
      <div class="add-ingredient-fields">
        <SearchSelect
            :select-options="options"
            @search="filterIngredients"
            @addElement="(value: Model): void => {selectedIngredient = value as Ingredient}"
        />
        <NumberInputField label="Grams" :start-data="grams" @data-update="updateGrams"/>
      </div>
      <div class="added-ingredients">
        <p>{{ selectedIngredient?.name }}</p>
        <AddButton @addElement="addIngredient" />
      </div>
    </div>
  </section>
    <section class="selected-ingredients">
      <h3>Selected ingredients</h3>
      <div class="selected-ingredients__ingredient" v-for="(mealIngredient, index) in ingredients">
        <p>{{ mealIngredient.ingredient?.name }} {{ mealIngredient?.grams }}</p>
        <RemoveButton @remove-element="removeIngredient(index)"/>
      </div>
      <SubmitButton
          :isDisabled="isDisabled"
          @submit="createMealRequest"
      />
    </section>
</template>
<style scoped>
.meal-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  max-width: 800px;
}

.form-section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--container-bg);
  margin: 10px;
  padding: 30px;
  border-radius: 12px;
}

.add-ingredient-fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.added-ingredients {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.selected-ingredients {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  margin: 10px;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
}

.selected-ingredients__ingredient {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
}
</style>