<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";
import MenuButton from "@/components/Buttons/MenuButton.vue";
import {ref, Transition} from "vue";
import HomeSvg from "@/components/SvgComponents/HomeSvg.vue";
import MealSvg from "@/components/SvgComponents/MealSvg.vue";
import IngredientSvg from "@/components/SvgComponents/IngredientSvg.vue";
import LogoutSvg from "@/components/SvgComponents/LogoutSvg.vue";
import AddMealSvg from "@/components/SvgComponents/AddMealSvg.vue";
import AddIngredientSvg from "@/components/SvgComponents/AddIngredientSvg.vue";
import LoginSvg from "@/components/SvgComponents/LoginSvg.vue";

const authStore = useAuthStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <nav class="navigation-container neon-glow">
    <div v-if="authStore.isAuthenticated()">
      <Transition name="navigation-list">
        <ul v-if="isMenuOpen" class="navigation-list" @click="toggleMenu">
          <li class="navigation-list-element">
            <router-link to="/">
              <HomeSvg/>
              Home
            </router-link>
          </li>
          <li class="navigation-list-element">
            <router-link to="/meals">
              <MealSvg/>
              Meals
            </router-link>
          </li>
          <li class="navigation-list-element">
            <router-link to="/ingredients">
              <IngredientSvg/>
              Ingredients
            </router-link>
          </li>
          <li class="navigation-list-element">
            <router-link to="/meals/create">
              <AddMealSvg/>
              Create Meal
            </router-link>
          </li>
          <li class="navigation-list-element">
            <router-link to="/ingredients/create">
              <AddIngredientSvg/>
              Create Ingredient
            </router-link>
          </li>
          <li class="navigation-list-element">
            <router-link to="/" @click="authStore.logout()">
              <LogoutSvg/>
              Logout
            </router-link>
          </li>
        </ul>
      </Transition>
    </div>
    <div v-else>
      <Transition name="navigation-list">
        <ul v-if="isMenuOpen" class="navigation-list" @click="toggleMenu">
          <li>
            <router-link to="/login">
              <LoginSvg />
              Login
            </router-link>
          </li>
        </ul>
      </Transition>
    </div>
    <MenuButton @toggle-menu="toggleMenu"/>
  </nav>
</template>

<style scoped>
.navigation-container {
  background: var(--container-bg);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  bottom: 0;
  position: fixed;
  left: 0;
  z-index: 1;
  border-radius: 12px 12px 0 0;
  border: 2px solid var(--border-color);
  border-bottom: none;
}

.navigation-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  list-style: none;
  flex: 1;
  align-items: start;
  justify-content: space-evenly;
  font-size: 18px;
}

.navigation-list-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.navigation-list-element:hover {
  color: var(--text-color);
}

.navigation-list-enter-from,
.navigation-list-leave-to {
  height: 0;
  opacity: 0;
}

.navigation-list-enter-active,
.navigation-list-leave-active {
  transition: height 0.3s ease-out, opacity 0.1s ease-out;
}

.navigation-list-enter-to,
.navigation-list-leave-from {
  height: 50vh;
  opacity: 1;
}
</style>