import axiosClient from "@/network/apiClient.ts";
import {Meal} from "@/types/model/meal.ts";

export const mealPlanClient = {
    get: () => {
        return axiosClient.axiosClient.get('/user-meal-plan')
    },
    createMealPlan: (data: {date: string, meals: Meal[]}) => {
        let mealIds: number[] = data.meals.map((meal: Meal) => meal.id);
        let requestData = {
            date: data.date,
            meals: mealIds,
        }

        return axiosClient.axiosClient.post(`/user-meal-plan`, requestData)
    },
    updateMealPlan: (id: number, data: {}) => {
        return axiosClient.axiosClient.post(`/user-meal-plan/${id}`, data)
    },
    removeMealPlan: (id:number) => {
        return axiosClient.axiosClient.delete(`/user-meal-plan/${id}`)
    }
}