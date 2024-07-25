import {TableItem} from "@/types/tableItem.ts";
import {Model} from "@/types/model/model.ts";

export interface Ingredient extends Model {
    id: number;
    name: string;
    calories: number;
    grams: number;
    caloriesPerHun: number;
}

export interface TableIngredient extends TableItem, Model {
    name: string;
    calories: number;
}