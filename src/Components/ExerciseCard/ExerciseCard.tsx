import { ExerciseProps } from "./ExerciseCard.type";
import style from "./ExerciseCard.module.css";
import clsx from "clsx";
import useCycle from "../../Hooks/useCycle";
import { Input, InputGroup, InputLabel } from "../InputGroup";
import { ChangeEvent, useCallback } from "react";
import { useEvent } from "effector-react";
import { setDelayExercise } from "../../Store/events";
import Spoiler from "../Spoiler";
import { CycleStatus } from "../../Hooks/types";
import ExerciseCardTimer from "./ExerciseCardTimer";

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
}: ExerciseProps) {
  const { start, step, status, time, play } = useCycle(
    countRepeat || 0,
    timeProgress || 0,
    exerciseDelay || 0,
    timePause || 0,
    deltaTime || 0
  );

  const changeDelayExercise = useEvent(setDelayExercise);
  const handleChangeDelay = useCallback(
    function <T extends ChangeEvent<U>, U extends HTMLInputElement>(e: T) {
      e.preventDefault();
      status === CycleStatus.FINISHED && changeDelayExercise(+e.currentTarget.value);
    },
    [changeDelayExercise, status]
  );

  return (
    <section className={clsx(style.exercisePage, className)}>
      <article>
        <header className={style.exercisePageHeader}>
          <h1 className={style.exercisePageTitle}>{title}</h1>
        </header>
        <Spoiler
          className={style.exercisePageSpoilerContainer}
          style={{
            "--spoiler-padding": "0.2rem 0.55rem",
            "--spoiler-border-radius": "0.45rem",
          }}
          captionRenderFn={(onClick) => (
            <small className={style.exercisePageSpoilerLabel} onClick={onClick}>
              Настройки
            </small>
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
                      status !== CycleStatus.FINISHED &&
                      status !== CycleStatus.AFTER_LOADED,
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
                    status !== CycleStatus.FINISHED &&
                    status !== CycleStatus.AFTER_LOADED
                  }
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
          />
        </div>
        <div
          className={style.exercisePageText}
          dangerouslySetInnerHTML={{ __html: action || "" }}
        />
      </article>
    </section>
  );
}
