<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";
import {TableIngredient} from "@/types/model/ingredient.ts";
import Table from "@/components/RedirectTable.vue";
import Pagination from "@/components/Pagination.vue";
import {Model} from "@/types/model/model.ts";

const tableIngredients: Ref<TableIngredient[]> = ref([]);

const getIngredients = async () => {
  const response = await ingredientsClient.get();

  tableIngredients.value = response.data.data;
}

onMounted(getIngredients);
</script>

<template>
  <section>
    <Table title="Ingredient List"
           title-two="List Of Ingredients"
           :table-data=tableIngredients
           redirect-link="/ingredients/"
    />
  </section>
  <Pagination :client="ingredientsClient" @update-data="(ingredients: Model[]) => tableIngredients = ingredients as TableIngredient[]" />
</template>

<style scoped>

</style>