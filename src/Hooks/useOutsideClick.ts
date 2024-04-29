import { useEffect } from 'react';
import { OutsideClickProps } from './types';

export default function useOutsideClick({
  onClick,
  excluded,
}: OutsideClickProps) {
  const clickHandler = ({ target }: {target: EventTarget | null}) => {
    const { classList } = target as HTMLElement;
    const targetClassList = Array.prototype.join.call(classList, '.');

    if (
      excluded?.find(
        ({ current }) => targetClassList
          && current?.closest(`.${targetClassList}`)
          && !current?.classList.contains(classList.toString()),
      )
    ) onClick?.();
  };

  useEffect(() => {
    document.body.addEventListener('click', clickHandler);

    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, []);
}
