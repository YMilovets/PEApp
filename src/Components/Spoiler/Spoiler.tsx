import {
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useCallback,
  useState,
} from "react";
import clsx from "clsx";
import Button from "../Button";
import SpoilerProps from "./Spoiler.type";

import spoilerStyle from "./Spoiler.module.css";

function Spoiler(
  {
    children,
    className,
    caption,
    style,
    captionRenderFn,
    onClick,
  }: SpoilerProps,
  ref: RefObject<HTMLDivElement>
) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    onClick?.();
    setIsActive(!isActive);
  }, [isActive]);
  return (
    <article style={style} className={clsx(className, spoilerStyle.spoiler)}>
      {(
        <div
          style={{ width: "max-content" }}
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          onClick={handleClick}
          ref={ref}
          aria-hidden={!captionRenderFn}
        >
          {captionRenderFn}
        </div>
      ) || (
        <Button className={spoilerStyle.spoilerSwitcher} onClick={handleClick}>
          {caption}
        </Button>
      )}
      <div
        className={clsx(spoilerStyle.spoilerBody, {
          [spoilerStyle.spoilerBodyIsActive]: !isActive,
        })}
      >
        {children}
      </div>
    </article>
  );
}

export default forwardRef(
  Spoiler as ForwardRefRenderFunction<HTMLElement, SpoilerProps>
);

