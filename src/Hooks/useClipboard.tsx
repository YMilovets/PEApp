import { useCallback } from 'react';
import translate from '../i18n';

function useClipboard(
  onGetImage: (image: Blob | null) => void,
  onMessage?: (message: string) => void,
) {
  async function onCopyClick<
    TEventHandler extends { preventDefault:() => void }
  >(e: TEventHandler) {
    e.preventDefault();
    try {
      let permission = { state: '' };
      // Проверка прав доступа на разрешение чтения из буфера обмена
      try {
        permission = await navigator.permissions.query({
          name: 'clipboard-read' as globalThis.PermissionName,
        });
      } catch {
        throw new Error(translate('NotificationText', '0x006').toString());
      }

      if (permission.state === 'denied') {
        throw new Error(translate('NotificationText', '0x008').toString());
      }

      // Считываем первый элемент из буфера обмена
      const [clipboardFileItem] = await navigator.clipboard.read();
      // Считываем из скопированного элемента тип первого изображения
      const imageType = clipboardFileItem.types.find((type) => type.includes('image/'));
      if (imageType) {
        // Возвращаем изображение в формате blob по запрашиваемому MIME-типу
        const blob = await clipboardFileItem.getType(imageType);
        onGetImage(blob);
        throw new Error(translate('NotificationText', '0x005').toString());
      } else {
        onGetImage(null);
        throw new Error(translate('NotificationText', '0x009').toString());
      }
    } catch (err) {
      onMessage?.((err as Error).message);
    }
  }
  const handleCopyClick = useCallback(onCopyClick, []);
  document.onpaste = handleCopyClick;

  return handleCopyClick;
}

export default useClipboard;
