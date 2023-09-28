import {
  combine,
  createEffect,
  createStore,
  sample,
} from "effector";
import { ExerciseItem, ExerciseItemStore } from "../Types";
import { getSelectedExerciseEvent, setDelayExercise, setSliderPos, updateErrorEvent } from "./events";

const getExercisesRequestFx = createEffect(
  async function getExercisesRequest() {   
    const url = "https://ymilovets.github.io/storageJSON/exercises.json";
    const exercises = await fetch(url);
    return exercises.json();
  }
);

const $exerciseStore = createStore<ExerciseItemStore>({
  listExercise: [],
  selectedExercise: null,
  sliderPos: 0,
  exerciseDelay: 0,
})
  .on(getExercisesRequestFx.doneData, (state, payload) => ({
    ...state,
    listExercise: payload,
  }))
  .on(setSliderPos, (state, payload) => ({ ...state, sliderPos: payload }))
  .on(getSelectedExerciseEvent, (state, payload) => ({
    ...state,
    selectedExercise: state.listExercise.find(
      ({ link }: ExerciseItem) => link === payload
    ) as ExerciseItem,
  }))
  .on(setDelayExercise, (state, payload) => ({
    ...state,
    exerciseDelay: payload,
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
