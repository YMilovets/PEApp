import { CycleStatus } from "../../Hooks/types";
import { ExerciseItem } from "../../Types";

export interface ExerciseProps extends Partial<ExerciseItem> {
    className?: string;
    exerciseDelay: number;
    /* count_repeat: number;
    delta_time: number;
    time_pause: number;
    time_progress: number; */
}

export interface ExerciseTimerProps {
  timeProgress: number | undefined;
  status: CycleStatus;
  start: () => void;
  play: (status: CycleStatus) => void;
  time: number | undefined;
  step: number;
  className?: string;
}