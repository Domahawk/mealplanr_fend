import {Meal} from "@/types/model/meal.ts";
import {Model} from "@/types/model/model.ts";

export interface MealPlan extends Model{
    mealPlanId: number;
    meal: Meal;
    date: string;
    consumed: boolean;
}
