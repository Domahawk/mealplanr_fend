<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import moment, {Moment} from "moment";
import {MealPlans} from "@/types/mealPlans.ts";
import {calculateCalories} from "@/mixins/mixins.ts";
import {MealPlan} from "@/types/model/mealPlan.ts";

const mealPlans: Ref<MealPlans[] | null> = ref(null);
const currentDate: Moment = moment();
const currentlySelectedPlan: Ref<MealPlans | null> = ref(null);

const getMealPlans = async () => {
  let response = await mealPlanClient.get();
  mealPlans.value = response.data.data;
  selectDefaultMealPlan();
}

const selectDefaultMealPlan = () => {
  mealPlans.value?.forEach((mealPlan: MealPlans) => {
    if (mealPlan.date === currentDate.format('Y-MM-DD').toString()) {
      currentlySelectedPlan.value = mealPlan
    }
  })
}

const getDayOfWeek = (date: string | undefined): string => {
  return moment(date).format('dddd')
}

const formatDate = (date: string | undefined): string => {
  if (date === undefined) {
    return '';
  }

  return moment(date).format('DD.MM.YYYY')
}

const isMealPlanOpen = (mealPlan: MealPlans): boolean => {
  return mealPlan.date === currentlySelectedPlan.value?.date;
}

const selectMealPlan = (mealPlan: MealPlans): void => {
  currentlySelectedPlan.value = mealPlan;
}

const calculateCurrentCalories = (): { eaten: number, planned: number, remaining: number } => {
  let eatenCalories = 0;
  let plannedCalories = 0;
  let remainingCalories = 0;

  currentlySelectedPlan.value?.meals.forEach((meal: MealPlan) => {
    let calories = calculateCalories(meal.meal);
    if (meal.consumed) {
      eatenCalories += calories;
    }

    plannedCalories += calories;
  })

  remainingCalories = plannedCalories - eatenCalories;

  return {
    eaten: eatenCalories,
    planned: plannedCalories,
    remaining: remainingCalories,
  }
}

const markMealAsEaten = async (meal: MealPlan): Promise<void> => {
  let response = await mealPlanClient.updateMealPlan(meal.mealPlanId, {consumed: !meal.consumed})

  if (response.status !== 200) {
    return;
  }

  meal.consumed = !meal.consumed;
}

const removeMealFromPlan = async (meal: MealPlan): Promise<void> => {
  if (currentlySelectedPlan.value === null) {
    return;
  }

  let response = await mealPlanClient.removeMealPlan(meal.mealPlanId);

  if (response.status !== 200) {
    return;
  }

  let meals: MealPlan[] = [];

  currentlySelectedPlan.value?.meals.forEach((currentMeal: MealPlan) => {
    if (currentMeal.mealPlanId !== meal.mealPlanId) {
      meals.push(currentMeal)
    }
  })

  currentlySelectedPlan.value.meals = meals;
}

const mealConsumedClass = (meal: MealPlan) => {
  if (meal.consumed) {
    return 'eaten';
  }

  return '';
}

onMounted(getMealPlans)
</script>

<template>

  <section class="plan-container" v-for="mealPlan in mealPlans">
    <section v-if="isMealPlanOpen(mealPlan)" class="meal-plan-card">
      <div class="meal-plan-card__header">
        <div class="meal-plan-card__header-day">
          <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlan?.date) }}</h2>
          <p class="zero-margin-padding">{{ formatDate(mealPlan?.date) }}</p>
        </div>
        <button class="add-button">+</button>
      </div>
      <div class="meal-plan-card__body">
        <div class="meal-plan-card__body-info">
          <div v-for="(value, key) in calculateCurrentCalories()" :key="key" class="meal-plan-card__body-info__element">
            <p class="zero-margin-padding">{{ key }}</p>
            <p class="zero-margin-padding">{{ value }}</p>
          </div>
        </div>
        <div class="meal-plan-card__body-meals">
          <div v-for="meal in mealPlan.meals" class="meal-plan-card__body-meals__meal">
            <p class="zero-margin-padding"> {{ meal.meal.name }} </p>
            <p class="zero-margin-padding">{{ calculateCalories(meal.meal) }}</p>
            <button class="add-button">Mark</button>
            <button class="remove-button">-</button>
          </div>
        </div>
      </div>
    </section>
    <section v-else @click="selectMealPlan(mealPlan)" class="meal-plan-card">
      <div class="meal-plan-card__header">
        <div class="meal-plan-card__header-day">
          <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlan?.date) }}</h2>
          <p class="zero-margin-padding">{{ formatDate(mealPlan?.date) }}</p>
        </div>
        <button class="add-button">+</button>
      </div>
    </section>
  </section>
</template>

<style scoped>
.zero-margin-padding {
  margin: 0;
  padding: 0;
}

.plan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
}

.meal-plan-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--container-bg);
  border-radius: 12px;
  min-width: 340px;
  padding: 0 30px 30px 30px;
  width: 100%;
  margin: 5px 0;
}

.meal-plan-card__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
}

.meal-plan-card__header-day {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}

.add-button {
  background: var(--safe-color);
  border-radius: 12px;
  padding: 3px 15px;
  border: none;
}

.meal-plan-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}

.meal-plan-card__body-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}

.meal-plan-card__body-info__element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.meal-plan-card__body-meals {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.meal-plan-card__body-meals__meal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
}

.remove-button {
  background: var(--danger-color);
  border-radius: 12px;
  padding: 3px 15px;
  border: none;
}
</style>