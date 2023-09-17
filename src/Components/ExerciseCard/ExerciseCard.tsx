import { ExerciseProps } from "./ExerciseCard.type";
import style from "./ExerciseCard.module.css"
import clsx from "clsx";
import Button, { ButtonWrapper } from "../Button";
import StartIcon from "../Icons/StartIcon";
import PauseIcon from "../Icons/PauseIcon";
import useCycle from "../../Hooks/useCycle";
import { getTimeDisplay } from "./utils";

export default function ExerciseCard({
  action,
  img,
  title,
  className,
  countRepeat,
  timeProgress,
  timePause,
  deltaTime,
}: ExerciseProps) {
  const { start, step, status, time, play } = useCycle(
    countRepeat || 0,
    timeProgress || 0,
    timePause || 0,
    deltaTime || 0,
  );

  return (
    <section className={clsx(style.exercisePage, className)}>
      <article>
        <header className={style.exercisePageHeader}>
          <h1 className={style.exercisePageTitle}>{title}</h1>
        </header>
        <div className={style.exercisePageManager}>
          <figure className={style.exercisePageImgContainer}>
            <img className={style.exercisePageImg} src={`${img}`} alt="" />
          </figure>
          <div className={style.exercisePageTimerContainer}>
            <ButtonWrapper className={style.exercisePageTimerStartBtn}>
              <Button
                disabled={status !== "finished"}
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
                disabled={status === "finished"}
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
                {status === "finished" ? "-" : step}
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
