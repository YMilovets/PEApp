import { CycleStatus } from "../../Hooks/types";
import PauseIcon from "../Icons/PauseIcon";
import style from "./ExerciseCard.module.css"

export function getTimeDisplay(
  status: CycleStatus,
  time?: number,
  defaultTime: number | string = "-"
) {
  if (status === "finished" || status === "afterLoaded") return "-";
  if (status === "paused" || status === "stopped" || time === 0)
    return (
      <PauseIcon
        className={style.exercisePagePauseIcon}
        height={58}
        width={58}
      />
    );
  return time || defaultTime;
}