import {defineStore} from "pinia";
import {Meal} from "@/types/model/meal.ts";
import {mealsClient} from "@/network/endpoints/mealsClient.ts";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";

export const useMealPlansStore = defineStore('mealPlans', () => {
    const getMeals = async (search?: string): Promise<Meal[] | undefined> => {
        let searchQuery: { key: string, value: string } | undefined = undefined;

        if (search) {
            searchQuery = {key: 'name', value: search};
        }

        try {
            return (await mealsClient.get(searchQuery)).data.data;
        } catch (e: any) {
        }
    }

    async function submitMealPlan(selectedDate: string, addedMeals: Meal[]): Promise<void> {
        const mealPlan = {
            date: selectedDate,
            meals: addedMeals,
        };

        let response = await mealPlanClient.createMealPlan(mealPlan);

        if (response.status !== 200) {
            return;
        }

        location.reload();
    }

    return {
        getMeals,
        submitMealPlan
    }
})