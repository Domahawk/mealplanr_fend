import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Meal} from "@/types/model/meal.ts";

export const useMealsStore = defineStore('meals', () => {
    const meals: Ref<Meal[] | undefined> = ref();

    function setMeals(data: Meal[]): void {
        meals.value = data;
    }

    return {meals, setMeals}
})