import { ButtonProp } from "./Button.type";
import clsx from "clsx";
import style from "./Button.module.css";

function Button({ children, onClick, className }: ButtonProp) {
  return (
    <button className={clsx(style.button, className)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
