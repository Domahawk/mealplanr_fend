<script setup lang="ts">
import {Ref, ref} from "vue";
import {useAuthStore} from "@/store/auth.ts";
import TextInputField from "@/components/FormFields/TextInputField.vue";
import LoginSvg from "@/components/SvgComponents/LoginSvg.vue";
import {useNotificationStore} from "@/store/notification.ts";
import FadeTransition from "@/components/FadeTransition.vue";

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const sendLoginRequest = async () => {
    let response = await authStore.login(email.value, password.value);

    if (response?.status === 200) {
      notificationStore.addNotification({type: "success", message: "Successfully logged in"});
    }
}

</script>

<template>
  <FadeTransition>
    <section id="login" class="login-section">
      <hgroup class="login-section__header">
        <h2>Login</h2>
        <h3>Please enter your credentials</h3>
      </hgroup>
      <form class="login-section__form">
        <div class="login-section__form__item">
          <TextInputField
              @text-data="(value: string) => email = value"
              label="Email"
              id="email"
              type="email"
              name="email"
              :is-required="true"
          />
        </div>
        <div class="login-section__form__item">
          <TextInputField
              @text-data="(value: string) => password = value"
              type="password"
              label="Password"
              id="password"
              name="password"
              :is-required="true"
          />
        </div>
      </form>
      <div class="login-section__login" @click=sendLoginRequest>
        <LoginSvg />
        <p>Login</p>
      </div>
    </section>
  </FadeTransition>
</template>

<style scoped>
.login-section {
  padding: 10%;
  background: var(--container-bg);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.login-section__header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-section__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

.login-section__form__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.login-section__login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;;
  margin-top: 50px;
  cursor: pointer;
}

</style>
