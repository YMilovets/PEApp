import clsx from 'clsx';
import style from "./Button.module.css";
import { ButtonWrapper } from './Button.type';

export default function ButtonWrapper({ children, className }: ButtonWrapper) {
  return <div className={clsx(style.buttonWrapper, className)}>{children}</div>;
}
