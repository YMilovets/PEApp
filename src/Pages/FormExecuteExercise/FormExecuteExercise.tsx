import clsx from "clsx";
import { useStore } from "effector-react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../Components/Button";
import DragListItem from "../../Components/DragListItem";
import Panel from "../../Components/Panel";
import useDragDrop from "../../Hooks/useDragDrop";
import useScroll from "../../Hooks/useScroll";
import { $autoExecute } from "../../Store/autoExecute";
import { clearExercise, setSelectedExercise } from "../../Store/events";
import { $exerciseData, getExercisesRequestFx } from "../../Store/exercise";
import style from "./FormExecuteExercise.module.css";

const SelectList = lazy(() => import("../../Components/SelectList"));
const Spoiler = lazy(() => import("../../Components/Spoiler"));

function FormExecuteExercise() {
  const {
    exerciseData: { listExercise },
  } = useStore($exerciseData);
  const selectedAutoExercise = useStore($autoExecute);

  const handleSelect = useCallback(
    (selectedType: number | string) => {
      const findExercise = listExercise.find(
        ({ link }) => selectedType === link
      );
      if (findExercise) setSelectedExercise(findExercise);
    },
    [listExercise]
  );

  const [isSpoilered, setIsSpoilered] = useState(false);

  useEffect(
    () => () => {
      clearExercise();
    },
    []
  );

  const {
    handleScrollPage,
    isScrollBtn,
    isBottom,
    scrollPos,
    isScrolling,
    scrollBottom,
  } = useScroll();

  const panelHeaderRef = useRef<HTMLSpanElement>(null);
  const spoilerRef = useRef<HTMLDivElement>(null);

  const { handleDrop, setDragElementId } = useDragDrop();

  useEffect(() => {
    getExercisesRequestFx();
  }, []);

  return (
    <Panel
      className={style.executePage}
      title={
        <span ref={panelHeaderRef}>
          Настроить автоматический запуск упражнений
        </span>
      }
    >
      <Suspense fallback="Загрузка...">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            spoilerRef.current?.click();
          }}
          className={clsx(style.executePageSpoilerLabel, {
            [style.executePageSpoilerLabelSticky]: isSpoilered,
          })}
        >
          Выбрать упражнения
        </Button>
        <div
          className={clsx(style.executePageContainer, {
            [style.executePageContainerSpoilered]: isSpoilered,
          })}
        >
          <div className={style.executePageSpoilerContainer}>
            <Spoiler
              captionRenderFn={null}
              style={{
                "--spoiler-body-margin": "1rem 0 0",
                "--spoiler-border-radius": "0.45rem",
                "--height-spoiler": "calc(100vh - 4rem)",
              }}
              className={style.executePageSpoiler}
              onClick={() => {
                setIsSpoilered(!isSpoilered);
                if (isSpoilered && window.scrollY > 0) {
                  scrollBottom(0);
                }
              }}
              ref={spoilerRef}
            >
              <div className={style.executePageList}>
                <div>
                  <SelectList
                    onSelect={handleSelect}
                    title="Список упражнений для выбора"
                    data={listExercise.map(({ link, title }) => ({
                      id: link ?? "",
                      children: () => title,
                    }))}
                    style={{ "--select-label-cursor": "pointer" }}
                  />
                </div>
              </div>
            </Spoiler>
          </div>
          <SelectList
            isDisableSelected
            title="Список выбранных упражнений"
            className={clsx(
              style.executePageSelectedExercises,
              style.executePageSelectedList
            )}
            style={{
              "--select-label-padding": 0,
              "--select-label-box-shadow": "none",
              "--select-label-border-radius": "0.5rem",
            }}
            data={selectedAutoExercise.map(({ link, title, img, action }) => ({
              id: link ?? "",
              children: (titleId, descriptionId) => (
                <DragListItem
                  action={action}
                  link={link}
                  img={img}
                  title={title}
                  onDragStart={setDragElementId}
                  onDrop={handleDrop}
                  titleId={`${titleId}-${link}`}
                  descriptionId={`${descriptionId}-${link}`}
                />
              ),
            }))}
          />
        </div>
      </Suspense>
      {scrollPos > 0 && isScrollBtn && (
        <Button
          onClick={handleScrollPage}
          className={style.executePageScrollBtn}
          type="button"
          disabled={isScrolling}
        >
          {isBottom ? "Вверх" : "Вниз"}
        </Button>
      )}
    </Panel>
  );
}

export default FormExecuteExercise;
