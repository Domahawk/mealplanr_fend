<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import moment, {Moment} from "moment";
import {MealPlans} from "@/types/mealPlans.ts";
import MealPlanCard from "@/components/MealPlanCard.vue";
import MealPlanCardSmall from "@/components/MealPlanCardSmall.vue";
import {MealPlan} from "@/types/model/mealPlan.ts";

const mealPlans: Ref<MealPlans[] | null> = ref(null);
const currentDate: Moment = moment();
const currentlySelectedPlans: Ref<MealPlans | null> = ref(null);

const getMealPlans = async () => {
  let response = await mealPlanClient.get();
  mealPlans.value = response.data.data;
  selectDefaultMealPlan();
}

const selectDefaultMealPlan = () => {
  mealPlans.value?.forEach((mealPlan: MealPlans) => {
    if (mealPlan.date === currentDate.format('Y-MM-DD').toString()) {
      currentlySelectedPlans.value = mealPlan
    }
  })
}

const isMealPlanOpen = (mealPlans: MealPlans): boolean => {
  return mealPlans.date === currentlySelectedPlans.value?.date;
}

const removeMealFromMealPlan = (meal: MealPlan): void => {
  if (currentlySelectedPlans.value === null) {
    return
  }

  currentlySelectedPlans.value.meals = currentlySelectedPlans.value.meals.filter(
      (mealPlan: MealPlan) => mealPlan.mealPlanId !== meal.mealPlanId
  );
}

onMounted(getMealPlans);
</script>

<template>
  <TransitionGroup name="plan-container">
    <section class="plan-container" v-for="(mealPlan, key) in mealPlans" :key>
      <MealPlanCard
          v-if="isMealPlanOpen(mealPlan)"
          :meal-plans="mealPlan"
          @remove-meal-from-meal-plan="(value: MealPlan) => removeMealFromMealPlan(value)"
      />
      <MealPlanCardSmall
          v-else
          :meal-plan="mealPlan"
          @click="currentlySelectedPlans = mealPlan"
      />
    </section>
  </TransitionGroup>
</template>

<style scoped>
.plan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
  width: 100%;
  max-width: 800px;
}

.plan-container-enter-from {
  opacity: 0;
}

.plan-container-enter-to,
.plan-container-leave-from {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.plan-container-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>