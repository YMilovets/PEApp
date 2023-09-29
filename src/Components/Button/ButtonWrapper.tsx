import clsx from 'clsx';
import style from './Button.module.css';
import { ButtonWrapperProps } from './Button.type';

export default function ButtonWrapper({ children, className }: ButtonWrapperProps) {
  return <div className={clsx(style.buttonWrapper, className)}>{children}</div>;
}
