<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";
import {Ingredient} from "@/types/model/ingredient.ts";
import BackButton from "@/components/Buttons/BackButton.vue";
import FadeTransition from "@/components/FadeTransition.vue";

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
  <FadeTransition>
    <section class="ingredient-view-container">
      <BackButton/>
      <div class="ingredient-view-container__info">
        <h2>Ingredient Name:</h2>
        <p>{{ ingredient.name }}</p>
        <h3>Calories per 100g:</h3>
        <p>{{ ingredient.calories }}</p>
      </div>
    </section>
  </FadeTransition>
</template>

<style scoped>
.ingredient-view-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;
}

.ingredient-view-container__info {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--container-bg);
  border-radius: 12px;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>