export type TimerProps = {
  initialTime: number;
  stepTime?: number;
  onTimeOver?: () => unknown | void;
  onTimeStart?: () => unknown | void;
};

export type CycleProps = {
  countRepeats: number,
  timeExercise: number,
  delayExercise: number,
  timePause: number,
  deltaTime: number,
  onCycleOver?: () => void
};

export type TimerStatus = 'stopped' | 'actived';

export enum CycleStatus {
  AFTER_LOADED = 'afterLoaded',
  STARTED = 'started',
  FINISHED = 'finished',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  DELAY = 'delay',
}

export type AudioProps = Array<{
  source: string;
  excludedStatus?: Array<CycleStatus>;
  includedStatus?: Array<CycleStatus>;
}>;
