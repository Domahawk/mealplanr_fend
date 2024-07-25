import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/root.css'
import './assets/styles/style.css'
import router from './router/router.ts'
import {createPinia} from "pinia";
import {useAuthStore} from "@/store/auth.ts";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

const authStore = useAuthStore();
authStore.setToken();