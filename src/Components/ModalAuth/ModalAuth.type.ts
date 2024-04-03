import { FormEvent } from 'react';

export interface ModalAuthProps {
    onCancel?: () => void;
    onSign?: (e: FormEvent) => void;
    errorMsg?: string;
    onOpen?: () => void;
}
