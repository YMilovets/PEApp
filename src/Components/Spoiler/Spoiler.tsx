import { useCallback, useState } from "react";
import Button from "../Button";
import SpoilerProps from "./Spoiler.type";
import clsx from "clsx";

import spoilerStyle from "./Spoiler.module.css";

function Spoiler({
  children,
  className,
  caption,
  style,
  captionRenderFn,
}: SpoilerProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = useCallback(() => setIsActive(!isActive), [isActive]);
  return (
    <article style={style} className={clsx(className, spoilerStyle.spoiler)}>
      {captionRenderFn ? (
        captionRenderFn(handleClick)
      ) : (
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

export default Spoiler;
