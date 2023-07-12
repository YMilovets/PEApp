import { useStore } from "effector-react";
import { useEffect, useMemo } from "react";
import { translate } from "../../i18n";
import { $exerciseState, $exerciseStore } from "../../Store/exercise";
import Card from "../Card/Card";
import { ExerciseItemStore, ExercisesListProps } from "./ExercisesList.type";
import style from "./ExercisesList.module.css";

export default function ExercisesList({ search }: ExercisesListProps) {
  const items = useStore<ExerciseItemStore>($exerciseStore);
  const { loading, error } = useStore($exerciseState);

  const itemWithSearchFilter = useMemo(
    () =>
      items.filter(
        (post) => !search || post.title.toLowerCase().includes(search)
      ),
    [search, items]
  );

  useEffect(() => {
    if (error)
      throw new Error(translate("NotificationText", "0x000") as string);
  }, [error]);

  if (loading) return <p>{translate("NotificationText", "0x001") as string}</p>;
  return (
    <section className={style.listExercises}>
      <div className={style.listExercisesContainer}>
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
