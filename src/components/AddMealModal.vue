<script setup lang="ts">

import {Model} from "@/types/model/model.ts";
import {Meal} from "@/types/model/meal.ts";
import {calculateCalories, formatDate, getDayOfWeek} from "@/mixins/mixins.ts";
import {computed, onMounted, ref, Ref} from "vue";
import {useMealPlansStore} from "@/store/mealPlan.ts";
import {MealPlans} from "@/types/mealPlans.ts";
import SearchSelect from "@/components/FormFields/SearchSelect.vue";
import RemoveButton from "@/components/Buttons/RemoveButton.vue";
import SubmitButton from "@/components/Buttons/SubmitButton.vue";
import CloseButton from "@/components/Buttons/CloseButton.vue";

const props = defineProps<{
  mealPlans: MealPlans
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();

const selectOptions: Ref<Meal[]> = ref([]);
const mealPlanStore = useMealPlansStore();
const searchQuery: Ref<string> = ref('');
const selectedMeal: Ref<Meal | null> = ref(null);
const addedMeals: Ref<Meal[]> = ref([]);
let timeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);

const isDisabled = computed(() => {
  return addedMeals.value.length < 1;
});

function filterMealRequest(search: string): void {
  clearTimeout(timeout);

  timeout = setTimeout(async function () {
    selectOptions.value = await mealPlanStore.getMeals(search)
  }, 1200);
}

function addMeal(meal: Meal): void {
  addedMeals.value.push(meal);
  selectedMeal.value = null;
  searchQuery.value = '';
}

const getSelectOptions = async (): Promise<void> => {
  selectOptions.value = await mealPlanStore.getMeals();
}

const removeMeal = (mealIndex: number): void => {
  addedMeals.value.splice(mealIndex, 1)
}

const submitData = async (): Promise<void> => {
  await mealPlanStore.submitMealPlan(props.mealPlans.date, addedMeals.value);
  emit('close');
}

onMounted(getSelectOptions);
</script>

<template>
  <section class="add-meal-modal">
    <div class="add-meal-modal__container">
      <CloseButton style="align-self: end; margin: 20px;" @closeElement="emit('close')"/>
      <div class="add-meal-modal__header">
        <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlans?.date) }}</h2>
        <p class="zero-margin-padding">{{ formatDate(mealPlans?.date) }}</p>
      </div>
      <div class="add-meal-modal__form">
        <SearchSelect
            @search="filterMealRequest"
            @addElement="(value: Model): void => addMeal(value as Meal)"
            :selectOptions="selectOptions"
            title="Select a meal"
            placeholder="Search for a meal..."
        />
        <strong>Total Calories: 1000</strong>
        <ul class="add-meal-modal__form__meal-list">
          <li class="add-meal-modal__form__meal-list__item" v-for="(meal, key) in addedMeals" :key="key">
            <p>{{ meal.name }} - {{ calculateCalories(meal) }} </p>
            <RemoveButton @remove-element="removeMeal(key)"/>
          </li>
        </ul>
      </div>
      <SubmitButton
          @submit="submitData"
          :isDisabled="isDisabled"/>
    </div>
  </section>
</template>

<style scoped>
.add-meal-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.add-meal-modal__container {
  background: var(--container-bg);
  width: 100%;
  margin: 10vw;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-meal-modal__header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-meal-modal__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}

.add-meal-modal__form__meal-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-meal-modal__form__meal-list__item {
  margin: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>