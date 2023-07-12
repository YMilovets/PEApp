import clsx from "clsx";
import { InputProps } from "./InputGroup.type";
import style from "./InputGroup.module.css";

function Input({
  className,
  type,
  placeholder,
  onChange,
  name,
  id,
}: InputProps) {
  return (
    <input
      className={clsx(className, style.Input)}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      id={id}
    />
  );
}

export default Input;
