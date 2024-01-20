export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    enabled: true,
    last_notification: null,
    last_seen: null,
  }),
  actions: {},
  persist: true,
});
