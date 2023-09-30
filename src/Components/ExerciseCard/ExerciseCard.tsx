import clsx from 'clsx';
import {
  ChangeEvent, useCallback,
} from 'react';
import { useEvent } from 'effector-react';
import { ExerciseProps } from './ExerciseCard.type';
import style from './ExerciseCard.module.css';
import useCycle from '../../Hooks/useCycle';
import { Input, InputGroup, InputLabel } from '../InputGroup';
import { setDelayExercise, setVolumeNotification } from '../../Store/events';
import Spoiler from '../Spoiler';
import { CycleStatus } from '../../Hooks/types';
import ExerciseCardTimer from './ExerciseCardTimer';

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
  const {
    start, step, status, time, play,
  } = useCycle(
    {
      countRepeats: countRepeat || 0,
      timeExercise: timeProgress || 0,
      delayExercise: exerciseDelay || 0,
      timePause: timePause || 0,
      deltaTime: deltaTime || 0,
    },
  );

  const changeDelayExercise = useEvent(setDelayExercise);
  const handleChangeDelay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (status === CycleStatus.FINISHED) {
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
          captionRenderFn={(
            <p className={style.exercisePageSpoilerLabel}>
              Настройки
            </p>
          )}
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
                  defaultValue="0"
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
        <div className={style.exercisePageManager}>
          <figure className={style.exercisePageImgContainer}>
            <img className={style.exercisePageImg} src={`${img}`} alt="" />
          </figure>
          <ExerciseCardTimer
            timeProgress={timeProgress}
            start={start}
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
