<script setup lang="ts">
import {Ref, ref} from "vue";
import {useAuthStore} from "@/store/auth.ts";

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const authStore = useAuthStore();

const sendLoginRequest = async () => {
  await authStore.login(email.value, password.value)
}

</script>

<template>
  <section id="login" class="login-section">
    <hgroup>
      <h2>Login</h2>
      <h3>Please enter your credentials</h3>
    </hgroup>
    <form>
      <label for="username">Email</label>
      <input v-model="email" type="text" id="username" name="username" required class="text-input">
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" name="password" required class="text-input">
      <button @click.prevent=sendLoginRequest type="submit" class="login-button">Login</button>
    </form>
  </section>
</template>

<style scoped>
.login-section {
  padding: 10%;
}

.text-input {
  width: 50%;
  align-self: center;
}

.login-button {
  align-self: center;
}
</style>
