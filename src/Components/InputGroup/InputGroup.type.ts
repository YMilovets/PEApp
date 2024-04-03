import * as React from 'react';
import {
  InputHTMLAttributes,
  FormHTMLAttributes,
  LabelHTMLAttributes,
  AriaAttributes,
} from 'react';

interface InputGroupProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement & AriaAttributes> {
  className?: string;
}

interface InputLabelProp extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  position: 'left' | 'right';
  linkedId?: string;
}

export type { InputGroupProps, InputProps, InputLabelProp };
