import { createStore } from "effector";
import { ExerciseItem } from "../Types";
import { clearExercise, setOrderExercise, setSelectedExercise } from "./events";

const INITIAL_STATE: Array<ExerciseItem> = [];

export const $autoExecute = createStore(INITIAL_STATE)
  .on(setSelectedExercise, (state, payload) => {
    if (state.find(({ link }) => payload.link === link))
      return state.filter(({ link }) => payload.link !== link);
    return [...state, payload];
  })
  .on(setOrderExercise, (state, { dragElementId, dropElementId }) => {
    const dragExercise = state.find(({ link }) => link === dragElementId);
    const dragExerciseIndex = state.findIndex(
      ({ link }) => link === dragElementId
    );
    if (dropElementId === dragElementId) return state;
    return state.reduce<Array<ExerciseItem>>(
      (orderedExercise, currentExercise, exerciseIndex) => {
        if (currentExercise.link === dragElementId) {
          return orderedExercise;
        }
        if (currentExercise.link === dropElementId && dragExercise) {
          if (dragExerciseIndex < exerciseIndex)
            return [...orderedExercise, currentExercise, dragExercise];
          return [...orderedExercise, dragExercise, currentExercise];
        }
        return [...orderedExercise, currentExercise];
      },
      []
    );
  })
  .reset(clearExercise);
