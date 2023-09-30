import { useEffect } from 'react';
import { AudioProps, CycleStatus } from './types';

export default function useAudio(
  audioData: AudioProps,
  status: CycleStatus,
  volume = 100,
) {
  useEffect(() => {
    audioData.forEach(({ source, excludedStatus = [], includedStatus = [] }) => {
      const audio = new Audio();
      if (
        (excludedStatus.length !== 0 || includedStatus.length !== 0)
        && (excludedStatus.length === 0
          || excludedStatus.every((currentStatus) => status !== currentStatus))
        && (includedStatus.length === 0
          || includedStatus.every((currentStatus) => status === currentStatus))
      ) {
        audio.src = source;
        audio.volume = volume / 100;
        audio.play();
      }
    });
  }, [status]);
}
