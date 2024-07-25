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
const mealPlansWithoutCurrent: Ref<MealPlans[]> = ref([]);

const getMealPlans = async () => {
  let response = await mealPlanClient.get();
  mealPlans.value = response.data.data;
  selectDefaultMealPlan();
  getMealPlanWithoutCurrent();
}

const selectDefaultMealPlan = () => {
  mealPlans.value?.forEach((mealPlan: MealPlans) => {
    if (mealPlan.date === currentDate.format('Y-MM-DD').toString()) {
      currentlySelectedPlan.value = mealPlan
    }
  })
}

const getMealPlanWithoutCurrent = () => {
  mealPlansWithoutCurrent.value = [];
  mealPlans.value?.forEach((mealPlan: MealPlans) => {
    if (mealPlan.date != currentlySelectedPlan.value?.date) {
      mealPlansWithoutCurrent.value?.push(mealPlan)
    }
  })
}

const getDayOfWeek = (date: string | undefined): string => {
  return moment(date).format('dddd')
}

const selectNewPlan = (plan: MealPlans) => {
  currentlySelectedPlan.value = plan;
  getMealPlanWithoutCurrent()
}

const calculateCurrentCalories = (): {eaten: number, planned: number, remaining: number} => {
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
  <section class="main-section">
    <div class="today-plan">
      <section class="today">
        <h2>{{ getDayOfWeek(currentlySelectedPlan?.date) }}</h2>
        <div class="meals" v-for="meal in currentlySelectedPlan?.meals">
          <div class="meals-container" :class="mealConsumedClass(meal)">
            <router-link :to="{name: 'ViewMeal', params: {id: meal.meal.id}}" class="meal-data">{{ meal.meal.name }}</router-link>
            <div class="meal-data">{{ calculateCalories(meal.meal) }}</div>
          </div>
          <button class="mark-meal-consumed-button" @click.prevent="markMealAsEaten(meal)">{{ meal.consumed ? 'Unmark' : 'Mark' }}</button>
          <button class="mark-meal-consumed-button" @click.prevent="removeMealFromPlan(meal)">Remove</button>
        </div>
      </section>
      <section class="calories">
        <h2>Calories</h2>
        <div>Calories Eaten: <span>{{ calculateCurrentCalories().eaten }}</span></div>
        <div>Calories Planned: <span>{{ calculateCurrentCalories().planned }}</span></div>
        <div>Remaining: <span>{{ calculateCurrentCalories().remaining }}</span></div>
      </section>
    </div>
    <div class="week-plan">
      <section class="week">
        <div class="day" v-for="plan in mealPlansWithoutCurrent" @click="selectNewPlan(plan)">
          <h3>{{ getDayOfWeek(plan.date) }}</h3>
          <div v-for="meal in plan.meals">{{ meal.meal.name }}</div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.main-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.today-plan {
  margin-bottom: 20px;
}

.today, .calories {
  background-color: var(--background);
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
}

.meals {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: 5px;
}

.meals-container {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-right: 10px;
}

.meal-data {
  align-self: center;
  margin: 10px;
}

.week {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.day {
  background-color: var(--background);
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.eaten {
  background: var(--link-hover-color);
  color: var(--background);
  border-radius: 5px;
}

.mark-meal-consumed-button {
  margin: 5px;
}
</style>