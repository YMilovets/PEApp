import { MouseEventHandler, ReactNode } from "react";

export default interface SpoilerProps {
  children: ReactNode;
  caption?: string | ReactNode;
  className?: string;
  style: Record<string, string>;
  captionRenderFn?: (onClick: MouseEventHandler) => ReactNode;
}