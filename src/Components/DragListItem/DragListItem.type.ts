import { DragEvent } from "react";

export interface DragItemProp<TValue extends Object> {
  link?: TValue;
  img: TValue;
  title: TValue;
  action: TValue;
  onDrop?: (e: DragEvent<HTMLElement>) => void;
  onDragStart?: (draggedElementId?: TValue) => void;
  titleId?: string;
  descriptionId?: string;
}
