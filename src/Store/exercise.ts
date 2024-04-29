import {
  combine, createStore, restore, sample,
} from 'effector';
import { ExerciseItem, ExerciseItemRequest, ExerciseItemStore } from '../Types';
import { removeAllExercises, setExercise } from './database';
import { getExercisesCachedFx, getExercisesRequestFx, sendNewExercise } from './effects';
import {
  getSelectedExerciseEvent,
  setDelayExercise,
  setSliderPos,
  setVolumeNotification,
  updateErrorEvent,
} from './events';
import exercisesRequestFacades from '../Facades/exercisesRequestFacades';

const $exerciseStore = createStore<ExerciseItemStore>({
  listExercise: [],
  selectedExercise: null,
  sliderPos: 0,
  exerciseDelay: 0,
  volume: 100,
})
  .on(getExercisesRequestFx.doneData, (state, payload) => {
    removeAllExercises();
    payload.forEach((exerciseRecord: ExerciseItemRequest) => setExercise(exerciseRecord));
    return {
      ...state,
      listExercise: exercisesRequestFacades(payload),
    };
  })
  .on(getExercisesCachedFx.doneData, (state, payload) => ({
    ...state,
    listExercise: exercisesRequestFacades(payload),
  }))
  .on(setSliderPos, (state, payload) => ({ ...state, sliderPos: payload }))
  .on(getSelectedExerciseEvent, (state, payload) => ({
    ...state,
    selectedExercise: state.listExercise.find(
      ({ link }: ExerciseItem) => link === payload,
    ) as ExerciseItem,
  }))
  .on(setDelayExercise, (state, payload) => ({
    ...state,
    exerciseDelay: payload,
  }))
  .on(setVolumeNotification, (state, volPayload) => ({
    ...state,
    volume: volPayload,
  }));

sample({
  clock: getExercisesCachedFx.failData,
  target: updateErrorEvent,
});

sample({
  clock: getExercisesRequestFx.failData,
  target: getExercisesCachedFx,
});

sample({
  clock: getSelectedExerciseEvent,
  fn: () => 0,
  target: setDelayExercise,
});

sample({ clock: sendNewExercise.doneData, target: getExercisesRequestFx });

const $exerciseData = combine({
  loading: getExercisesRequestFx.pending,
  error: restore(getExercisesCachedFx.failData, null),
  exerciseData: $exerciseStore,
});

export { $exerciseStore, $exerciseData, getExercisesRequestFx };
