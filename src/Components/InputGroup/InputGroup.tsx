import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { InputGroupProps } from './InputGroup.type';
import style from './InputGroup.module.css';

function InputGroup({ children, className }: InputGroupProps) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocusInput = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleBlurInput = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <div
      onFocus={handleFocusInput}
      onBlur={handleBlurInput}
      className={clsx(style.inputGroup, className, {
        [style.inputGroupFocused]: isFocused,
      })}
    >
      {children}
    </div>
  );
}

export default InputGroup;
