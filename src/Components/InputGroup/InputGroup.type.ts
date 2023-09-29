import * as React from 'react';
import {
  InputHTMLAttributes,
  FormHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';

interface InputGroupProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface InputLabelProp extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  position: 'left' | 'right';
  linkedId?: string;
}

export type { InputGroupProps, InputProps, InputLabelProp };
