type ExerciseItem = {
  img: string;
  title: string;
  action: string;
  link?: string;
  countRepeat?: number;
  count_repeat?: number;
  timeProgress?: number;
  time_progress?: number;
  time_pause?: number;
  timePause?: number;
  delta_time?: number;
  deltaTime?: number;
};

export type ExerciseItemStore = {
  listExercise: Array<ExerciseItem>;
  selectedExercise: ExerciseItem | null;
  sliderPos: number;
  exerciseDelay: number;
};

type TranslateProp = string | number | symbol;
type TranslateValue = TranslateProp;

export type { ExerciseItem, TranslateProp, TranslateValue };
