<script setup lang="ts">
import {getDayOfWeek, formatDate} from "@/mixins/mixins.ts";
import {MealPlans} from "@/types/mealPlans.ts";

withDefaults(defineProps<{
  mealPlan: MealPlans
}>(), {
  mealPlan: ():MealPlans => <MealPlans>{}
})

</script>

<template>
  <section class="meal-plan-card">
    <div class="meal-plan-card__header">
      <div class="meal-plan-card__header-day">
        <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlan?.date) }}</h2>
        <p class="zero-margin-padding">{{ formatDate(mealPlan?.date) }}</p>
      </div>
      <button class="add-button">+</button>
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
</style>