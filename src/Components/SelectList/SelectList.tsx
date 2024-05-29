import clsx from 'clsx';
import {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import useOutsideClick from '../../Hooks/useOutsideClick';
import styleComponent from './SelectList.module.css';
import { SelectListProps } from './SelectList.type';

function SelectList({
  data,
  className,
  style,
  onSelect,
  isDisableSelected = false,
  title,
}: SelectListProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number | string>>(
    new Set(),
  );
  const [selectItemId, setSelectItemId] = useState(0);
  const [isSelectedList, setIsSelectedList] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  const handleSelect = useCallback(
    (selectedId: string | number, selectedIndex?: number) => () => {
      if (isDisableSelected) return;
      if (selectedIndex) setSelectItemId(selectedIndex);
      onSelect?.(selectedId);
      if (selectedIndexes?.has(selectedId)) {
        setSelectedIndexes(
          new Set(
            Array.from(selectedIndexes).filter(
              (currentId) => currentId !== selectedId,
            ),
          ),
        );
      } else {
        setSelectedIndexes(
          new Set(Array.from(selectedIndexes)).add(selectedId),
        );
      }
    },
    [selectedIndexes],
  );

  const handleListSelect = useCallback(
    (status: boolean) => () => {
      if (!isDisableSelected) setIsSelectedList(status);
    },
    [isDisableSelected],
  );

  const handleKeySelect = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDisableSelected) return;

      const { ArrowDownFn, ArrowUpFn } = {
        ArrowUpFn: () => setSelectItemId((selectId) => {
          if (selectId > 0) return selectId - 1;
          return selectId;
        }),
        ArrowDownFn: () => setSelectItemId((selectId) => {
          if (selectId < data.length - 1) return selectId + 1;
          return selectId;
        }),
      };

      const keyManager: Record<string, () => void> = {
        Escape: () => listRef.current?.blur(),
        ' ': () => handleSelect(data[selectItemId].id)(),
        Enter: () => handleSelect(data[selectItemId].id)(),
        ArrowUp: ArrowUpFn,
        W: ArrowUpFn,
        Ц: ArrowUpFn,
        ArrowDown: ArrowDownFn,
        S: ArrowDownFn,
        Ы: ArrowDownFn,
      };
      keyManager[`${e.key[0].toUpperCase()}${e.key.slice(1)}`]?.();
    },
    [selectItemId, data, isDisableSelected],
  );

  useOutsideClick({ excluded: [listRef], onClick: handleListSelect(false) });

  return (
    <ul
      aria-label={title}
      style={style}
      className={clsx(className, styleComponent.selectList)}
      role="listbox"
      aria-multiselectable
      tabIndex={isDisableSelected ? -1 : 0}
      onKeyUp={handleKeySelect}
      onClick={(e) => e.currentTarget.focus()}
      onFocus={handleListSelect(true)}
      onBlur={handleListSelect(false)}
      ref={listRef}
    >
      {data.map(({ children, id }, index) => (
        <li
          className={clsx(styleComponent.selectListItem, {
            [styleComponent.selectListItemSelected]: selectedIndexes?.has(id),
            [styleComponent.selectListItemChosen]:
              isSelectedList
              && data[selectItemId]?.id === id
              && !selectedIndexes?.has(id),
            [styleComponent.selectListItemSelectedChosen]:
              isSelectedList
              && data[selectItemId]?.id === id
              && selectedIndexes?.has(id),
          })}
          key={id}
          role="option"
          aria-selected={selectedIndexes.has(id)}
          onClick={handleSelect(id, index)}
          onKeyDown={() => null}
        >
          {children}
        </li>
      ))}
    </ul>
  );
}

export default SelectList;
