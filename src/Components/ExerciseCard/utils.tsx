import { CycleStatus } from '../../Hooks/types';
import PauseIcon from '../Icons/PauseIcon';
import style from './ExerciseCard.module.css';

export default function getTimeDisplay(
  status: CycleStatus,
  time?: number,
  defaultTime: number | string = '-',
) {
  if (status === CycleStatus.FINISHED || status === CycleStatus.AFTER_LOADED) { return '-'; }
  if (
    status === CycleStatus.PAUSED
    || status === CycleStatus.STOPPED
    || time === 0
  ) {
    return (
      <PauseIcon
        className={style.exercisePagePauseIcon}
        height={58}
        width={58}
      />
    );
  }
  return time || defaultTime;
}
