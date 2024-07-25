import axiosClient from "@/network/apiClient.ts";
import {Ingredient} from "@/types/model/ingredient.ts";


export const ingredientsClient = {
    get: (searchQuery?: { key: string, value: string | number }) => {
        let path: string = '/ingredients';

        if (searchQuery !== undefined) {
            path += `?${searchQuery.key}=${searchQuery.value}`;
        }

        return axiosClient.axiosClient.get(path)
    },
    getSingle: (id: string): Promise<any> | Ingredient => {
        return axiosClient.axiosClient.get(`/ingredients/${id}`);
    },
    createIngredient: (name: string, calories: number) => {
        return axiosClient.axiosClient.post('/ingredients', {name: name, calories: calories});
    }
}