<template>
  <main
    class="flex flex-col text-white h-[100dvh] w-[100dvw] bg-cover bg-center"
    :style="{ backgroundImage: `url(${background_image})` }"
  >
    <section class="w-full flex justify-between items-center p-8">
      <div class="bg-black p-3 rounded flex items-center justify-center">
        <span class="font-black uppercase">EMK Pomo Timer</span>
      </div>
      <div class="flex gap-12 items-center">
        <p class="flex flex-col text-center items-center">
          <span class="text-4xl">{{ counts.pomo }}</span> pomos
        </p>
        <p class="flex flex-col text-center items-center">
          <span class="text-4xl">{{ counts.break_short }}</span> short breaks
        </p>
        <p class="flex flex-col text-center items-center">
          <span class="text-4xl">{{ counts.break_long }}</span> long breaks
        </p>
      </div>
    </section>
    <div class="w-full h-full flex items-center justify-center">
      <p class="text-[200pt]">{{ formattedTime }}</p>
    </div>
    <section class="w-full flex gap-4 items-center justify-center p-8">
      <button
        @click="endEarly"
        :disabled="!isTimerRunning"
        class="cursor-pointer flex gap-2 items-center p-6 rounded-full bg-white/10 backdrop-blur-sm hover:backdrop-blur-md border-2 border-white uppercase font-black disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 duration-200"
      >
        End Early
      </button>
      <button
        @click="toggleTimer"
        class="cursor-pointer flex gap-2 items-center p-12 rounded-full bg-white/10 backdrop-blur-sm hover:backdrop-blur-md border-2 border-white uppercase font-black text-3xl active:scale-95 duration-200"
      >
        {{ isTimerRunning ? "Pause" : "Start" }}
      </button>
      <button
        @click="resetTimer"
        class="cursor-pointer flex gap-2 items-center p-6 rounded-full bg-red-500/10 backdrop-blur-sm hover:backdrop-blur-md border-2 border-white uppercase font-black active:scale-95 duration-200"
      >
        Reset
      </button>
    </section>
    <audio id="startstop" src="/sounds/startstop.mp3" />
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import presets from "./config/presets";

const pomodoroTime = 25 * 60; // 25 minutes
const shortBreakTime = 5 * 60; // 5 minutes
const longBreakTime = 15 * 60; // 15 minutes
const sound = useSound();
const pomoStore = usePomoStore();
const { current, counts } = storeToRefs(pomoStore);
const background_image = ref(presets.bg_presets[1].url);
const interval = ref<number | null>(null);
const isTimerRunning = computed(() => interval.value !== null);
const time = ref(current.value.duration_seconds);

const currentType = computed(() => current.value.type);
const selectedTimer = ref<"pomo" | "break_short" | "break_long">("pomo");

watch(time, (newTime) => {
  if (newTime === 0) {
    clearInterval(interval.value as number);
    interval.value = null;
    pomoStore.increment(currentType.value);
    nextTimer();
  }
});
const playSound1 = () => {
  sound.play("startstop");
};
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

const startTimer = () => {
  if (interval.value !== null) return;
  interval.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    }
  }, 1000) as unknown as number; // Type assertion here
};

const pauseTimer = () => {
  if (interval.value !== null) {
    clearInterval(interval.value);
    interval.value = null;
  }
};

const stopTimer = () => {
  pauseTimer();
  time.value = current.value.duration_seconds;
};

const toggleTimer = () => {
  if (isTimerRunning.value) {
    pauseTimer();
  } else {
    startTimer();
  }
  playSound1();
};

const endEarly = () => {
  pomoStore.increment(selectedTimer.value);
  resetTimer();
};

const resetTimer = () => {
  pauseTimer();
  time.value = getDurationForType(selectedTimer.value);
};

const nextTimer = () => {
  switch (currentType.value) {
    case "pomo":
      pomoStore.start(shortBreakTime, "break_short");
      break;
    case "break_short":
    case "break_long":
      pomoStore.start(pomodoroTime, "pomo");
      break;
  }
};

const getDurationForType = (type: string) => {
  switch (type) {
    case "pomo":
      return pomodoroTime;
    case "break_short":
      return shortBreakTime;
    case "break_long":
      return longBreakTime;
    default:
      return pomodoroTime;
  }
};

watch(currentType, () => {
  time.value = getDurationForType(currentType.value);
});
</script>

<style scoped>
.bg-gradient-1 {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
}
</style>
