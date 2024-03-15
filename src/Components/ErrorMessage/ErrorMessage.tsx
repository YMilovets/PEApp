import { useCallback } from 'react';
import translate from '../../i18n';
import { ErrorMessageProps } from './ErrorMessage.type';
import Button from '../Button';
import style from './ErrorMessage.module.css';

function ErrorMessage({ error: { message } }: ErrorMessageProps) {
  const handleClickReloadPage = useCallback(() => window.location.reload(), []);
  return (
    <div className={style.errorContainer}>
      <p dangerouslySetInnerHTML={{ __html: message }} />
      <Button onClick={handleClickReloadPage}>
        {translate('NotificationText', 'reloadPageBtn') as string}
      </Button>
    </div>
  );
}

export default ErrorMessage;
