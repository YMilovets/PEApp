import clsx from 'clsx';
import {
  FormEvent, Fragment, useCallback, useState,
} from 'react';
import Panel from '../../Components/Panel/Panel';
import { Input, InputGroup, InputLabel } from '../../Components/InputGroup';
import ButtonWrapper from '../../Components/Button/ButtonWrapper';
import Button from '../../Components/Button';
import style from './FormNewExecise.module.css';
import Portal from '../../Components/Portal';
import ModalAuth from '../../Components/ModalAuth';
import formConstructor from './constants';
import useSendForm from './utils';

function FormNewExecise() {
  const [sendParams, setSendParams] = useState<FormData | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const onSendExercise = useCallback((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    setSendParams(formData);
    setIsModalActive(true);
  }, []);

  const {
    onSignAuth,
    modalError: authError,
    formError: error,
    addFormRef,
    setAuthError,
  } = useSendForm({ formAddParams: sendParams, onSend: () => setIsModalActive(false) });

  return (
    <Panel title="Добавить новое упражнение">
      <form ref={addFormRef} onSubmit={onSendExercise}>
        <p role="alert">{error}</p>
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
            <Fragment key={id}>
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
                  className={style.formInput}
                  type={type}
                  id={id}
                  required={required}
                  name={name}
                  max={max}
                  min={min}
                  defaultValue={value}
                  step={step}
                  aria-describedby={`label-description-${id}`}
                />
              </InputGroup>
            </Fragment>
          ),
        )}
        <div className={style.formManagerBtn}>
          <ButtonWrapper className={style.formBtn}>
            <Button type="submit">Отправить</Button>
          </ButtonWrapper>
          <ButtonWrapper className={style.formBtn}>
            <Button
              tabIndex={-1}
              className={style.formBtnReset}
              type="reset"
            >
              Очистить форму
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
