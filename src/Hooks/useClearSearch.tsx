import { useEffect } from "react";

export function useClearSearch(selector: string) {
    useEffect(() => {
      if (document.querySelector(selector))
        (document.querySelector(selector) as HTMLInputElement).value = "";
    }, []);
}