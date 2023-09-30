import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { $exerciseStore } from '../Store/exercise';
import ExerciseCard from '../Components/ExerciseCard';
import { getSelectedExerciseEvent } from '../Store/events';
import NotFoundPage from './NotFoundPage';
import useClearSearch from '../Hooks/useClearSearch';
import { ExerciseItemStore } from '../Types';

export default function Exercise() {
  const handleLoadExercise = useEvent(getSelectedExerciseEvent);
  const { id } = useParams();

  const {
    selectedExercise, listExercise, exerciseDelay, volume,
  } = useStore<ExerciseItemStore>($exerciseStore);
  const {
    title,
    action,
    img,
    link,
    count_repeat: countRepeat,
    time_progress: timeProgress,
    time_pause: timePause,
    delta_time: deltaTime,
  } = selectedExercise || {};

  useEffect(() => {
    handleLoadExercise(id);
  }, [handleLoadExercise, id, listExercise]);

  useClearSearch('#global-search');

  if (!selectedExercise) return <NotFoundPage />;
  return (
    <ExerciseCard
      className={`exercise-${link}`}
      title={title}
      action={action}
      img={img}
      countRepeat={countRepeat}
      timeProgress={timeProgress}
      timePause={timePause}
      deltaTime={deltaTime}
      exerciseDelay={exerciseDelay}
      volume={volume}
    />
  );
}
