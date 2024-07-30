<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import moment, {Moment} from "moment";
import {MealPlans} from "@/types/mealPlans.ts";
import MealPlanCard from "@/components/MealPlanCard.vue";
import MealPlanCardSmall from "@/components/MealPlanCardSmall.vue";

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

const isMealPlanOpen = (mealPlan: MealPlans): boolean => {
  return mealPlan.date === currentlySelectedPlan.value?.date;
}

const selectMealPlan = (mealPlan: MealPlans): void => {
  currentlySelectedPlan.value = mealPlan;
}

onMounted(getMealPlans)
</script>

<template>
  <section class="plan-container" v-for="mealPlan in mealPlans">
    <MealPlanCard :meal-plans="mealPlan" v-if="isMealPlanOpen(mealPlan)" />
    <MealPlanCardSmall :meal-plan="mealPlan" v-else @click="selectMealPlan(mealPlan)" />
  </section>
</template>

<style scoped>
.plan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
}
</style>