import {Meal} from "@/types/model/meal.ts";
import moment from "moment/moment";

export function calculateCalories (meal: Meal | null): number {
    if (!meal) {
        return 0;
    }

    let calories: number = 0;

    for (let ingredient of meal.ingredients) {
        calories += ingredient.calories;
    }

    return calories;
}

export function extractTokenFromCookie(): string | null {
    let tokenArray: string[] = document.cookie.split(';').map((item: string) => item.trimStart());
    let token: string = '';

    tokenArray.forEach((item: string): void => {
        if (item.startsWith('token=')) {
            token = item.replace('token=', '')
        }
    });

    return token ? token : null;
}

export function getDayOfWeek(date: string | undefined): string {
    return moment(date).format('dddd')
}

export function formatDate(date: string | undefined): string {
    if (date === undefined) {
        return '';
    }

    return moment(date).format('DD.MM.YYYY')
}
