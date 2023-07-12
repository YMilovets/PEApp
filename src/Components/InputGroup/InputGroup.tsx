import clsx from "clsx";
import { InputGroupProps } from "./InputGroup.type";
import style from "./InputGroup.module.css";
import { useCallback, useState } from "react";

function InputGroup({ children, className }: InputGroupProps) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocusInput = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleBlurInput = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <form
      onFocus={handleFocusInput}
      onBlur={handleBlurInput}
      className={clsx(style.inputGroup, className, {
        [style.inputGroupFocused]: isFocused,
      })}
    >
      {children}
    </form>
  );
}

export default InputGroup;
