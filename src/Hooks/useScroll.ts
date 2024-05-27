import { useCallback, useEffect, useState } from "react";

export default function useScroll(startScrollFn: () => void) {
  const [pageScroll, setPageScroll] = useState(-1);
  const [isScrollBtn, setIsScrollBtn] = useState(false);
  const [lastScroll, setLastScroll] = useState(-1);

  const handleScrollPage = useCallback(() => {
    if (window.scrollY > 0) {
      startScrollFn();
    } else {
      window.scrollTo({ left: 0, top: lastScroll, behavior: "smooth" });
    }
  }, [lastScroll]);

  const handleScroll = useCallback(() => {
    setPageScroll(window.scrollY);
    if (window.scrollY > 0) setLastScroll(window.scrollY);
  }, []);

  const handleResize = useCallback(() => {
    if (document.body.scrollHeight <= window.screen.availHeight)
      setIsScrollBtn(false);
    else setIsScrollBtn(true);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    new ResizeObserver(handleResize).observe(document.body);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      new ResizeObserver(handleResize).unobserve(document.body);
    };
  }, []);

  return { handleScrollPage, pageScroll, isScrollBtn, lastScroll };
}
