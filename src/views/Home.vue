<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import moment, {Moment} from "moment";
import {MealPlans} from "@/types/mealPlans.ts";
import MealPlanCard from "@/components/MealPlanCard.vue";
import MealPlanCardSmall from "@/components/MealPlanCardSmall.vue";
import {MealPlan} from "@/types/model/mealPlan.ts";
import FadeTransition from "@/components/FadeTransition.vue";

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
  <FadeTransition>
    <section class="plan-container">
      <ul class="plan-list" v-for="(mealPlan, key) in mealPlans" :key>
        <li v-if="isMealPlanOpen(mealPlan)">
          <MealPlanCard
              :meal-plans="mealPlan"
              @remove-meal-from-meal-plan="(value: MealPlan) => removeMealFromMealPlan(value)"
          />
        </li>
        <li v-else>
          <MealPlanCardSmall
              :meal-plan="mealPlan"
              @click="currentlySelectedPlans = mealPlan"
          />
        </li>
      </ul>
    </section>
  </FadeTransition>
</template>

<style scoped>
.plan-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.plan-list {
  margin: 5px;
  padding: 5px;
  width: 100%;
  max-width: 800px;
}
</style>