import clsx from 'clsx';
import { ButtonProp } from './Button.type';
import style from './Button.module.css';

function Button({
  children, onClick, className, disabled,
}: ButtonProp) {
  return (
    <button
      disabled={disabled}
      className={clsx(style.button, className)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
