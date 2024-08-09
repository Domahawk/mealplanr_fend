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
        <div v-for="(notification, index) in notifications" :key="index" class="notification" :class="notification.type">
          {{ notification.message }}
        </div>
      </SlideGroupTransition>
    </div>
</template>

<style scoped>
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