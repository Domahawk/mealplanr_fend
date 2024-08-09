<script setup lang="ts">

import {useNotificationStore} from "@/store/notification.ts";
import {Ref, ref} from "vue";
import {Notification} from "@/types/network/notification.ts";
import SlideGroupTransition from "@/components/SlideGroupTransition.vue";

const notificationStore = useNotificationStore();
const notifications: Ref<Notification[]> = ref(notificationStore.notifications);

</script>

<template>
    <div class="notification-container">
      <SlideGroupTransition>
        <div v-for="(notification, index) in notifications" :key="index" class="notification neon-glow" :class="notification.type">
          {{ notification.message }}
        </div>
      </SlideGroupTransition>
    </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.notification {
  background-color: var(--container-bg);
  color: var(--text-color);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notification.success {
  border: var(--safe-color) 2px solid;
}
.notification.error {
  background-color: var(--danger-color);
}
.notification.info {
  background-color: var(--info-color);
}
</style>