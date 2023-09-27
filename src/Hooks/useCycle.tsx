import { useRef, useState } from "react";
import useTimer from "./useTimer";
import { CycleStatus } from "./types";

export default function useCycle(
  countRepeats: number,
  timeExercise: number,
  delayExercise: number,
  timePause = 0,
  deltaTime = 0
) {
  const currentStep = useRef<number>(0);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const currentStatus = useRef<CycleStatus>("finished");
  const prevStatus = useRef<CycleStatus>("finished");

  const [status, setStatus] = useState<CycleStatus>("afterLoaded");  
  
  const { start: pauseStartTime, stop: pauseStop } = useTimer({
    initialTime: timePause + deltaTime * (currentStep.current - 1),
    onTimeOver: () => handleCycle("started"),
    onTimeStart() {      
      currentStatus.current = "paused";
    },
  });

  const { start, time, stop } = useTimer({
    initialTime: timeExercise,
    onTimeOver: () => handleCycle("paused"),
    onTimeStart() {
      if (!currentRepeat) {
        currentStatus.current = "started";
        setStatus(currentStatus.current);
      }
    },
  });

  const { start: startDelay } = useTimer({
    initialTime: delayExercise,
    onTimeOver: () => handleCycle("started"),
    onTimeStart() {
      currentStatus.current = "paused";
      setStatus(currentStatus.current);
    },
  });

  function pausedCycle() {
    switch (currentStatus.current) {
      case "started":
        stop();
        currentStatus.current = "stopped";
        prevStatus.current = "started";
        break;
      case "paused":
        pauseStop();
        currentStatus.current = "stopped";
        prevStatus.current = "paused";
        break;
    }      
    setStatus(currentStatus.current);
  }

  function playCycle() {
    switch (prevStatus.current) {
      case "started":
        start();
        currentStatus.current = "started";
        prevStatus.current = "stopped";
        break;
      case "paused":
        pauseStartTime();
        currentStatus.current = "paused";
        prevStatus.current = "stopped";
        break;
    }
    setStatus(currentStatus.current);
  }

  function play(status: CycleStatus) {
    if (status === "stopped") playCycle();
    else pausedCycle();
  }

  function handleCycle(selectedStatus: CycleStatus) {
    if (currentStep.current < countRepeats) {
      currentStatus.current = selectedStatus;
      
      if (currentStatus.current === "paused") {
        currentStep.current += 1;
        if (currentStep.current < countRepeats) pauseStartTime();
        else {
          currentStep.current = 0;
          currentStatus.current = "finished";
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