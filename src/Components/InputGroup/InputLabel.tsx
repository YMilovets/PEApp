import clsx from 'clsx';
import { InputLabelProp } from './InputGroup.type';
import style from './InputGroup.module.css';

function InputLabel({
  children,
  className,
  position,
  linkedId,
}: InputLabelProp) {
  return (
    <label
      htmlFor={linkedId}
      className={clsx(
        style.inputLabel,
        { [style.inputLabelLeft]: position === 'left' },
        { [style.inputLabelRight]: position === 'right' },
        className,
      )}
    >
      {children}
    </label>
  );
}

export default InputLabel;
