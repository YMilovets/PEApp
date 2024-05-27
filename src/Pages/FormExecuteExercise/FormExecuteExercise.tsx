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
import { MenuIcon } from "../../Components/Icons";
import Panel from "../../Components/Panel";
import useScroll from "../../Hooks/useScroll";
import { $autoExecute } from "../../Store/autoExecute";
import { clearExercise, setSelectedExercise } from "../../Store/events";
import { $exerciseData } from "../../Store/exercise";
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

  useEffect(() => {
    return () => {
      clearExercise();
    };
  }, []);

  function scrollBottom() {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }

  const { handleScrollPage, isScrollBtn, pageScroll, lastScroll } =
    useScroll(scrollBottom);

  const panelHeaderRef = useRef<HTMLSpanElement>(null);
  const spoilerRef = useRef<HTMLDivElement>(null);

  return (
    <Panel
      className={style.executePage}
      title={
        <span ref={panelHeaderRef}>
          Настроить автоматический запуск упражнений
        </span>
      }
    >
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
              "--height-spoiler": `calc(100vh - 4rem)`,
            }}
            className={style.executePageSpoiler}
            onClick={() => {
              setIsSpoilered(!isSpoilered);
              if (isSpoilered && window.scrollY > 0) {
                scrollBottom();
              }
            }}
            ref={spoilerRef}
          >
            <div className={style.executePageList}>
              <div>
                <Suspense fallback="Загрузка...">
                  <SelectList
                    onSelect={handleSelect}
                    title="Список упражнений для выбора"
                    data={listExercise.map(({ link, title }) => ({
                      id: link ?? "",
                      children: title,
                    }))}
                    style={{ "--select-label-cursor": "pointer" }}
                  />
                </Suspense>
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
          data={selectedAutoExercise.map(({ link, title, img, action }) => ({
            id: link ?? "",
            children: (
              <div className={style.executePageItem}>
                <figure className={style.executePageImageContainer}>
                  <img
                    className={style.executePageImage}
                    src={img}
                    alt="Здесь рыбы нет"
                  />
                </figure>
                <div className={style.executePageContent}>
                  <h3 className={style.executePageTitle}>{title}</h3>
                  {action}
                </div>
                <Button
                  title="Переместить"
                  className={style.executePageDragBtn}
                  aria-label="Переместить"
                  tabIndex={-1}
                >
                  <MenuIcon className={style.executePageDragBtnIcon} />
                </Button>
              </div>
            ),
          }))}
        />
      </div>
      {lastScroll > -1 && isScrollBtn && (
        <Button
          onClick={handleScrollPage}
          className={style.executePageScrollBtn}
          type="button"
        >
          {pageScroll > 0 ? "Вверх" : "Вниз"}
        </Button>
      )}
    </Panel>
  );
}

export default FormExecuteExercise;
