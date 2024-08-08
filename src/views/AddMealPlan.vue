<script setup lang="ts">
import {computed, onMounted, ref, Ref} from 'vue';
import {calculateCalories} from "../mixins/mixins.ts";
import {useMealPlansStore} from "@/store/mealPlan.ts";
import SearchSelect from "@/components/FormFields/SearchSelect.vue";
import DatePicker from "@/components/FormFields/DatePicker.vue";
import FormSubmitButton from "@/components/Buttons/SubmitButton.vue";
import {Meal} from "@/types/model/meal.ts";
import {Model} from "@/types/model/model.ts";

const searchQuery: Ref<string> = ref('');
const selectedMeal: Ref<Meal | null> = ref(null);
const addedMeals: Ref<Meal[]> = ref([]);
const selectOptions: Ref<Meal[]> = ref([]);
const selectedDate: Ref<string> = ref('');

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);

const mealPlanStore = useMealPlansStore();

const totalCalories = computed(() =>
    addedMeals.value.reduce((total, meal) => total + calculateCalories(meal), 0)
);

const isDisabled = computed(() => {
  return addedMeals.value.length === 0 || selectedDate.value === '';
})

const selectDate = (date: string): void => {
  selectedDate.value = date;
}

function addMeal(meal: Meal): void {
  addedMeals.value.push(meal);
  selectedMeal.value = null;
  searchQuery.value = '';
}

function removeMeal(index: number): void {
  addedMeals.value.splice(index, 1)
}

function filterMealRequest(search: string): void {
  clearTimeout(timeout);

  timeout = setTimeout(async function () {
    let response = await mealPlanStore.getMeals(search);

    if (response) {
      selectOptions.value = response;
    }
  }, 1200);
}

onMounted(async () => {
  let response = await mealPlanStore.getMeals();

  if (response) {
    selectOptions.value = response;
  }
})
</script>

<template>
  <h2>Add Meal Plan</h2>
  <section class="meal-plan-form">
    <div class="meal-adder">
      <DatePicker @date="selectDate"/>
      <SearchSelect
          @search="filterMealRequest"
          @addElement="(value: Model): void => addMeal(value as Meal)"
          :selectOptions="selectOptions"
          title="Select a meal"
          placeholder="Search for a meal..."
      />
    </div>
    <div class="added-meals">
      <div class="added-meals-header">
        <strong>List of Added Meals</strong>
        <strong>Total Calories: {{ totalCalories }}</strong>
      </div>
      <ul>
        <li v-for="(meal, index) in addedMeals">
          Meal: {{ meal.name }} Calories: {{ calculateCalories(meal) }}
          <button class="remove-element" @click="removeMeal(index)">-</button>
        </li>
      </ul>
    </div>
  </section>
  <section class="submit-button">
    <FormSubmitButton
        :isDisabled="isDisabled"
        @submit="mealPlanStore.submitMealPlan(selectedDate, addedMeals)"
    />
  </section>
</template>

<style scoped>
.meal-plan-form {
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;
}

.meal-adder {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0;
  width: 100%;
  height: 300px;
  padding: 0 0 0 20px;
}

.added-meals {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0;
  padding: 0;
  justify-self: end;
  align-self: start;
  width: 100%;
}

.meal-adder, .added-meals {

  background-color: var(--background);
  border-radius: 10px;
  min-height: 300px;
  margin: 10px;
  padding: 30px;
}

.added-meals-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.remove-element {
  background: var(--danger-color);
  padding: 0 15px;
  margin: 0 5px;
}

.remove-element:hover {
  background: var(--active);
}

.submit-button {
  display: flex;
  flex-direction: column;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 0 0 30px;
  padding: 0;
}
</style>
