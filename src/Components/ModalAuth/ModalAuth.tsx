import clsx from 'clsx';
import { useEffect } from 'react';
import Modal from '../Modal';
import { Input, InputGroup, InputLabel } from '../InputGroup';
import ButtonWrapper from '../Button/ButtonWrapper';
import Button from '../Button';
import { ModalAuthProps } from './ModalAuth.type';
import style from './ModalAuth.module.css';

function ModalAuth({
  onCancel, onSign, errorMsg, onOpen,
}: ModalAuthProps) {
  useEffect(() => () => { onOpen?.(); }, []);

  document.body.onkeydown = ({ key }) => {
    if (key === 'Escape') onCancel?.();
  };

  return (
    <Modal header="Авторизация" onClose={onCancel}>
      {errorMsg && (
        <p
          aria-label="Сообщение об ошибке"
          role="alert"
          dangerouslySetInnerHTML={{ __html: errorMsg }}
        />
      )}
      <form onSubmit={onSign}>
        <small id="loginLabel" className={style.formCaption}>
          Введите имя пользователя системы
        </small>
        <InputGroup className={style.formGroup}>
          <InputLabel
            className={clsx(style.formLabel)}
            linkedId="login"
            position="left"
          >
            Логин
          </InputLabel>
          <Input
            className={style.formInput}
            type="text"
            id="login"
            required
            name="login"
            aria-describedby="loginLabel"
          />
        </InputGroup>

        <small id="passLabel" className={style.formCaption}>
          Введите пароль
        </small>
        <InputGroup className={style.formGroup}>
          <InputLabel
            className={clsx(style.formLabel)}
            linkedId="password"
            position="left"
          >
            Пароль
          </InputLabel>
          <Input
            className={style.formInput}
            type="password"
            id="password"
            required
            name="password"
            aria-describedby="passLabel"
          />
        </InputGroup>
        <div className={style.formAuthManager}>
          <ButtonWrapper className={style.formAuthContainer}>
            <Button type="submit" className={style.formAuthBtn}>
              Войти
            </Button>
          </ButtonWrapper>
          <ButtonWrapper className={style.formAuthContainer}>
            <Button
              onClick={onCancel}
              className={clsx(style.formAuthBtn, style.formAuthBtnReset)}
            >
              Отмена
            </Button>
          </ButtonWrapper>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAuth;
