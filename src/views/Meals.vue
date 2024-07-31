<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {Meal, TableMeal} from "@/types/model/meal.ts";
import {mealsClient} from "@/network/endpoints/mealsClient"
import {calculateCalories} from "@/mixins/mixins.ts";
import RedirectTable from "@/components/RedirectTable.vue";
import Pagination from "@/components/Pagination.vue";
import {Model} from "@/types/model/model.ts";

const tableMeals: Ref<TableMeal[]> = ref([]);

const getMeals = async (): Promise<void> => {
  const response = await mealsClient.get();
  tableMeals.value = formatMeals(response.data.data);
}

const formatMeals = (meals: Meal[]): TableMeal[] => {
  let formatted: TableMeal[] = [];

  meals.forEach((meal: Meal) => {
    formatted.push({
      id: meal.id,
      name: meal.name,
      calories: calculateCalories(meal),
      ingredients: formatIngredients(meal),
    })
  })

  return formatted;
}

const formatIngredients = (meal: Meal): string => {
  let ingredients: string[] = [];

  for (let ingredient of meal.ingredients) {
    ingredients.push(ingredient.name);
  }

  return ingredients.join(',');
}

onMounted(getMeals);
</script>
<template>
  <section class="meals-table-container">
    <RedirectTable title="Meal List"
                   title-two="List Of Meals"
                   :table-data=tableMeals
                   redirect-link="/meals/"
                   :redirect=true
    />

    <Pagination
        :client="mealsClient"
        @update-data="(meals: Model[]): TableMeal[] => tableMeals = formatMeals(meals as Meal[])"
    />
  </section>
</template>

<style scoped>
.meals-table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 10px;
}
</style>