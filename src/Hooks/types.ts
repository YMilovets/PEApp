export type TimerProps = {
  initialTime: number;
  stepTime?: number;
  onTimeOver?: () => unknown | void;
  onTimeStart?: () => unknown | void;

};

export type TimerStatus = "stopped" | "actived";

export type CycleStatus = "started" | "finished" | "paused" | "stopped";