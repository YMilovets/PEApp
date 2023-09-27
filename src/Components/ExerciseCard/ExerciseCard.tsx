import { ExerciseProps } from "./ExerciseCard.type";
import style from "./ExerciseCard.module.css"
import clsx from "clsx";
import Button, { ButtonWrapper } from "../Button";
import StartIcon from "../Icons/StartIcon";
import PauseIcon from "../Icons/PauseIcon";
import useCycle from "../../Hooks/useCycle";
import { getTimeDisplay } from "./utils";
import { Input, InputGroup, InputLabel } from "../InputGroup";
import { ChangeEvent, useCallback } from "react";
import { useEvent } from "effector-react";
import { setDelayExercise } from "../../Store/events";
import Spoiler from "../Spoiler";
import useAudio from "../../Hooks/useAudio";

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
      status === "finished" && changeDelayExercise(+e.currentTarget.value);
    },
    [changeDelayExercise, status]
  );

  useAudio(
    [
      {
        source: "/audio/end.wav",
        excludedStatus: ["afterLoaded"],
        includedStatus: ["paused"],
      },
      {
        source: "/audio/start.wav",
        excludedStatus: ["afterLoaded"],
        includedStatus: ["started"],
      },
    ],
    status
  );

  document.onkeydown = (e) => {
    if (
      (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "ы") &&
      (status === "finished" || status === "afterLoaded")
    ) {
      start();
    }
    if (e.key.toLowerCase() === "p" || e.key.toLowerCase() === "з") play(status);
  }

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
                      status !== "finished" && status !== "afterLoaded",
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
                  disabled={status !== "finished" && status !== "afterLoaded"}
                />
              </InputGroup>
            </div>
          </div>
        </Spoiler>
        <div className={style.exercisePageManager}>
          <figure className={style.exercisePageImgContainer}>
            <img className={style.exercisePageImg} src={`${img}`} alt="" />
          </figure>
          <div className={style.exercisePageTimerContainer}>
            <ButtonWrapper className={style.exercisePageTimerStartBtn}>
              <Button
                disabled={status !== "afterLoaded" && status !== "finished"}
                onClick={start}
                className={style.exercisePageStartBtn}
              >
                <StartIcon height={40} width={40} />
                <span>Запустить (S)</span>
              </Button>
            </ButtonWrapper>
            <ButtonWrapper className={style.exercisePageTimerPausetn}>
              <Button
                onClick={() => play(status)}
                className={style.exercisePagePauseBtn}
                disabled={status === "finished" || status === "afterLoaded"}
              >
                <PauseIcon height={40} width={40} />
                <span>
                  {status === "stopped" ? "Продолжить" : "Приостановить"} (P)
                </span>
              </Button>
            </ButtonWrapper>
            <div className={style.exercisePageTimer}>
              <small>
                Время окончания <br />
                повторения
              </small>
              <h1 className={style.exercisePageValue}>
                {getTimeDisplay(status, time, timeProgress)}
              </h1>
            </div>
            <div className={style.exercisePageTimer}>
              <small>
                Количество выполненных <br />
                повторений
              </small>
              <h1 className={style.exercisePageValue}>
                {status === "finished" || status === "afterLoaded" ? "-" : step}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={style.exercisePageText}
          dangerouslySetInnerHTML={{ __html: action || "" }}
        />
      </article>
    </section>
  );
}
