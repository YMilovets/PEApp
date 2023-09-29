import { useRef, useState } from 'react';
import { TimerProps, TimerStatus } from './types';

export default function useTimer({
  initialTime,
  stepTime = 1000,
  onTimeOver,
  onTimeStart,
}: TimerProps) {
  const [status, setStatus] = useState<TimerStatus>('stopped');
  const [, setTime] = useState<number>();
  const timerId = useRef<NodeJS.Timeout>();
  const refTimer = useRef<number>();

  const startStepTimer = function (
    currentTime: number,
    currentStatus: TimerStatus,
  ) {
    refTimer.current = currentTime;
    if (currentTime >= 1) {
      timerId.current = setTimeout(
        startStepTimer.bind(null, currentTime - 1, currentStatus),
        stepTime,
      );
    } else if (currentTime < 1 && currentTime > 0) {
      timerId.current = setTimeout(
        startStepTimer.bind(null, 0, currentStatus),
        stepTime * currentTime,
      );
    } else {
      setStatus('stopped');
      if (onTimeOver) onTimeOver();
    }
    setTime(refTimer.current);
  };
  function stop() {
    setStatus('stopped');
    clearTimeout(timerId.current);
  }
  function start() {
    setStatus('actived');
    if (onTimeStart) onTimeStart();
    if (initialTime) {
      timerId.current = setTimeout(
        startStepTimer.bind(null, initialTime, status),
        stepTime,
      );
    } else {
      setStatus('stopped');
      if (onTimeOver) onTimeOver();
    }
  }

  return {
    status, start, stop, time: refTimer.current,
  };
}
