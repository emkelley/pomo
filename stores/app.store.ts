export const useAppStore = defineStore("app", {
  state: () => ({
    config: {
      font_color: "black",
      font_family: "Inter",
      background_image: "",
      background_color: "white",
      name: "My App",
      notifications_enabled: true,
    },
  }),
  actions: {},
  persist: true,
});
