import {Ingredient} from "./ingredient.ts";
import {TableItem} from "@/types/tableItem.ts";
import {Model} from "@/types/model/model.ts";

export interface Meal extends Model{
    name: string;
    ingredients: Ingredient[];
}

export interface TableMeal extends TableItem {
    name: string;
    ingredients: string;
    calories: number;
}