import { useStore } from 'effector-react';
import translate from '../../i18n';
import { $exerciseData } from '../../Store/exercise';
import Card from '../Card/Card';
import style from './ExercisesList.module.css';
import useClearSearch from '../../Hooks/useClearSearch';
import useFilterSlider from '../../Hooks/useFilterSlider';

export default function ExercisesList() {
  const { itemWithSearchFilter, sliderPos } = useFilterSlider();

  const {
    loading,
    error,
  } = useStore($exerciseData);

  useClearSearch('#global-search');

  if (error) {
    throw new Error(
      `${translate(
        'NotificationText',
        error.message,
      )}<br /><b>Код ошибки:</b> ${error.message}` as string,
    );
  }
  if (loading) return <p>{translate('NotificationText', '0x001') as string}</p>;
  return (
    <section className={style.listExercises}>
      <div
        style={{ transform: `translateX(${sliderPos}px)` }}
        id="slider-exercises"
        className={style.listExercisesContainer}
      >
        {itemWithSearchFilter.length > 0 ? (
          itemWithSearchFilter.map(({
            img, title, action, link,
          }) => (
            <Card
              key={link}
              img={img}
              title={title}
              action={action}
              link={link}
            />
          ))
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: translate('NotificationText', '0x002') as string,
            }}
          />
        )}
      </div>
    </section>
  );
}
