<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";

const authStore = useAuthStore();
</script>

<template>
  <nav class="container-fluid">
    <ul>
      <li><strong>Meal Planner App</strong></li>
    </ul>
    <ul v-if="authStore.isAuthenticated()">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/meal-plan/create">Add Meal Plan</router-link></li>
      <li><router-link to="/meals">Meals</router-link></li>
      <li><router-link to="/ingredients">Ingredients</router-link></li>
      <li><router-link to="/meals/create">Create Meal</router-link></li>
      <li><router-link to="/ingredients/create">Create Ingredient</router-link></li>
      <li><router-link to="/" @click="authStore.logout()">Logout</router-link></li>
    </ul>
    <ul v-else>
      <li><router-link to="/login">Login</router-link></li></ul>
  </nav>

</template>

<style scoped></style>