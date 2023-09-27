export type TimerProps = {
  initialTime: number;
  stepTime?: number;
  onTimeOver?: () => unknown | void;
  onTimeStart?: () => unknown | void;
};

export type TimerStatus = "stopped" | "actived";

export type CycleStatus = "afterLoaded" | "started" | "finished" | "paused" | "stopped" | "delay";

export type AudioProps = Array<{
  source: string;
  excludedStatus: Array<CycleStatus>;
  includedStatus: Array<CycleStatus>;
}>; 