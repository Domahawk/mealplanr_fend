import {defineStore} from "pinia";
import {Meal} from "@/types/model/meal.ts";
import {mealsClient} from "@/network/endpoints/mealsClient.ts";
import {mealPlanClient} from "@/network/endpoints/mealPlanClient.ts";
import {useNotificationStore} from "@/store/notification.ts";

export const useMealPlansStore = defineStore('mealPlans', () => {
    const getMeals = async (search?: string): Promise<Meal[] | undefined> => {
        let searchQuery: { key: string, value: string } | undefined = undefined;

        if (search) {
            searchQuery = {key: 'name', value: search};
        }


        try {
            let response = await mealsClient.get(searchQuery);

            return response.data.data;
        } catch (e: any) {
            const notificationStore = useNotificationStore();

            notificationStore.addNotification({type: "error", message: e.message});
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