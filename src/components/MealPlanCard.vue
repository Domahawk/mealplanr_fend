<script setup lang="ts">
import {calculateCalories, getDayOfWeek, formatDate} from "@/mixins/mixins.ts";
import {MealPlan} from "@/types/model/mealPlan.ts";
import {MealPlans} from "@/types/mealPlans.ts";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import AddMealModal from "@/components/AddMealModal.vue";
import RemoveButton from "@/components/Buttons/RemoveButton.vue";
import {ref, Ref} from "vue";
import MarkButton from "@/components/Buttons/MarkButton.vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import {useNotificationStore} from "@/store/notification.ts";
import FadeTransition from "@/components/FadeTransition.vue";

const props = withDefaults(defineProps<{
  mealPlans: MealPlans
}>(), {
  mealPlans: () => <MealPlans>{}
})

const emits = defineEmits<{
  (e: 'removeMealFromMealPlan', value: MealPlan): void
}>()

const isModalOpen: Ref<boolean> = ref(false);
const isOpen: Ref<boolean> = ref(false);
const notificationStore = useNotificationStore();

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

  notificationStore.addNotification({type: 'success', message: 'Successfully updated meal plan.'});
  meal.consumed = !meal.consumed;
}

const removeMealFromPlan = async (meal: MealPlan): Promise<void> => {
  let response = await mealPlanClient.removeMealPlan(meal.mealPlanId);

  if (response.status !== 200) {
    return;
  }

  notificationStore.addNotification({type: 'success', message: 'Successfully updated meal plan.'});
  emits('removeMealFromMealPlan', meal);
}

const mealConsumedClass = (meal: MealPlan) => {
  if (meal.consumed) {
    return 'eaten';
  }

  return '';
}

</script>

<template>
  <FadeTransition>
    <div v-if="isModalOpen">
      <AddMealModal
          :meal-plans="mealPlans"
          @close="isModalOpen = false"
      />
    </div>
  </FadeTransition>
  <section class="meal-plan-card">
    <div class="meal-plan-card__header">
      <div class="meal-plan-card__header-day">
        <h2 class="zero-margin-padding">{{ getDayOfWeek(mealPlans?.date) }}</h2>
        <p class="zero-margin-padding">{{ formatDate(mealPlans?.date) }}</p>
      </div>
      <AddButton @addElement="isModalOpen = true"/>
    </div>
    <hr class="neon-glow">
    <div class="meal-plan-card__body">
      <div class="meal-plan-card__body-info">
        <div v-for="(value, key) in calculateCurrentCalories()" :key="key"
             class="meal-plan-card__body-info__element neon-glow">
          <p class="zero-margin-padding">{{ key.toUpperCase() }}</p>
          <p class="zero-margin-padding">{{ value }}</p>
        </div>
      </div>
      <hr class="neon-glow">
      <div class="meal-plan-card__body-meals">
        <div v-for="meal in mealPlans.meals" class="meal-plan-card__body-meals__meal">
          <div :class="mealConsumedClass(meal)" class="info-container">
            <p class="zero-margin-padding"> {{ meal.meal.name }} </p>
            <p class="zero-margin-padding"> {{ calculateCalories(meal.meal) }} </p>
          </div>
          <div class="button-container">
            <MarkButton @markElement="markMealAsEaten(meal)"/>
            <RemoveButton @remove-element="removeMealFromPlan(meal)"/>
          </div>
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
  margin: 30px 30px 10px 30px;
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
  color: var(--secondary-text-color);
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

.info-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
}

.eaten {
  opacity: 0.2;
}

hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: var(--border-color);
  height: 1px;
}
</style>