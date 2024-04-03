import {
  FormEvent, useCallback, useRef, useState,
} from 'react';
import translate from '../../i18n';
import { getTokenAuth, sendNewExercise } from '../../Store/effects';
import { SendFromProps } from './FormNewExercise.type';

export default function useSendForm({ formAddParams, onSend }: SendFromProps) {
  const [modalError, setAuthError] = useState<string>();
  const [formError, setError] = useState<string>();
  const addFormRef = useRef<HTMLFormElement>(null);

  const onSignAuth = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const authFormData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      let token = '';
      let authCode = '';
      try {
        const { key, code } = await getTokenAuth(authFormData);
        authCode = code;
        token = key;
      } catch {
        throw new Error(translate('NotificationText', '0x000') as string);
      }

      if (authCode) { throw new Error(translate('NotificationText', authCode) as string); }

      try {
        onSend();
        const { message, name } = await sendNewExercise({ formData: formAddParams, token });

        if (name) {
          (addFormRef.current?.elements[name] as HTMLInputElement).focus();
          throw new Error(message);
        }
        setError(message);
        addFormRef.current?.reset();
      } catch (err) {
        setError((err as Error).message);
      }
    } catch (err) {
      setAuthError((err as Error).message);
    }
  }, [formAddParams]);

  return {
    onSignAuth,
    modalError,
    formError,
    addFormRef,
    setAuthError,
  };
}
