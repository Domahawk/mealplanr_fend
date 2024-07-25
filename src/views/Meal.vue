<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {mealsClient} from "@/network/endpoints/mealsClient.ts";
import {Meal} from "@/types/model/meal.ts";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router";
import {calculateCalories} from "@/mixins/mixins.ts";
import RedirectTable from "@/components/RedirectTable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";

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
  <BackButton />
  <main class="container">
    <hgroup>
      <h2>Meal Name: <span id="meal-name">{{ meal?.name }}</span></h2>
      <h3>Total Calories: <span id="meal-calories">{{ calculateCalories(meal) }}</span></h3>
    </hgroup>
    <RedirectTable
        title="Ingredients"
        :table-data="meal?.ingredients"
        :table-headers="tableRowHeader"
        title-two="List of Ingredients"
        redirect-link="/ingredients/"
    />
  </main>
</template>

<style scoped>

</style>