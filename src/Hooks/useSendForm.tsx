import {
  FormEvent, useCallback, useRef, useState,
} from 'react';
import { getTokenAuth, sendNewExercise, sendNewImageExercise } from '../Store/effects';
import translate from '../i18n';
import { SendFromProps } from './types';

export default function useSendForm({ formAddParams, onSend, image }: SendFromProps) {
  const [modalError, setAuthError] = useState<string>();
  const [formMessage, setFormMessage] = useState<string>();
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
        if (image) formAddParams?.set('file', image);
        const { name: imageInputName, message: imageMessage } = await sendNewImageExercise({
          formData: formAddParams,
          token,
        });
        if (imageInputName) {
          (addFormRef.current?.elements[imageInputName] as HTMLInputElement).focus();
          throw new Error(imageMessage);
        }
        const { message, name } = await sendNewExercise({ formData: formAddParams, token });
        if (name) {
          (addFormRef.current?.elements[name] as HTMLInputElement).focus();
          throw new Error(message);
        }
        setFormMessage(message);
        addFormRef.current?.reset();
      } catch (err) {
        setFormMessage((err as Error).message);
      }
    } catch (err) {
      setAuthError((err as Error).message);
    }
  }, [formAddParams]);

  return {
    onSignAuth,
    modalError,
    formMessage,
    addFormRef,
    setAuthError,
    setFormMessage,
  };
}
