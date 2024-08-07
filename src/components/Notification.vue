<script setup lang="ts">

import {useNotificationStore} from "@/store/notification.ts";
import {Ref, ref} from "vue";
import {Notification} from "@/types/network/notification.ts";

const notificationStore = useNotificationStore();
const notifications: Ref<Notification[]> = ref(notificationStore.notifications);

</script>

<template>
    <div class="notification-container">
      <TransitionGroup name="notification">
        <div v-for="(notification, index) in notifications" :key="index" class="notification" :class="notification.type">
          {{ notification.message }}
        </div>
      </TransitionGroup>
    </div>
</template>

<style scoped>
.notification-leave-active,
.notification-enter-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.notification-enter-to,
.notification-leave-from {
  opacity: 1;
}

.notification-container {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
  z-index: 1000;
}
.notification {
  background-color: #444;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.notification.success {
  background-color: var(--safe-color);
}
.notification.error {
  background-color: var(--danger-color);
}
.notification.info {
  background-color: var(--info-color);
}
</style>