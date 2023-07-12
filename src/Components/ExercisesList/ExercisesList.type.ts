import { ExerciseItem } from "../../Types";

export interface ExercisesListProps {
  search: Required<string>;
}

export type ExerciseItemStore = Array<ExerciseItem>;
