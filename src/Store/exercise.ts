import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

const getExercisesRequestFx = createEffect(
  async function getExercisesRequest() {
    const url = "https://ymilovets.github.io/storageJSON/exercises.json";
    const exercises = await fetch(url);
    return exercises.json();
  }
);

const updateErrorEvent = createEvent();

const $exerciseStore = restore(getExercisesRequestFx, []);
const $errorStatus = createStore(false).on(updateErrorEvent, () => true);

getExercisesRequestFx();

sample({
  clock: getExercisesRequestFx.failData,
  source: $errorStatus,
  target: updateErrorEvent,
});

const $exerciseState = combine({
  loading: getExercisesRequestFx.pending,
  error: $errorStatus,
});

export { $exerciseStore, $exerciseState, getExercisesRequestFx };
