import clsx from 'clsx';
import {
  FormEvent, useCallback, useState,
} from 'react';
import Panel from '../../Components/Panel/Panel';
import { Input, InputGroup, InputLabel } from '../../Components/InputGroup';
import ButtonWrapper from '../../Components/Button/ButtonWrapper';
import Button from '../../Components/Button';
import style from './FormNewExecise.module.css';
import Portal from '../../Components/Portal';
import ModalAuth from '../../Components/ModalAuth';
import formConstructor from './constants';
import translate from '../../i18n';
import useClipboard from '../../Hooks/useClipboard';
import useSendForm from '../../Hooks/useSendForm';
import { PasteIcon } from '../../Components/Icons';

function FormNewExecise() {
  const [sendParams, setSendParams] = useState<FormData | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState('');

  const {
    onSignAuth,
    modalError: authError,
    formMessage: message,
    addFormRef,
    setAuthError,
    setFormMessage,
  } = useSendForm({ formAddParams: sendParams, onSend: () => setIsModalActive(false), image });

  const onSendExercise = useCallback((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    setFormMessage('');
    setSendParams(formData);
    setIsModalActive(true);
  }, []);

  const handleCopyClick = useClipboard(setImage, setFormMessage);

  return (
    <Panel title="Добавить новое упражнение">
      <form className={style.form} ref={addFormRef} onSubmit={onSendExercise}>
        {message && (
          <p className={style.formItemAlert} role="alert" aria-live="assertive">
            {message}
          </p>
        )}
        {formConstructor.map(
          ({
            id,
            label,
            description,
            required,
            type,
            name,
            max,
            min,
            value,
            step,
          }) => (
            <div
              className={clsx(style.formItem, {
                [style.formItemLast]: id === 'img-exercise',
              })}
              key={id}
            >
              <small
                id={`label-description-${id}`}
                className={style.formCaption}
              >
                {description}
              </small>
              <InputGroup className={style.formGroup}>
                <InputLabel
                  className={clsx(style.formLabel)}
                  linkedId={id}
                  position="left"
                >
                  {label}
                </InputLabel>
                <Input
                  className={clsx(style.formInput, {
                    [style.formInputFile]: type === 'file',
                  })}
                  type={type}
                  id={id}
                  required={required}
                  name={name}
                  max={max}
                  min={min}
                  defaultValue={value}
                  step={step}
                  aria-describedby={`label-description-${id}`}
                  onChange={(e) => {
                    if (type === 'file') {
                      setFileName(
                        Array.from(e.currentTarget.files ?? [])[0].name,
                      );
                      setImage(null);
                      setFormMessage('');
                    }
                  }}
                />
                {type === 'file' && (
                  <>
                    <span className={style.formInputLabelFile}>
                      {image
                        ? translate('NotificationText', '0x007').toString()
                        : fileName}
                    </span>
                    <Button
                      className={style.formInputCopyBtn}
                      onClick={handleCopyClick}
                    >
                      <PasteIcon />
                      {translate('ExerciseText', 'pasteButton').toString()}
                    </Button>
                  </>
                )}
              </InputGroup>
            </div>
          ),
        )}
        <div className={style.formManagerBtn}>
          <ButtonWrapper className={style.formBtn}>
            <Button type="submit">
              {translate('ExerciseText', 'sendButton').toString()}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper className={style.formBtn}>
            <Button tabIndex={-1} className={style.formBtnReset} type="reset">
              {translate('ExerciseText', 'clearButton').toString()}
            </Button>
          </ButtonWrapper>
        </div>
      </form>
      <Portal>
        {isModalActive && (
          <ModalAuth
            onCancel={() => setIsModalActive(false)}
            onSign={onSignAuth}
            errorMsg={authError}
            onOpen={() => setAuthError('')}
          />
        )}
      </Portal>
    </Panel>
  );
}

export default FormNewExecise;
