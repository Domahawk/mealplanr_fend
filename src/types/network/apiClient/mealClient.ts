import {ApiClient} from "@/types/network/apiClient/apiClient.ts";

export interface MealClient extends ApiClient{
    getSingle: Function,
    createMeal: Function,
}