import { AriaAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement & AriaAttributes> {
  status?: 'primary' | 'secondary' | 'link';
  isDisabled?: boolean;
}

interface ButtonWrapperProps {
    children: ReactNode;
    className?: string;
}

export type { ButtonProp, ButtonWrapperProps };
