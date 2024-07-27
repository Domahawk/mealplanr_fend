import axios, {AxiosInstance} from 'axios';
import {useAuthStore} from "@/store/auth.ts";
import vueRouter from "@/router/router.ts";

const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const authStore = useAuthStore();
        const {response} = error;
        const router = vueRouter;

        if (response) {
            switch (response.status) {
                case 401:
                    // Unauthorized, redirect to login page
                    authStore.deleteToken();
                    router.push('/login')
                    break;
                case 403:
                    // Forbidden
                    console.error('Forbidden:', response.data.message);
                    break;
                case 404:
                    // Not Found
                    console.error('Not Found:', response.data.message);
                    break;
                case 500:
                    // Internal Server Error
                    console.error('Server Error:', response.data.message);
                    break;
                default:
                    // Handle other status codes
                    console.error('Error:', response.data.message);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error:', error.message);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const token: string | null = authStore.token;

        if (token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }

        config.headers.Accept = "application/json";

        return config
    },
    (error) => {
        // Handle request error here
        console.error('Request error:', error);
        return Promise.reject(error);
    });

export default {
    axiosClient
};