import clsx from 'clsx';
import { InputProps } from './InputGroup.type';
import style from './InputGroup.module.css';

function Input({
  className,
  type,
  placeholder,
  onChange,
  name,
  id,
  min,
  max,
  value,
  defaultValue,
  disabled,
  step,
  required,
  'aria-describedby': describedBy,
  autoComplete,
}: InputProps) {
  return (
    <input
      className={clsx(className, style.Input)}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      id={id}
      value={value}
      min={min}
      max={max}
      defaultValue={defaultValue}
      disabled={disabled}
      step={step}
      required={required}
      aria-describedby={describedBy}
      autoComplete={autoComplete}
    />
  );
}

export default Input;
