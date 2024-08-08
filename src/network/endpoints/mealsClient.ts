import axiosClient from "@/network/apiClient.ts";
import {Meal} from "@/types/model/meal.ts";
import {MealClient} from "@/types/network/apiClient/mealClient.ts";
import {MealIngredient} from "@/types/model/mealIngredient.ts";

export const mealsClient: MealClient = {
    get: (searchQuery?: { key: string, value: string | number }) => {
        let path: string = '/meals';

        if (searchQuery !== undefined) {
            path += `?${searchQuery.key}=${searchQuery.value}`;
        }

        return axiosClient.axiosClient.get(path).catch(
            (error: Error) => {
                return error;
            }
        )
    },
    getSingle: (id: string): Promise<any> | Meal => {
        return axiosClient.axiosClient.get(`/meals/${id}`);
    },
    createMeal: (name: string, ingredients: MealIngredient[]): Promise<any> => {
        let data = {
            name: name,
            ingredients: ingredients.map((ingredient: MealIngredient) => {
                return {
                    id: ingredient.ingredient.id,
                    grams: ingredient.grams
                }
            })
        };

        return axiosClient.axiosClient.post('/meals', data);
    }
};