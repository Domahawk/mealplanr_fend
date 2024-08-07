import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Notification} from "@/types/network/notification.ts";

export const useNotificationStore = defineStore('notification', () => {
    const notifications: Ref<Notification[]> = ref([]);

    function addNotification(notification: Notification): void {
        notifications.value.push(notification);

        setTimeout(() => {
           removeNotification(notification);
        }, 3000);
    }

    function removeNotification(notification: Notification): void {
        notifications.value.splice(notifications.value.indexOf(notification), 1);
    }

    return {notifications, addNotification, removeNotification}
})