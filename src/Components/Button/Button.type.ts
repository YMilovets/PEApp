import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    status?: 'primary' | 'secondary' | 'link';
    isDisabled?: boolean;
}

interface ButtonWrapper {
    children: ReactNode;
    className?: string;
}

export type { ButtonProp, ButtonWrapper };
