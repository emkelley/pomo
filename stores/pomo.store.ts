export const usePomoStore = defineStore("pomo", {
  state: () =>
    ({
      current: {
        type: "pomo",
        duration_seconds: 1500,
        start_time: null,
        end_time: null,
      },
      counts: {
        pomo: 0,
        break_short: 0,
        break_long: 0,
      },
    } as any),
  actions: {
    start(duration_seconds: number, type: "pomo" | "break_short" | "break_long") {
      const startTime = new Date();
      this.current.start_time = startTime;
      this.current.end_time = new Date(startTime.getTime() + duration_seconds * 1000);
      this.current.duration_seconds = duration_seconds;
      this.current.type = type;
    },
    increment(type: "pomo" | "break_short" | "break_long") {
      this.counts[type] += 1;
    },
  },
  persist: true,
});
