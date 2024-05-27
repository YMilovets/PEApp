import { createStore } from "effector";
import { ExerciseItem } from "../Types";
import { clearExercise, setSelectedExercise } from "./events";

const INITIAL_STATE: Array<ExerciseItem> = [];

export const $autoExecute = createStore(INITIAL_STATE)
  .on(setSelectedExercise, (state, payload) => {
    if (state.find(({ link }) => payload.link === link))
      return state.filter(({ link }) => payload.link !== link);
    return [...state, payload];
  })
  .reset(clearExercise);
