class SoundServices {
  play(id: string): HTMLAudioElement | undefined {
    let audio = document.getElementById(id) as HTMLAudioElement;
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 1;
    return audio;
  }
}

export const useSound = (): SoundServices => {
  return new SoundServices();
};
