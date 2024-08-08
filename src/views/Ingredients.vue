<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";
import {TableIngredient} from "@/types/model/ingredient.ts";
import Table from "@/components/RedirectTable.vue";
import Pagination from "@/components/Pagination.vue";
import {Model} from "@/types/model/model.ts";
import FadeTransition from "@/components/FadeTransition.vue";

const tableIngredients: Ref<TableIngredient[]> = ref([]);

const getIngredients = async () => {
  const response = await ingredientsClient.get();

  tableIngredients.value = response.data.data;
}

onMounted(getIngredients);
</script>

<template>

  <FadeTransition>
    <section class="ingredients-table-container">
      <Table title="Ingredient List"
             title-two="List Of Ingredients"
             :table-data=tableIngredients
             redirect-link="/ingredients/"
      />
      <Pagination :client="ingredientsClient" @update-data="(ingredients: Model[]) => tableIngredients = ingredients as TableIngredient[]" />
    </section>
  </FadeTransition>
</template>

<style scoped>
.ingredients-table-container {
  margin: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>