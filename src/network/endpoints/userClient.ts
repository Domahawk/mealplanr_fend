import axiosClient from "@/network/apiClient.ts";
import {Meal} from "@/types/model/meal.ts";

export const userClient = {
    me: () => {
        return axiosClient.axiosClient.get('/me')
    },
    login: async (email: string, password: string) => {
        return axiosClient.axiosClient.post('/login', {
            email: email,
            password: password,
        });
    },
    logout: () => {
        return axiosClient.axiosClient.post('/logout')
    },
    getSingle: (id: string): Promise<any> | Meal => {
        return axiosClient.axiosClient.get(`/meals/${id}`);
    }
}