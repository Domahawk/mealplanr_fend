import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Ingredient} from "@/types/model/ingredient.ts";
import {ingredientsClient} from "@/network/endpoints/ingredientsClient.ts";

export const useIngredientsStore = defineStore('ingredients', () => {
    const ingredients: Ref<Ingredient[] | undefined> = ref();
    function setIngredients(data: Ingredient[]): void {
        ingredients.value = data;
    }

    const getIngredients = async (search?: string): Promise<Ingredient[]> => {
        let searchQuery: {key: string, value: string} | undefined = undefined;

        if (search) {
            searchQuery = {key: 'name', value: search};
        }

        let response = await ingredientsClient.get(searchQuery);

        return response.data.data;
    }

    return { ingredients, setIngredients, getIngredients }
})