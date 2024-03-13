import {
  combine,
  createEffect,
  createStore,
  sample,
} from 'effector';
import { ExerciseItem, ExerciseItemStore } from '../Types';
import {
  getSelectedExerciseEvent, setDelayExercise, setSliderPos, setVolumeNotification, updateErrorEvent,
} from './events';
import exercisesRequestFacades from '../Facades/exercisesRequestFacades';

const getExercisesRequestFx = createEffect(
  async (): Promise<Array<ExerciseItem>> => {
    const url = `${import.meta.env.VITE_GLOBAL_API}/${import.meta.env.VITE_GLOBAL_FILE}`;
    const exercises = await fetch(url);
    return exercises.json();
  },
);

const $exerciseStore = createStore<ExerciseItemStore>({
  listExercise: [],
  selectedExercise: null,
  sliderPos: 0,
  exerciseDelay: 0,
  volume: 100,
})
  .on(getExercisesRequestFx.doneData, (state, payload) => ({
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
const $errorStatus = createStore(false).on(updateErrorEvent, () => true);

getExercisesRequestFx();

sample({
  clock: getExercisesRequestFx.failData,
  source: $errorStatus,
  target: updateErrorEvent,
});

sample({
  clock: getSelectedExerciseEvent,
  fn: () => 0,
  target: setDelayExercise,
});

const $exerciseState = combine({
  loading: getExercisesRequestFx.pending,
  error: $errorStatus,
});

export { $exerciseStore, $exerciseState, getExercisesRequestFx };
