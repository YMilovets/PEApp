import { useStore } from "effector-react";
import { useEffect } from "react";
import { translate } from "../../i18n";
import { $exerciseState } from "../../Store/exercise";
import Card from "../Card/Card";
import style from "./ExercisesList.module.css";
import { useClearSearch } from "../../Hooks/useClearSearch";
import useFilterSlider from "../../Hooks/useFilterSlider";

export default function ExercisesList() {
  const { itemWithSearchFilter, sliderPos } = useFilterSlider();

  const { loading, error } = useStore($exerciseState);

  useClearSearch("#global-search");

  useEffect(() => {
    if (error)
      throw new Error(translate("NotificationText", "0x000") as string);
  }, [error]);

  if (loading) return <p>{translate("NotificationText", "0x001") as string}</p>;
  return (
    <section className={style.listExercises}>
      <div
        style={{ transform: `translateX(${sliderPos}px)` }}
        id="slider-exercises"
        className={style.listExercisesContainer}
      >
        {itemWithSearchFilter.length > 0 ? (
          itemWithSearchFilter.map(({ img, title, action, link }, i) => (
            <Card key={i} img={img} title={title} action={action} link={link} />
          ))
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: translate("NotificationText", "0x002") as string,
            }}
          />
        )}
      </div>
    </section>
  );
}
