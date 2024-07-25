import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Meals from "@/views/Meals.vue";
import Ingredients from "@/views/Ingredients.vue";
import CreateMeal from "@/views/CreateMeal.vue";
import CreateIngredient from "@/views/CreateIngredient.vue";
import Meal from "@/views/Meal.vue";
import Ingredient from "@/views/Ingredient.vue";
import {useAuthStore} from "@/store/auth.ts";
import AddMealPlan from "@/views/AddMealPlan.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/', name: 'Home', component: Home, meta: {requiresAuth: true}},
    {path: '/login', name: 'Login', component: Login},
    {path: '/meals', name: 'Meals', component: Meals, meta: {requiresAuth: true}},
    {path: '/meals/:id', name: 'ViewMeal', component: Meal, meta: {requiresAuth: true}},
    {path: '/meal-plan/create', name: 'AddMealPlan', component: AddMealPlan, meta: {requiresAuth: true}},
    {path: '/ingredients', name: 'Ingredients', component: Ingredients, meta: {requiresAuth: true}},
    {path: '/ingredients/:id', name: 'ViewIngredient', component: Ingredient, meta: {requiresAuth: true}},
    {path: '/meals/create', name: 'CreateMeal', component: CreateMeal, meta: {requiresAuth: true}},
    {path: '/ingredients/create', name: 'CreateIngredient', component: CreateIngredient, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    let authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated() && to.name !== 'Login') {
        return {
            name: 'Login'
        }
    } else if (to.name === 'Login' && authStore.isAuthenticated()) {
        return {
            name: 'Home',
        }
    }
});

export default router;
