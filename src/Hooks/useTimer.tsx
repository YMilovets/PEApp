import { useRef, useState } from "react";
import { TimerProps, TimerStatus } from "./types";

export default function useTimer({
  initialTime,
  stepTime = 1000,
  onTimeOver,
  onTimeStart,
}: TimerProps) {  
    const [status, setStatus] = useState<TimerStatus>("stopped");
    const [time, setTime] = useState<number>();
    const timerId = useRef<NodeJS.Timeout>();
    
    const startStepTimer = function (
      currentTime: number,
      currentStatus: TimerStatus
    ) {      
      setTime(currentTime);
      if (currentTime >= 1)
        timerId.current = setTimeout(
          startStepTimer.bind(null, currentTime - 1, currentStatus),
          stepTime
        );
      else if (currentTime < 1 && currentTime > 0)
        timerId.current = setTimeout(
          startStepTimer.bind(null, 0, currentStatus),
          stepTime * currentTime
        );
      else {
        setStatus("stopped");
        onTimeOver && onTimeOver();
      }
    };
    function stop() {
        setStatus("stopped");
        clearTimeout(timerId.current)
    }
    function start() {
        setStatus("actived");
        onTimeStart && onTimeStart();
        timerId.current = setTimeout(startStepTimer.bind(null, initialTime, status), stepTime);
    }

    return { status, start, stop, time };
}
