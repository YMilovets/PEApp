import { useCallback } from "react";
import { translate } from "../../i18n";
import { ErrorMessageProps } from "./ErrorMessage.type";

function ErrorMessage({ error: { message } }: ErrorMessageProps) {
  const handleClickReloadPage = useCallback(() => location.reload(), []);
  return (
    <>
      <p>{message}</p>
      <button onClick={handleClickReloadPage}>
        {translate("NotificationText", "reloadPageBtn") as string}
      </button>
    </>
  );
}

export default ErrorMessage;
