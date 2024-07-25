<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";
import {Ingredient} from "@/types/model/ingredient.ts";
import BackButton from "@/components/Buttons/BackButton.vue";

const ingredient: Ref<Ingredient> = ref(<Ingredient>{});
const route: RouteLocationNormalizedLoaded = useRoute();

const getIngredient = async () => {
  const ingredientId: string | any = route.params.id;
  const response = await ingredientsClient.getSingle(ingredientId);
  ingredient.value = response.data.data
};

onMounted(getIngredient);
</script>

<template>
  <BackButton />
  <main class="container">
    <hgroup>
      <h2>Ingredient Name: <span id="ingredient-name">{{ ingredient.name }}</span></h2>
      <h3>Calories per 100g: <span id="ingredient-calories">{{ ingredient.calories }}</span></h3>
    </hgroup>
  </main>
</template>

<style scoped></style>