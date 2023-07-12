import { ButtonHTMLAttributes } from "react";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    status?: 'primary' | 'secondary' | 'link';
    isDisabled?: boolean;
}

export type { ButtonProp };
