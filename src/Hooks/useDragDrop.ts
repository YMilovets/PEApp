import { useState, DragEvent, useCallback } from "react";
import { setOrderExercise } from "../Store/events";

export default function useDragDrop() {
  const [dragElementId, setDragElementId] = useState<string | undefined | null>(
    null
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      const dropElementId = e.currentTarget.dataset.id;
      if (dragElementId && dropElementId) {
        setOrderExercise({
          dragElementId,
          dropElementId,
        });
      }
    },
    [dragElementId]
  );

  return { handleDrop, setDragElementId };
}
