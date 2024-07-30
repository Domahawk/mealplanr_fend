<script setup lang="ts">
import {calculateCalories, getDayOfWeek, formatDate} from "@/mixins/mixins.ts";
import {MealPlan} from "@/types/model/mealPlan.ts";
import {MealPlans} from "@/types/mealPlans.ts";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";

const props = withDefaults(defineProps<{
  mealPlans: MealPlans
}>(), {
  mealPlans: () => <MealPlans>{}
})

const calculateCurrentCalories = (): { eaten: number, planned: number, remaining: number } => {
  let eatenCalories = 0;
  let plannedCalories = 0;
  let remainingCalories = 0;

  props.mealPlans.meals.forEach((meal: MealPlan) => {
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

</script>

<template>
  <section class="meal-plan-card">
    <div class="meal-plan-card__header">
      <div class="meal-plan-card__header-day">
        <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlans?.date) }}</h2>
        <p class="zero-margin-padding">{{ formatDate(mealPlans?.date) }}</p>
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
        <div v-for="meal in mealPlans.meals" class="meal-plan-card__body-meals__meal">
          <p class="zero-margin-padding"> {{ meal.meal.name }} </p>
          <p class="zero-margin-padding">{{ calculateCalories(meal.meal) }}</p>
          <button class="add-button">Mark</button>
          <button class="remove-button">-</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>