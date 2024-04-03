import clsx from 'clsx';
import { createElement } from 'react';
import { ButtonProp } from './Button.type';
import style from './Button.module.css';

function Button({
  children, onClick, className, disabled, type, tabIndex, 'aria-label': ariaLabel,
}: ButtonProp) {
  const settingButton = {
    disabled,
    className: clsx(style.button, className),
    onClick,
    tabIndex,
    'aria-label': ariaLabel,
  };
  if (type === 'reset') {
    return createElement('input', {
      ...settingButton,
      type: 'reset',
      value: children?.toString(),
    });
  }
  if (type === 'submit') {
    return createElement(
      'button',
      { ...settingButton, type: 'submit' },
      children,
    );
  }
  return createElement(
    'button',
    { ...settingButton, type: 'button' },
    children,
  );
}

export default Button;
