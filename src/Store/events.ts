import { createEvent } from 'effector';

const updateErrorEvent = createEvent();
const getSelectedExerciseEvent = createEvent<string | undefined>();

const setSliderPos = createEvent<number>();

const setDelayExercise = createEvent<number>();
const setVolumeNotification = createEvent<number>();

export {
  getSelectedExerciseEvent,
  updateErrorEvent,
  setSliderPos,
  setDelayExercise,
  setVolumeNotification,
};
