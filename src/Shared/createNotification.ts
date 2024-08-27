import { CreateNotificationType, NotificationOptions } from '../Types';

async function createNotification({
  body,
  title,
  viewTime = 10000,
  onClick,
}: CreateNotificationType) {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    const notifyRenderFn: Record<string, () => void> = {
      granted: () => {
        const closeNotification = new Notification(title, {
          body,
          icon: './favicon.ico',
          vibrate: [100],
          tag: 'PEApp',
        } as NotificationOptions);
        closeNotification.addEventListener('click', () => onClick?.());
        setTimeout(() => closeNotification.close(), viewTime);
      },
      denied: () => {
        throw new Error(
          'Для удобства работы с приложением рекомендуем включить уведомления',
        );
      },
    };
    notifyRenderFn[permission]?.();
  }
}

export default createNotification;
