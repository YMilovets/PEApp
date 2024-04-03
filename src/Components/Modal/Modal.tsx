import { useEffect } from 'react';
import style from './Modal.module.css';
import { ModalProps } from './Modal.type';
import { CloseIcon } from '../Icons';
import Button from '../Button';

function Modal({ children, header, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className={style.modalContainer}>
      <section
        className={style.modal}
        aria-labelledby="formTitle"
        role="dialog"
        aria-modal
      >
        <div className={style.modalHeader}>
          <h2 id="formTitle" className={style.modalTitle}>
            {header}
          </h2>
          <Button
            className={style.modalCloseBtn}
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <CloseIcon className={style.modalCloseIcon} width={24} height={24} />
          </Button>
        </div>

        {children}
      </section>
    </div>
  );
}

export default Modal;
