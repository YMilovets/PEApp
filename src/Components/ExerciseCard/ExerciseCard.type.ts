import { ExerciseItem } from "../../Types";

export interface ExerciseProps extends Partial<ExerciseItem> {
    className?: string;
    /* count_repeat: number;
    delta_time: number;
    time_pause: number;
    time_progress: number; */
}