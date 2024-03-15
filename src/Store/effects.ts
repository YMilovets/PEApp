import { createEffect } from "effector";
import { getAllExercises } from "./database";

export const getExercisesRequestFx = createEffect(async () => {
  const url = `${import.meta.env.VITE_GLOBAL_API}/${
    import.meta.env.VITE_GLOBAL_FILE
  }`;
  const exercises = await fetch(url);
  return exercises.json();
});

export const getExercisesCachedFx = createEffect(async () => {
  const exercises = await getAllExercises();
  if (exercises.length <= 0) throw new Error("0x000");
  return exercises;
});

