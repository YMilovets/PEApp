import { useCallback, DragEvent } from "react";
import { MenuIcon } from "../Icons";
import style from "./DragListItem.module.css";
import { DragItemProp } from "./DragListItem.type";

function DragListItem({
  link,
  img,
  title,
  action,
  onDrop,
  onDragStart,
  descriptionId,
  titleId,
}: DragItemProp<string>) {
  const handleRemoveHighlight = useCallback(
    (onRemove?: (e: DragEvent<HTMLElement>) => void) =>
      (e: DragEvent<HTMLElement>) => {
        e.currentTarget.classList.remove(style.executePageItemEntered);
        onRemove?.(e);
      },
    []
  );

  const handleDragStart = useCallback((e: DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/html", "dragstart");
    e.stopPropagation();
    onDragStart?.(e.currentTarget.dataset.id);
    e.currentTarget.style.opacity = "0.45";
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add(style.executePageItemEntered);
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleRemoveHighlight(onDrop)}
      onDragOver={handleDragOver}
      onDragLeave={handleRemoveHighlight()}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        e.currentTarget.style.opacity = "";
      }}
      draggable
      className={style.executePageItem}
      data-id={link}
    >
      <figure className={style.executePageImageContainer}>
        <img
          className={style.executePageImage}
          src={img}
          alt="Здесь рыбы нет"
        />
      </figure>
      <div className={style.executePageContent}>
        <h3 id={titleId} className={style.executePageTitle}>
          {title}
        </h3>
        <div id={descriptionId}>{action}</div>
      </div>
      <div title="Переместить" className={style.executePageDragBtn} draggable>
        <MenuIcon className={style.executePageDragBtnIcon} />
      </div>
    </div>
  );
}

export default DragListItem;
