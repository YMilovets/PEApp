import { ExerciseItem } from '../Types';

export default function exercisesRequestFacades(payload:Array<ExerciseItem>) {
  return payload.map(({ img, ...otherProps }) => ({
    img: `${import.meta.env.VITE_GLOBAL_API}/${
      import.meta.env.VITE_PATH_IMAGES
    }/${img}`,
    ...otherProps,
  }));
}
