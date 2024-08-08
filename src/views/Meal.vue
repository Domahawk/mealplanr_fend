<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealsClient} from "@/network/endpoints/mealsClient.ts";
import {Meal} from "@/types/model/meal.ts";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router";
import {calculateCalories} from "@/mixins/mixins.ts";
import RedirectTable from "@/components/RedirectTable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import FadeTransition from "@/components/FadeTransition.vue";

const meal: Ref<Meal | null> = ref(null);
const route: RouteLocationNormalizedLoaded = useRoute();
const tableRowHeader: string[] = ['ID', 'Name', 'Calories', 'Calories per 100 g', 'Grams']

const getMeal = async () => {
  const mealId: string | any = route.params.id;
  const response = await mealsClient.getSingle(mealId);
  meal.value = response.data.data
};

onMounted(getMeal);
</script>

<template>
  <FadeTransition>
    <section class="meal-view-container">
      <BackButton />
      <div class="meal-view-container__info">
        <h2>Meal Name:</h2>
        <p>{{ meal?.name }}</p>
        <h3>Total Calories:</h3>
        <p>{{ calculateCalories(meal) }}</p>
      </div>
      <RedirectTable
          title="Ingredients"
          :table-data="meal?.ingredients"
          :table-headers="tableRowHeader"
          title-two="List of Ingredients"
          redirect-link="/ingredients/"
      />
    </section>

  </FadeTransition>
</template>

<style scoped>
.meal-view-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 800px;
}

.meal-view-container__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: var(--container-bg);
  border-radius: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
</style>
