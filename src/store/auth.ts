import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {extractTokenFromCookie} from "@/mixins/mixins.ts";
import {userClient} from "@/network/endpoints/userClient.ts";
import router from "@/router/router.ts";

export const useAuthStore = defineStore('auth', () => {
    const token: Ref<string | null> = ref(null);

    function setToken(): void {
        let cookieToken: string | null = extractTokenFromCookie();
        token.value = null;

        if (token) {
            token.value = cookieToken;

            return;
        }
    }

    async function login(email: string, password: string): Promise<void>  {
        let response = await userClient.login(email, password)
        document.cookie = `token=${response.data.token};expires=${response.data.expiresAt};SameSite=Lax;path=';`;
        setToken();
        await router.push('/');
    }

    async function logout(): Promise<void> {
        let response = await userClient.logout();

        if (response.status === 200) {
            deleteToken()
        }
    }

    function deleteToken() {
        token.value = null;
        document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        router.push('/login');
    }

    function isAuthenticated(): boolean {
        return token.value !== null;
    }

    return { token, setToken, login, logout, deleteToken, isAuthenticated }
})