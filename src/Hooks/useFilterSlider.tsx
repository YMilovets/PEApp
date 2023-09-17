import { useSearchParams } from "react-router-dom";
import { $exerciseStore } from "../Store/exercise";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { ExerciseItemStore } from "../Types";

export default function useFilterSlider() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search")?.toLowerCase();
  
    const { listExercise: items = [], sliderPos } =
      useStore<ExerciseItemStore>($exerciseStore);
    const itemWithSearchFilter = useMemo(
      () =>
        items.filter(
          (post) => !search || post.title.toLowerCase().includes(search)
        ),
      [search, items]
    );

    return { itemWithSearchFilter, sliderPos };
}