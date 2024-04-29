import { createEffect } from 'effector';
import { getAllExercises } from './database';

export const getExercisesRequestFx = createEffect(async () => {
  const url = `${import.meta.env.VITE_GLOBAL_API}/${
    import.meta.env.VITE_GLOBAL_FILE
  }`;
  const exercises = await fetch(url);
  return exercises.json();
});

export const getExercisesCachedFx = createEffect(async () => {
  const exercises = await getAllExercises();
  if (exercises.length <= 0) throw new Error('0x000');
  return exercises;
});

export const getTokenAuth = createEffect(async (params: FormData) => {
  const url = `${import.meta.env.VITE_LOCAL_API}/auth`;
  const token = await fetch(url, { method: 'POST', body: params });
  return token.json();
});

export const sendNewExercise = createEffect(
  async ({ formData, token }: { formData: FormData | null; token: string }) => {
    const url = `${import.meta.env.VITE_LOCAL_API}/add`;

    const result = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    return result.json();
  },
);

export const sendNewImageExercise = createEffect(
  async ({ formData, token }: { formData: FormData | null; token: string }) => {
    const url = `${import.meta.env.VITE_LOCAL_API}/imageload`;

    const result = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    return result.json();
  },
);
