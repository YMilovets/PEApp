import { getTimeDisplay } from "./utils";
import style from "./ExerciseCard.module.css"
import { CycleStatus } from "../../Hooks/types";
import { ExerciseTimerProps } from "./ExerciseCard.type";
import Button, { ButtonWrapper } from "../Button";
import PauseIcon from "../Icons/PauseIcon";
import StartIcon from "../Icons/StartIcon";
import useAudio from "../../Hooks/useAudio";
import { translate } from "../../i18n";
import clsx from "clsx";

function ExerciseCardTimer({
  timeProgress,
  status,
  start,
  play,
  time,
  step,
  className,
}: ExerciseTimerProps) {
  useAudio(
    [
      {
        source: "/audio/end.wav",
        excludedStatus: [CycleStatus.AFTER_LOADED],
        includedStatus: [CycleStatus.PAUSED],
      },
      {
        source: "/audio/start.wav",
        excludedStatus: [CycleStatus.AFTER_LOADED],
        includedStatus: [CycleStatus.STARTED],
      },
    ],
    status
  );

  document.onkeyup = (e) => {
    if (
      (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "ы") &&
      (status === CycleStatus.FINISHED || status === CycleStatus.AFTER_LOADED)
    ) {
      start();
    }
    if (e.key.toLowerCase() === "p" || e.key.toLowerCase() === "з")
      play(status);
  };

  return (
    <div className={clsx(className, style.exercisePageTimerContainer)}>
      <ButtonWrapper className={style.exercisePageTimerStartBtn}>
        <Button
          disabled={
            status !== CycleStatus.AFTER_LOADED &&
            status !== CycleStatus.FINISHED
          }
          onClick={start}
          className={style.exercisePageStartBtn}
        >
          <StartIcon height={40} width={40} />
          <span>{translate("ExerciseText", "startButton")}</span>
        </Button>
      </ButtonWrapper>
      <ButtonWrapper className={style.exercisePageTimerPausetn}>
        <Button
          onClick={() => play(status)}
          className={style.exercisePagePauseBtn}
          disabled={
            status === CycleStatus.FINISHED ||
            status === CycleStatus.AFTER_LOADED
          }
        >
          <PauseIcon height={40} width={40} />
          <span>
            {status === CycleStatus.STOPPED
              ? translate("ExerciseText", "playButton")
              : translate("ExerciseText", "pauseButton")}{" "}
            (P)
          </span>
        </Button>
      </ButtonWrapper>
      <div className={style.exercisePageTimer}>
        <small
          dangerouslySetInnerHTML={{
            __html: translate("ExerciseText", "lastTimeRepeat"),
          }}
        />
        <h1 className={style.exercisePageValue}>
          {getTimeDisplay(status, time, timeProgress)}
        </h1>
      </div>
      <div className={style.exercisePageTimer}>
        <small
          dangerouslySetInnerHTML={{
            __html: translate("ExerciseText", "countRepeat"),
          }}
        />
        <h1 className={style.exercisePageValue}>
          {status === CycleStatus.FINISHED ||
          status === CycleStatus.AFTER_LOADED
            ? "-"
            : step}
        </h1>
      </div>
    </div>
  );
}

export default ExerciseCardTimer