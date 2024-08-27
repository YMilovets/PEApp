import clsx from 'clsx';
import { ChangeEvent, useCallback, useState } from 'react';
import { useEvent } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import useCycle from '../../Hooks/useCycle';
import { CycleStatus } from '../../Hooks/types';

import { Input, InputGroup, InputLabel } from '../InputGroup';
import Spoiler from '../Spoiler';
import ExerciseCardTimer from './ExerciseCardTimer';

import createNotification from '../../Shared';
import { setDelayExercise, setVolumeNotification } from '../../Store/events';

import { ExerciseProps } from './ExerciseCard.type';

import style from './ExerciseCard.module.css';

export default function ExerciseCard({
  action,
  img,
  title,
  className,
  countRepeat,
  timeProgress,
  timePause,
  deltaTime,
  exerciseDelay,
  volume,
}: ExerciseProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>();
  const handleEndExercise = useCallback(async () => {
    try {
      setMessage(null);
      await createNotification({
        body: `Вы успешно выполнили упражнение "${title}"! Приступайте к новому.`,
        title: 'Упражнение закончено',
        onClick: () => navigate('/'),
      });
    } catch (error) {
      setMessage((error as Error).message);
    }
  }, [navigate, title]);

  const {
    start, step, status, time, play,
  } = useCycle({
    countRepeats: countRepeat || 0,
    timeExercise: timeProgress || 0,
    delayExercise: exerciseDelay || 0,
    timePause: timePause || 0,
    deltaTime: deltaTime || 0,
    onCycleOver: handleEndExercise,
  });

  const handleStartExercise = useCallback(async () => {
    start();
    try {
      setMessage(null);
      await createNotification({
        title: 'Упражнение запущено',
        body: `Запущено новое упражнение "${title}".`,
      });
    } catch (error) {
      setMessage((error as Error).message);
    }
  }, [start, title]);

  const changeDelayExercise = useEvent(setDelayExercise);
  const handleChangeDelay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (status === CycleStatus.AFTER_LOADED) {
        changeDelayExercise(+e.currentTarget.value);
      }
    },
    [changeDelayExercise, status],
  );

  const changeVolumeExercise = useEvent(setVolumeNotification);
  const handleChangeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      changeVolumeExercise(+e.currentTarget.value);
    },
    [changeVolumeExercise],
  );

  return (
    <section className={clsx(style.exercisePage, className)}>
      <article className={style.exercisePageContainer}>
        <header className={style.exercisePageHeader}>
          <h1 className={style.exercisePageTitle}>{title}</h1>
        </header>
        <Spoiler
          className={style.exercisePageSpoilerContainer}
          style={{
            '--spoiler-padding': '0.2rem 0.55rem',
            '--spoiler-border-radius': '0.45rem',
          }}
          captionRenderFn={
            <p className={style.exercisePageSpoilerLabel}>Настройки</p>
          }
        >
          <div className={style.exercisePageSpoiler}>
            <div>
              <small className={style.exercisePageCaption}>
                Укажите время задержки от 0 до 10 секунд
              </small>
              <InputGroup className={style.exercisePageDelay}>
                <InputLabel
                  className={clsx(style.exercisePageLabel, {
                    [style.exercisePageLabelActive]:
                      status !== CycleStatus.FINISHED
                      && status !== CycleStatus.AFTER_LOADED,
                  })}
                  linkedId="time-delay-exercise"
                  position="left"
                >
                  Время задержки
                </InputLabel>
                <Input
                  className={style.exercisePageDelayInput}
                  type="number"
                  min="0"
                  max="10"
                  value={exerciseDelay}
                  id="time-delay-exercise"
                  onChange={handleChangeDelay}
                  disabled={
                    status !== CycleStatus.FINISHED
                    && status !== CycleStatus.AFTER_LOADED
                  }
                />
              </InputGroup>
              <small className={style.exercisePageCaption}>
                Настройка громкости звука уведомления
              </small>
              <InputGroup className={style.exercisePageDelay}>
                <InputLabel
                  className={clsx(style.exercisePageLabel)}
                  linkedId="volume-sound"
                  position="left"
                >
                  Громкость
                </InputLabel>
                <Input
                  className={style.exercisePageDelayInput}
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  id="volume-sound"
                  onChange={handleChangeVolume}
                />
              </InputGroup>
            </div>
          </div>
        </Spoiler>
        {message && (
          <p className={style.exercisePageMessage} role="alert">
            {message}
          </p>
        )}
        <div className={style.exercisePageManager}>
          <figure className={style.exercisePageImgContainer}>
            <img className={style.exercisePageImg} src={`${img}`} alt="" />
          </figure>
          <ExerciseCardTimer
            timeProgress={timeProgress}
            start={handleStartExercise}
            step={step}
            status={status}
            time={time}
            play={play}
            volume={volume}
          />
        </div>
        <div
          className={style.exercisePageText}
          dangerouslySetInnerHTML={{ __html: action || '' }}
        />
      </article>
    </section>
  );
}
