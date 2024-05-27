import { createEvent } from "effector";
import { ExerciseItem } from "../Types";

const updateErrorEvent = createEvent();
const getSelectedExerciseEvent = createEvent<string | undefined>();

const setSliderPos = createEvent<number>();

const setDelayExercise = createEvent<number>();
const setVolumeNotification = createEvent<number>();

const setSelectedExercise = createEvent<ExerciseItem>();
const clearExercise = createEvent();

export {
  getSelectedExerciseEvent,
  updateErrorEvent,
  setSliderPos,
  setDelayExercise,
  setVolumeNotification,
  setSelectedExercise,
  clearExercise,
};
