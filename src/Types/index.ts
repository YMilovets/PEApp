import { HTMLInputTypeAttribute } from 'react';

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
  delay_exercise: number;
  startDelay: number;
};

export type ExerciseItemRequest = {
  id: number;
  title: string;
  action: string;
  link: string;
  count_repeat: number;
  time_progress: number;
  time_pause: number;
  delta_time: number;
  delta_exercise: number;
};

export type ExerciseItemStore = {
  listExercise: Array<ExerciseItem>;
  selectedExercise: ExerciseItem | null;
  sliderPos: number;
  exerciseDelay: number;
  volume: number;
};

type TranslateProp = string | number;
type TranslateValue = TranslateProp;

export type { ExerciseItem, TranslateProp, TranslateValue };

export type CommonFormElementType = {
  label: string;
  description?: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  name: string;
  value?: string | number;
}

export type NumberInputFormElementType = {
  min?: number,
  max?: number,
  step?: number,
}

export type FormConstructorType = CommonFormElementType & NumberInputFormElementType;
