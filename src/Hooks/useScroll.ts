import {
  useCallback, useEffect, useState,
} from 'react';

export default function useScroll() {
  // Отображение кнопки прокрутки
  const [isScrollBtn, setIsScrollBtn] = useState(false);
  // Тип прокрутки - Вверх или Вниз
  const [isBottom, setIsBottom] = useState(false);
  // Позиция прокрутки страницы без начального положения
  const [scrollPos, setScrollPos] = useState(-1);
  // Блокировка события прокрутки после выполнения scrollTo
  const [isScrolling, setIsScrolling] = useState(false);

  function scrollBottom(pos: number) {
    setIsBottom((isBottonState) => !isBottonState);
    setIsScrolling(true);

    if (!navigator.userAgent.includes('Chrome')) {
      window.scrollTo({
        left: 0,
        top: pos,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        left: 0,
        top: pos,
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }

  const handleScrollPage = useCallback(() => {
    scrollBottom(isBottom ? 0 : scrollPos);
  }, [isBottom, scrollPos]);

  const handleScroll = useCallback(() => {
    if (isScrolling) return;
    setIsBottom(true);
    setScrollPos(window.scrollY);
  }, [isScrolling]);

  const handleResize = useCallback(() => {
    setIsScrollBtn(
      document.body.scrollHeight > window.innerHeight,
    );
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    new ResizeObserver(handleResize).observe(document.body);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      new ResizeObserver(handleResize).unobserve(document.body);
    };
  }, [handleResize, handleScroll]);

  return {
    isBottom,
    handleScrollPage,
    isScrollBtn,
    scrollPos,
    isScrolling,
    scrollBottom,
  };
}
