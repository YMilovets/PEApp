/* eslint-disable no-use-before-define */
import { useRef, useState } from 'react';
import useTimer from './useTimer';
import { CycleProps, CycleStatus } from './types';

export default function useCycle(
  {
    countRepeats, delayExercise, timeExercise, timePause = 0, deltaTime = 0, onCycleOver,
  }: CycleProps,
) {
  const currentStep = useRef<number>(0);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const currentStatus = useRef<CycleStatus>(CycleStatus.FINISHED);
  const prevStatus = useRef<CycleStatus>(CycleStatus.FINISHED);

  const [status, setStatus] = useState<CycleStatus>(CycleStatus.AFTER_LOADED);

  const { start: pauseStartTime, stop: pauseStop } = useTimer({
    initialTime: timePause + deltaTime * (currentStep.current - 1),
    onTimeOver: () => handleCycle(CycleStatus.STARTED),
    onTimeStart() {
      currentStatus.current = CycleStatus.PAUSED;
    },
  });

  const { start, time, stop } = useTimer({
    initialTime: timeExercise,
    onTimeOver: () => handleCycle(CycleStatus.PAUSED),
    onTimeStart() {
      if (!currentRepeat) {
        currentStatus.current = CycleStatus.STARTED;
        setStatus(currentStatus.current);
      }
    },
  });

  const { start: startDelay } = useTimer({
    initialTime: delayExercise,
    onTimeOver: () => handleCycle(CycleStatus.STARTED),
    onTimeStart() {
      currentStatus.current = CycleStatus.PAUSED;
      setStatus(currentStatus.current);
    },
  });

  function pausedCycle() {
    switch (currentStatus.current) {
      case CycleStatus.STARTED:
        stop();
        currentStatus.current = CycleStatus.STOPPED;
        prevStatus.current = CycleStatus.STARTED;
        break;
      case CycleStatus.PAUSED:
        pauseStop();
        currentStatus.current = CycleStatus.STOPPED;
        prevStatus.current = CycleStatus.PAUSED;
        break;
      default: break;
    }
    setStatus(currentStatus.current);
  }

  function playCycle() {
    switch (prevStatus.current) {
      case CycleStatus.STARTED:
        start();
        currentStatus.current = CycleStatus.STARTED;
        prevStatus.current = CycleStatus.STOPPED;
        break;
      case CycleStatus.PAUSED:
        pauseStartTime();
        currentStatus.current = CycleStatus.PAUSED;
        prevStatus.current = CycleStatus.STOPPED;
        break;
      default: break;
    }
    setStatus(currentStatus.current);
  }

  function play(playStatus: CycleStatus) {
    if (playStatus === CycleStatus.STOPPED) playCycle();
    else pausedCycle();
  }
  function handleCycle(selectedStatus: CycleStatus) {
    if (currentStep.current < countRepeats) {
      currentStatus.current = selectedStatus;

      if (currentStatus.current === CycleStatus.PAUSED) {
        currentStep.current += 1;
        if (currentStep.current < countRepeats) pauseStartTime();
        else {
          currentStep.current = 0;
          currentStatus.current = CycleStatus.FINISHED;
          if (onCycleOver) onCycleOver();
        }
      } else start();
    }
    setCurrentRepeat(currentStep.current);
    setStatus(currentStatus.current);
  }

  return {
    start: startDelay,
    step: currentRepeat,
    status,
    time,
    play,
    prevStatus,
  };
}
