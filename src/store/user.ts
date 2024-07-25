import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {User} from "@/types/model/user.ts";
import {extractTokenFromCookie} from "@/mixins/mixins.ts";

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | undefined> = ref();
    const token: Ref<string | null> = ref(null);

    function setUser(data: User): void {
        user.value = data;
    }

    function setToken(): void {
        let cookieToken: string | null = extractTokenFromCookie();
        token.value = null;

        if (token) {
            token.value = cookieToken;

            return;
        }
    }

    return { user, token, setUser, setToken }
})